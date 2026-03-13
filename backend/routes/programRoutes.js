const express = require('express');
const router = express.Router();
const { getPrograms, addProgram, updateProgram, deleteProgram } = require('../controllers/programController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.route('/')
  .get(getPrograms)
  .post(protect, upload.single('image'), addProgram);

router.route('/:id')
  .put(protect, upload.single('image'), updateProgram)
  .delete(protect, deleteProgram);

module.exports = router;
