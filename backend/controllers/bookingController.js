// backend/controllers/bookingController.js
const Booking = require('../models/Booking');
const Property = require('../models/Property');

// @desc    Book a room listing
// @route   POST /api/bookings
// @access  Private (Tenant only)
exports.createBooking = async (req, res) => {
    try {
        const { propertyId } = req.body;
        
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }

        const booking = await Booking.create({
            tenantId: req.user.id,
            propertyId: property._id,
            landlordId: property.landlordId,
            price: property.price,
            offer: '',
            status: 'Pending',
            paymentStatus: 'Pending',
            paymentMethod: 'None'
        });

        res.status(201).json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get bookings related to the logged-in user
// @route   GET /api/bookings
// @access  Private
exports.getUserBookings = async (req, res) => {
    try {
        let bookings;
        if (req.user.role === 'landlord') {
            bookings = await Booking.find({ landlordId: req.user.id })
                .populate('propertyId')
                .populate('tenantId', 'fullname phone');
        } else {
            bookings = await Booking.find({ tenantId: req.user.id })
                .populate('propertyId')
                .populate('landlordId', 'fullname phone');
        }
        res.json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

    
};

// @desc    Update booking status (Accept/Reject)
// @route   PUT /api/bookings/:id
// @access  Private (Landlord only)
exports.updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body; // Expecting 'Accepted' or 'Rejected'
        
        if (!['Accepted', 'Rejected'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status type' });
        }

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking request not found' });
        }

        // Verify that the logged-in landlord actually owns this property listing
        if (booking.landlordId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to manage this booking' });
        }

        booking.status = status;
        await booking.save();

        res.json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};