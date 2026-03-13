const Gallery = require('../models/Gallery');
const Activity = require('../models/Activity');
const Announcement = require('../models/Announcement');

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private
const getStats = async (req, res) => {
  try {
    const totalGallery = await Gallery.countDocuments();
    const totalActivities = await Activity.countDocuments();
    const totalAnnouncements = await Announcement.countDocuments();

    res.json({
      totalGallery,
      totalActivities,
      totalAnnouncements
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStats };
