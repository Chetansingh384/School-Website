const express = require('express');
const router = express.Router();
const { getContactInfo, updateContactInfo } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getContactInfo)
  .put(protect, updateContactInfo);

module.exports = router;
