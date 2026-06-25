const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');


router.post('/login', loginUser);

module.exports = router;
