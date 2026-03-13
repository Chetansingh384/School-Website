const express = require('express');
const router = express.Router();
const { getBooks, addBook, updateBook, deleteBook } = require('../controllers/bookController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getBooks)
  .post(protect, addBook);

router.route('/:id')
  .put(protect, updateBook)
  .delete(protect, deleteBook);

module.exports = router;
