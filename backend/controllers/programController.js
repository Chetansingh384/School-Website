const admin = require('../config/firebase');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

const getDb = () => {
  if (admin.apps.length > 0) {
    return admin.firestore();
  }
  throw new Error("Firebase Admin SDK not initialized");
};

// @desc    Get all programs
// @route   GET /api/programs
// @access  Public
const getPrograms = async (req, res) => {
  try {
    const db = getDb();
    const snapshot = await db.collection('programs').orderBy('createdAt', 'desc').get();
    const programs = [];
    snapshot.forEach(doc => {
      programs.push({ _id: doc.id, ...doc.data() });
    });
    res.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch programs' });
  }
};

// @desc    Add a program
// @route   POST /api/programs
// @access  Private
const addProgram = async (req, res) => {
  try {
    const { title, description } = req.body;
    let imageUrl = '';
    let publicId = '';

    if (req.file) {
      // Upload to Cloudinary using a stream
      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { 
              folder: 'school_programs',
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
      imageUrl = result.secure_url;
      publicId = result.public_id;
    }

    const db = getDb();
    const docRef = await db.collection('programs').add({
      title,
      description,
      imageUrl,
      publicId,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    const docSnapshot = await docRef.get();
    res.status(201).json({ _id: docSnapshot.id, ...docSnapshot.data() });
  } catch (error) {
    console.error('Error adding program:', error);
    res.status(400).json({ message: error.message || 'Failed to add program' });
  }
};

// @desc    Update a program
// @route   PUT /api/programs/:id
// @access  Private
const updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    
    const db = getDb();
    const progRef = db.collection('programs').doc(id);
    const doc = await progRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Program not found' });
    }

    let imageUrl = doc.data().imageUrl;
    let publicId = doc.data().publicId || '';

    if (req.file) {
      // Delete old image from Cloudinary if it exists
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }

      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { 
              folder: 'school_programs',
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
      imageUrl = result.secure_url;
      publicId = result.public_id;
    }

    await progRef.update({
      title: title || doc.data().title,
      description: description || doc.data().description,
      imageUrl,
      publicId,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    const updatedDoc = await progRef.get();
    res.json({ _id: updatedDoc.id, ...updatedDoc.data() });
  } catch (error) {
    console.error('Error updating program:', error);
    res.status(400).json({ message: error.message || 'Failed to update program' });
  }
};

// @desc    Delete a program
// @route   DELETE /api/programs/:id
// @access  Private
const deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDb();
    const progRef = db.collection('programs').doc(id);
    const doc = await progRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Program not found' });
    }

    // Delete image from Cloudinary
    if (doc.data().publicId) {
      await cloudinary.uploader.destroy(doc.data().publicId);
    }

    await progRef.delete();
    res.json({ message: 'Program removed' });
  } catch (error) {
    console.error('Error deleting program:', error);
    res.status(500).json({ message: error.message || 'Failed to delete' });
  }
};

module.exports = {
  getPrograms,
  addProgram,
  updateProgram,
  deleteProgram
};
