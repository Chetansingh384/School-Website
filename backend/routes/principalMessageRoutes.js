const express = require('express');
const router = express.Router();
const { getPrincipalMessage, updatePrincipalMessage } = require('../controllers/principalMessageController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.route('/')
  .get(getPrincipalMessage)
  .put(protect, upload.single('image'), updatePrincipalMessage);

module.exports = router;
