// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { 
    getAdminStats, 
    getUsers, 
    toggleUserBan, 
    toggleVerifyLandlord,
    getAdminBookings,
    updateAdminBooking
} = require('../controllers/adminController');
const {
    getAdminSupportThreads,
    replyAsAdmin
} = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.route('/stats').get(protect, getAdminStats);
router.route('/users').get(protect, getUsers);
router.route('/users/:id/ban').put(protect, toggleUserBan);
router.route('/users/:id/verify-landlord').put(protect, toggleVerifyLandlord);
router.route('/bookings').get(protect, getAdminBookings);
router.route('/bookings/:id').put(protect, updateAdminBooking);
router.route('/chats').get(protect, getAdminSupportThreads);
router.route('/chats/:userId/reply').post(protect, replyAsAdmin);

module.exports = router;
