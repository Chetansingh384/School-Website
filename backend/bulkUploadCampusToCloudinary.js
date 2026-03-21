const fs = require('fs');
const path = require('path');
const admin = require('./config/firebase');
const cloudinary = require('./config/cloudinary');

const getDb = () => {
  if (admin.apps.length > 0) return admin.firestore();
  throw new Error('Firebase Admin SDK not initialized. Set FIREBASE_SERVICE_ACCOUNT.');
};

const assetsDir = path.join(__dirname, '../frontend/src/assets');
const campusPattern = /^campus(\d+)\.(jpe?g|png|webp)$/i;
const galleryPattern = /^gallery-(\d+)\.(jpe?g|png|webp)$/i;

const getMigratableFiles = () => {
  if (!fs.existsSync(assetsDir)) return [];

  return fs
    .readdirSync(assetsDir)
    .filter((file) => campusPattern.test(file) || galleryPattern.test(file))
    .sort((a, b) => {
      const getOrder = (name) => {
        const campus = name.match(campusPattern);
        if (campus) return Number(campus[1] || 9999);
        const gallery = name.match(galleryPattern);
        if (gallery) return 10000 + Number(gallery[1] || 9999);
        return 99999;
      };

      const aNum = getOrder(a);
      const bNum = getOrder(b);
      return aNum - bNum;
    });
};

async function run() {
  const config = cloudinary.config();
  if (!config.cloud_name || !config.api_key || !config.api_secret) {
    throw new Error('Cloudinary is not configured. Set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME/CLOUDINARY_API_KEY/CLOUDINARY_API_SECRET.');
  }

  const db = getDb();
  const files = getMigratableFiles();

  if (!files.length) {
    console.log('No migratable image files found in frontend/src/assets.');
    return;
  }

  console.log(`Found ${files.length} images. Starting upload...`);

  let uploaded = 0;
  let skipped = 0;

  for (const file of files) {
    const absolutePath = path.join(assetsDir, file);
    const campusMatch = file.match(campusPattern);
    const galleryMatch = file.match(galleryPattern);

    const isCampus = Boolean(campusMatch);
    const imageNum = Number((campusMatch || galleryMatch || [])[1] || 0);
    const description = isCampus ? `Campus Photo ${imageNum}` : `Gallery Photo ${imageNum}`;
    const category = isCampus ? 'Campus' : 'Events';
    const publicId = isCampus ? `campus-${imageNum}` : `gallery-${imageNum}`;

    // Skip if this source file is already mapped.
    const existing = await db
      .collection('gallery')
      .where('sourceFile', '==', file)
      .limit(1)
      .get();

    if (!existing.empty) {
      skipped += 1;
      console.log(`Skipping existing: ${file}`);
      continue;
    }

    const result = await cloudinary.uploader.upload(absolutePath, {
      folder: 'school_gallery',
      resource_type: 'image',
      public_id: publicId,
      overwrite: true,
    });

    await db.collection('gallery').add({
      imageUrl: result.secure_url,
      publicId: result.public_id,
      mediaType: 'image',
      category,
      description,
      sourceFile: file,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    uploaded += 1;
    console.log(`Uploaded: ${file} -> ${result.public_id}`);
  }

  console.log(`Done. Uploaded: ${uploaded}, Skipped: ${skipped}`);
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Bulk upload failed:', error.message || error);
    process.exit(1);
  });
