// backend/routes/agreementRoutes.js
const express = require('express');
const router = express.Router();
const { 
    createAgreement, 
    getUserAgreements, 
    getAgreementByBooking 
} = require('../controllers/agreementController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getUserAgreements)
    .post(protect, createAgreement);

router.route('/booking/:bookingId')
    .get(protect, getAgreementByBooking);

module.exports = router;
