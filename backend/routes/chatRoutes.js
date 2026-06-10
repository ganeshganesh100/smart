const express = require('express');
const router = express.Router();
const {
    getMySupportMessages,
    sendSupportMessage
} = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getMySupportMessages)
    .post(protect, sendSupportMessage);

module.exports = router;
