const fs = require('fs');
const path = require('path');
const admin = require('./config/firebase');
const cloudinary = require('./config/cloudinary');

const getDb = () => {
  if (admin.apps.length > 0) return admin.firestore();
  throw new Error('Firebase Admin SDK not initialized. Set FIREBASE_SERVICE_ACCOUNT.');
};

const assetsDir = path.join(__dirname, '../frontend/src/assets');
const imagePattern = /^campus(\d+)\.(jpe?g|png|webp)$/i;

const getCampusFiles = () => {
  if (!fs.existsSync(assetsDir)) return [];

  return fs
    .readdirSync(assetsDir)
    .filter((file) => imagePattern.test(file))
    .sort((a, b) => {
      const aNum = Number((a.match(imagePattern) || [])[1] || 9999);
      const bNum = Number((b.match(imagePattern) || [])[1] || 9999);
      return aNum - bNum;
    });
};

async function run() {
  const config = cloudinary.config();
  if (!config.cloud_name || !config.api_key || !config.api_secret) {
    throw new Error('Cloudinary is not configured. Set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME/CLOUDINARY_API_KEY/CLOUDINARY_API_SECRET.');
  }

  const db = getDb();
  const files = getCampusFiles();

  if (!files.length) {
    console.log('No campus image files found in frontend/src/assets.');
    return;
  }

  console.log(`Found ${files.length} campus images. Starting upload...`);

  let uploaded = 0;
  let skipped = 0;

  for (const file of files) {
    const absolutePath = path.join(assetsDir, file);
    const imageNum = Number((file.match(imagePattern) || [])[1] || 0);
    const description = `Campus Photo ${imageNum}`;

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
      public_id: `campus-${imageNum}`,
      overwrite: true,
    });

    await db.collection('gallery').add({
      imageUrl: result.secure_url,
      publicId: result.public_id,
      mediaType: 'image',
      category: 'Campus',
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
