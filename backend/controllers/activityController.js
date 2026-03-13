const admin = require('../config/firebase');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

const getDb = () => {
  if (admin.apps.length > 0) {
    return admin.firestore();
  }
  throw new Error("Firebase Admin SDK not initialized");
};

// @desc    Get all activities
// @route   GET /api/activities
// @access  Public
const getActivities = async (req, res) => {
  try {
    const db = getDb();
    const snapshot = await db.collection('activities').orderBy('createdAt', 'desc').get();
    const activities = [];
    snapshot.forEach(doc => {
      activities.push({ _id: doc.id, ...doc.data() });
    });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add an activity
// @route   POST /api/activities
// @access  Private
const addActivity = async (req, res) => {
  try {
    const { title, description } = req.body;
    let imageUrl = '';
    let publicId = '';

    if (req.file) {
      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { 
              folder: 'school_activities',
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
    const docRef = await db.collection('activities').add({
      title,
      description,
      imageUrl,
      publicId,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    const docSnapshot = await docRef.get();
    res.status(201).json({ _id: docSnapshot.id, ...docSnapshot.data() });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update an activity
// @route   PUT /api/activities/:id
// @access  Private
const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDb();
    const activityRef = db.collection('activities').doc(id);
    const doc = await activityRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    const { title, description } = req.body;
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
              folder: 'school_activities',
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

    await activityRef.update({
      title: title || doc.data().title,
      description: description || doc.data().description,
      imageUrl,
      publicId,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    const updatedDoc = await activityRef.get();
    res.json({ _id: updatedDoc.id, ...updatedDoc.data() });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete an activity
// @route   DELETE /api/activities/:id
// @access  Private
const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDb();
    const activityRef = db.collection('activities').doc(id);
    const doc = await activityRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    if (doc.data().publicId) {
      await cloudinary.uploader.destroy(doc.data().publicId);
    }

    await activityRef.delete();
    res.json({ message: 'Activity removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getActivities,
  addActivity,
  updateActivity,
  deleteActivity
};
