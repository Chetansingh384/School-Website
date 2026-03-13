const express = require('express');
const router = express.Router();
const { getActivities, addActivity, updateActivity, deleteActivity } = require('../controllers/activityController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.route('/')
  .get(getActivities)
  .post(protect, upload.single('image'), addActivity);

router.route('/:id')
  .put(protect, upload.single('image'), updateActivity)
  .delete(protect, deleteActivity);

module.exports = router;
