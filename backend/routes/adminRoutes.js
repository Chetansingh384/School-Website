const express = require('express');
const router = express.Router();
const { loginAdmin, registerAdmin } = require('../controllers/adminController');

router.post('/login', loginAdmin);
router.post('/setup', registerAdmin); // Initial setup route

module.exports = router;
