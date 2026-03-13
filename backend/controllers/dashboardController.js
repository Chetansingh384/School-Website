const admin = require('../config/firebase');

const getDb = () => {
  if (admin.apps.length > 0) {
    return admin.firestore();
  }
  throw new Error("Firebase Admin SDK not initialized");
};

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private
const getStats = async (req, res) => {
  try {
    const db = getDb();
    
    // Get counts from collections
    const gallerySnapshot = await db.collection('gallery').count().get();
    const activitiesSnapshot = await db.collection('activities').count().get();
    const announcementsSnapshot = await db.collection('announcements').count().get();

    const totalGallery = gallerySnapshot.data().count;
    const totalActivities = activitiesSnapshot.data().count;
    const totalAnnouncements = announcementsSnapshot.data().count;

    res.json({
      totalGallery,
      totalActivities,
      totalAnnouncements
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStats };
