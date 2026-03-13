const express = require('express');
const router = express.Router();
const { getGallery, addGalleryItem, deleteGalleryItem } = require('../controllers/galleryController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.route('/')
  .get(getGallery)
  .post(protect, upload.single('image'), addGalleryItem);

router.route('/:id')
  .delete(protect, deleteGalleryItem);

module.exports = router;
