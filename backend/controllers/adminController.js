// backend/controllers/adminController.js
const User = require('../models/User');
const Property = require('../models/Property');
const Booking = require('../models/Booking');
const Report = require('../models/Report');

// @desc    Get dashboard analytics / stats
// @route   GET /api/admin/stats
// @access  Private (Admin only)
exports.getAdminStats = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Admin access denied' });
        }

        const totalUsers = await User.countDocuments();
        const landlords = await User.countDocuments({ role: 'landlord' });
        const tenants = await User.countDocuments({ role: 'tenant' });
        
        const totalProperties = await Property.countDocuments();
        const verifiedProperties = await Property.countDocuments({ verified: true });
        const pendingProperties = await Property.countDocuments({ verified: false });

        const totalBookings = await Booking.countDocuments();
        const approvedBookings = await Booking.countDocuments({ status: 'Approved' });
        
        const totalReports = await Report.countDocuments();
        const pendingReports = await Report.countDocuments({ status: 'Pending' });

        res.json({
            success: true,
            stats: {
                totalUsers,
                landlords,
                tenants,
                totalProperties,
                verifiedProperties,
                pendingProperties,
                totalBookings,
                approvedBookings,
                totalReports,
                pendingReports
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all registered users
// @route   GET /api/admin/users
// @access  Private (Admin only)
exports.getUsers = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Admin access denied' });
        }

        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json({ success: true, count: users.length, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Toggle user ban status
// @route   PUT /api/admin/users/:id/ban
// @access  Private (Admin only)
exports.toggleUserBan = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Admin access denied' });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.role === 'admin') {
            return res.status(400).json({ success: false, message: 'Cannot ban an administrator' });
        }

        user.banned = !user.banned;
        await user.save();

        res.json({ success: true, message: `User status changed. Banned: ${user.banned}`, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Toggle landlord verify status
// @route   PUT /api/admin/users/:id/verify-landlord
// @access  Private (Admin only)
exports.toggleVerifyLandlord = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Admin access denied' });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.verified = !user.verified;
        await user.save();

        res.json({ success: true, message: `Landlord verification state updated to: ${user.verified}`, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all bookings in the system
// @route   GET /api/admin/bookings
// @access  Private (Admin only)
exports.getAdminBookings = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Admin access denied' });
        }

        const bookings = await Booking.find()
            .populate('tenantId', 'fullname phone email profilePicture')
            .populate('landlordId', 'fullname phone email profilePicture')
            .populate('propertyId')
            .sort({ createdAt: -1 });

        res.json({ success: true, count: bookings.length, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update any booking status, price, offer, location, or payment status
// @route   PUT /api/admin/bookings/:id
// @access  Private (Admin only)
exports.updateAdminBooking = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Admin access denied' });
        }

        const { status, price, offer, paymentStatus, paymentMethod, location } = req.body;

        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        if (status) booking.status = status;
        if (price !== undefined) booking.price = Number(price);
        if (offer !== undefined) booking.offer = offer;
        if (paymentStatus) booking.paymentStatus = paymentStatus;
        if (paymentMethod) booking.paymentMethod = paymentMethod;

        await booking.save();

        // If location is provided and admin wants to update the property location too
        if (location && booking.propertyId) {
            await Property.findByIdAndUpdate(booking.propertyId, { location });
        }

        const updatedBooking = await Booking.findById(req.params.id)
            .populate('tenantId', 'fullname phone email profilePicture')
            .populate('landlordId', 'fullname phone email profilePicture')
            .populate('propertyId');

        res.json({ success: true, message: 'Booking updated by admin successfully', data: updatedBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
