const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getUserBookings).post(protect, createBooking);
router.route('/:id').put(protect, updateBookingStatus); // <-- Add this update endpoint

module.exports = router;