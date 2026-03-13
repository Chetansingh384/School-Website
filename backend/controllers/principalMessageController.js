const admin = require('../config/firebase');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

const getDb = () => {
  if (admin.apps.length > 0) {
    return admin.firestore();
  }
  throw new Error("Firebase Admin SDK not initialized");
};

// @desc    Get principal message
// @route   GET /api/principal-message
// @access  Public
const getPrincipalMessage = async (req, res) => {
  try {
    const db = getDb();
    const messageRef = db.collection('settings').doc('principalMessage');
    const doc = await messageRef.get();
    
    if (doc.exists) {
      res.json(doc.data());
    } else {
      res.json({});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update or Create principal message
// @route   PUT /api/principal-message
// @access  Private
const updatePrincipalMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const db = getDb();
    const messageRef = db.collection('settings').doc('principalMessage');
    const doc = await messageRef.get();

    const updateData = {};
    if (message !== undefined) updateData.message = message;

    if (req.file) {
      const existingPublicId = doc.exists ? doc.data().publicId : null;
      if (existingPublicId) {
        await cloudinary.uploader.destroy(existingPublicId);
      }

      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { 
              folder: 'school_principal',
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
      updateData.imageUrl = result.secure_url;
      updateData.publicId = result.public_id;
    }

    if (!doc.exists) {
      updateData.createdAt = admin.firestore.FieldValue.serverTimestamp();
      await messageRef.set(updateData);
    } else {
      updateData.updatedAt = admin.firestore.FieldValue.serverTimestamp();
      await messageRef.update(updateData);
    }

    const updatedDoc = await messageRef.get();
    res.json(updatedDoc.data());
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getPrincipalMessage,
  updatePrincipalMessage
};
