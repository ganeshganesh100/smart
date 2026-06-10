// backend/controllers/agreementController.js
const Agreement = require('../models/Agreement');
const Booking = require('../models/Booking');

// @desc    Generate/Create new agreement
// @route   POST /api/agreements
// @access  Private (Landlord or Admin)
exports.createAgreement = async (req, res) => {
    try {
        const { bookingId, startDate, endDate, terms, tenantSignature, landlordSignature } = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking request not found' });
        }

        // Verify that the landlord of the booking is the one generating it (or admin)
        if (booking.landlordId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to create agreement for this booking' });
        }

        // Check if agreement already exists for this booking
        const existingAgreement = await Agreement.findOne({ bookingId });
        if (existingAgreement) {
            return res.status(400).json({ success: false, message: 'Agreement already exists for this booking', data: existingAgreement });
        }

        const agreement = await Agreement.create({
            bookingId: booking._id,
            tenantId: booking.tenantId,
            landlordId: booking.landlordId,
            propertyId: booking.propertyId,
            startDate,
            endDate,
            terms,
            tenantSignature,
            landlordSignature
        });

        // Update booking status to completed (optional) or keep it approved. Let's keep it approved, but we can set it to completed if needed.
        booking.status = 'Approved';
        await booking.save();

        res.status(201).json({ success: true, data: agreement });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get agreements related to logged in user
// @route   GET /api/agreements
// @access  Private
exports.getUserAgreements = async (req, res) => {
    try {
        let agreements;
        if (req.user.role === 'admin') {
            agreements = await Agreement.find()
                .populate('tenantId', 'fullname email phone')
                .populate('landlordId', 'fullname email phone')
                .populate('propertyId');
        } else if (req.user.role === 'landlord') {
            agreements = await Agreement.find({ landlordId: req.user.id })
                .populate('tenantId', 'fullname email phone')
                .populate('propertyId');
        } else {
            agreements = await Agreement.find({ tenantId: req.user.id })
                .populate('landlordId', 'fullname email phone')
                .populate('propertyId');
        }

        res.json({ success: true, count: agreements.length, data: agreements });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get agreement by booking ID
// @route   GET /api/agreements/booking/:bookingId
// @access  Private
exports.getAgreementByBooking = async (req, res) => {
    try {
        const agreement = await Agreement.findOne({ bookingId: req.params.bookingId })
            .populate('tenantId', 'fullname email phone')
            .populate('landlordId', 'fullname email phone')
            .populate('propertyId');

        if (!agreement) {
            return res.status(404).json({ success: false, message: 'No agreement found for this booking' });
        }

        // Verify authorization
        if (
            agreement.tenantId._id.toString() !== req.user.id &&
            agreement.landlordId._id.toString() !== req.user.id &&
            req.user.role !== 'admin'
        ) {
            return res.status(401).json({ success: false, message: 'Not authorized to view this agreement' });
        }

        res.json({ success: true, data: agreement });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
