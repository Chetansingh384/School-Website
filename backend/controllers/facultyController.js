const admin = require('../config/firebase');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

const getDb = () => {
  if (admin.apps.length > 0) {
    return admin.firestore();
  }
  throw new Error("Firebase Admin SDK not initialized");
};

// @desc    Get all faculty members
// @route   GET /api/faculty
// @access  Public
const getFaculty = async (req, res) => {
  try {
    const db = getDb();
    const snapshot = await db.collection('faculty').orderBy('createdAt', 'desc').get();
    const facultyMembers = [];
    snapshot.forEach(doc => {
      facultyMembers.push({ _id: doc.id, ...doc.data() });
    });
    res.json(facultyMembers);
  } catch (error) {
    console.error('Error fetching faculty:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch faculty' });
  }
};

// @desc    Add a faculty member
// @route   POST /api/faculty
// @access  Private
const addFacultyMember = async (req, res) => {
  try {
    const { name, role, bio } = req.body;
    let imageUrl = '';
    let publicId = '';

    if (req.file) {
      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { 
              folder: 'school_faculty',
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
    const docRef = await db.collection('faculty').add({
      name,
      role,
      bio,
      imageUrl,
      publicId,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    const docSnapshot = await docRef.get();
    res.status(201).json({ _id: docSnapshot.id, ...docSnapshot.data() });
  } catch (error) {
    console.error('Error adding faculty member:', error);
    res.status(400).json({ message: error.message || 'Failed to add faculty member' });
  }
};

// @desc    Update a faculty member
// @route   PUT /api/faculty/:id
// @access  Private
const updateFacultyMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, bio } = req.body;
    
    const db = getDb();
    const facultyRef = db.collection('faculty').doc(id);
    const doc = await facultyRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Faculty member not found' });
    }

    let imageUrl = doc.data().imageUrl;
    let publicId = doc.data().publicId || '';

    if (req.file) {
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }

      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { 
              folder: 'school_faculty',
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

    await facultyRef.update({
      name: name || doc.data().name,
      role: role || doc.data().role,
      bio: bio || doc.data().bio,
      imageUrl,
      publicId,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    const updatedDoc = await facultyRef.get();
    res.json({ _id: updatedDoc.id, ...updatedDoc.data() });
  } catch (error) {
    console.error('Error updating faculty member:', error);
    res.status(400).json({ message: error.message || 'Failed to update faculty member' });
  }
};

// @desc    Delete a faculty member
// @route   DELETE /api/faculty/:id
// @access  Private
const deleteFacultyMember = async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDb();
    const facultyRef = db.collection('faculty').doc(id);
    const doc = await facultyRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Faculty member not found' });
    }

    if (doc.data().publicId) {
      await cloudinary.uploader.destroy(doc.data().publicId);
    }

    await facultyRef.delete();
    res.json({ message: 'Faculty member removed' });
  } catch (error) {
    console.error('Error deleting faculty member:', error);
    res.status(500).json({ message: error.message || 'Failed to delete' });
  }
};

module.exports = {
  getFaculty,
  addFacultyMember,
  updateFacultyMember,
  deleteFacultyMember
};
