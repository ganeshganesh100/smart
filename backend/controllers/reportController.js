// backend/controllers/reportController.js
const Report = require('../models/Report');
const User = require('../models/User');
const Property = require('../models/Property');

// @desc    Submit a fraud or abuse report
// @route   POST /api/reports
// @access  Private
exports.createReport = async (req, res) => {
    try {
        const { targetId, targetType, reason } = req.body;

        if (!['Property', 'User'].includes(targetType)) {
            return res.status(400).json({ success: false, message: 'Invalid target type' });
        }

        // Verify that target actually exists
        if (targetType === 'Property') {
            const property = await Property.findById(targetId);
            if (!property) return res.status(404).json({ success: false, message: 'Target property not found' });
        } else {
            const user = await User.findById(targetId);
            if (!user) return res.status(404).json({ success: false, message: 'Target user not found' });
        }

        const report = await Report.create({
            reporterId: req.user.id,
            targetId,
            targetType,
            reason,
            status: 'Pending'
        });

        res.status(201).json({ success: true, data: report });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all reports
// @route   GET /api/reports
// @access  Private (Admin only)
exports.getReports = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Admin access denied' });
        }

        const reports = await Report.find()
            .populate('reporterId', 'fullname email phone')
            .sort({ createdAt: -1 });

        // Let's manually populate the targets so the admin knows what is reported!
        const populatedReports = await Promise.all(reports.map(async (report) => {
            let targetDetail = null;
            try {
                if (report.targetType === 'Property') {
                    targetDetail = await Property.findById(report.targetId).populate('landlordId', 'fullname phone');
                } else {
                    targetDetail = await User.findById(report.targetId).select('-password');
                }
            } catch (err) {
                // Ignore missing targets
            }
            return {
                ...report.toObject(),
                targetDetail
            };
        }));

        res.json({ success: true, count: populatedReports.length, data: populatedReports });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Resolve a report ticket
// @route   PUT /api/reports/:id/resolve
// @access  Private (Admin only)
exports.resolveReport = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Admin access denied' });
        }

        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ success: false, message: 'Report ticket not found' });
        }

        report.status = 'Resolved';
        await report.save();

        res.json({ success: true, message: 'Report marked as resolved', data: report });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
