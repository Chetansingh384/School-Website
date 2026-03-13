const admin = require('../config/firebase');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

const getDb = () => {
  if (admin.apps.length > 0) {
    return admin.firestore();
  }
  throw new Error("Firebase Admin SDK not initialized");
};

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
const getGallery = async (req, res) => {
  try {
    const db = getDb();
    const snapshot = await db.collection('gallery').orderBy('createdAt', 'desc').get();
    const galleryItems = [];
    snapshot.forEach(doc => {
      galleryItems.push({ _id: doc.id, ...doc.data() });
    });
    res.json(galleryItems);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch gallery' });
  }
};

// @desc    Add a gallery image or video
// @route   POST /api/gallery
// @access  Private
const addGalleryItem = async (req, res) => {
  try {
    const { category, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Media file is required' });
    }

    // Determine resource type based on mimetype
    const resourceType = req.file.mimetype.startsWith('video/') ? 'video' : 'image';

    // Upload to Cloudinary using a stream
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { 
            folder: 'school_gallery', 
            resource_type: resourceType,
            upload_preset: 'School Website'
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req);

    const db = getDb();
    const docRef = await db.collection('gallery').add({
      imageUrl: result.secure_url,
      publicId: result.public_id,
      mediaType: resourceType,
      category,
      description,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    const docSnapshot = await docRef.get();
    res.status(201).json({ _id: docSnapshot.id, ...docSnapshot.data() });
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    res.status(400).json({ message: error.message || 'Error uploading file' });
  }
};

// @desc    Delete a gallery item
// @route   DELETE /api/gallery/:id
// @access  Private
const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDb();
    const galleryRef = db.collection('gallery').doc(id);
    const doc = await galleryRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    const data = doc.data();

    // Delete from Cloudinary
    if (data.publicId) {
      await cloudinary.uploader.destroy(data.publicId, {
        resource_type: data.mediaType // required to properly delete videos
      });
    }

    await galleryRef.delete();
    res.json({ message: 'Gallery item removed' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ message: error.message || 'Failed to delete' });
  }
};

module.exports = {
  getGallery,
  addGalleryItem,
  deleteGalleryItem
};
