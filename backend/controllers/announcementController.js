const admin = require('../config/firebase');

const getDb = () => {
  if (admin.apps.length > 0) {
    return admin.firestore();
  }
  throw new Error("Firebase Admin SDK not initialized");
};

// @desc    Get all announcements
// @route   GET /api/announcements
// @access  Public
const getAnnouncements = async (req, res) => {
  try {
    const db = getDb();
    const snapshot = await db.collection('announcements').orderBy('createdAt', 'desc').get();
    const announcements = [];
    snapshot.forEach(doc => {
      announcements.push({ _id: doc.id, ...doc.data() });
    });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add an announcement
// @route   POST /api/announcements
// @access  Private
const addAnnouncement = async (req, res) => {
  try {
    const { title, content } = req.body;

    const db = getDb();
    const docRef = await db.collection('announcements').add({
      title,
      content,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    const docSnapshot = await docRef.get();
    res.status(201).json({ _id: docSnapshot.id, ...docSnapshot.data() });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete an announcement
// @route   DELETE /api/announcements/:id
// @access  Private
const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDb();
    const announcementRef = db.collection('announcements').doc(id);
    const doc = await announcementRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    await announcementRef.delete();
    res.json({ message: 'Announcement removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAnnouncements,
  addAnnouncement,
  deleteAnnouncement
};
