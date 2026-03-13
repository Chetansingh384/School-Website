const express = require('express');
const router = express.Router();
const { getFees, addFee, updateFee, deleteFee } = require('../controllers/feeController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getFees)
  .post(protect, addFee);

router.route('/:id')
  .put(protect, updateFee)
  .delete(protect, deleteFee);

module.exports = router;
