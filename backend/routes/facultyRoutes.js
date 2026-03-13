const express = require('express');
const router = express.Router();
const { getFaculty, addFacultyMember, updateFacultyMember, deleteFacultyMember } = require('../controllers/facultyController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.route('/')
  .get(getFaculty)
  .post(protect, upload.single('image'), addFacultyMember);

router.route('/:id')
  .put(protect, upload.single('image'), updateFacultyMember)
  .delete(protect, deleteFacultyMember);

module.exports = router;
