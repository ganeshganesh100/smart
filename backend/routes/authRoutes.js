const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');

router.post('/register', upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'citizenshipDoc', maxCount: 1 }
]), registerUser);

router.post('/login', loginUser);

module.exports = router;