const express = require('express');
const router = express.Router();
const { getAnnouncements, addAnnouncement, deleteAnnouncement } = require('../controllers/announcementController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getAnnouncements)
  .post(protect, addAnnouncement);

router.route('/:id')
  .delete(protect, deleteAnnouncement);

module.exports = router;
