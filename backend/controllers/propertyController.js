// backend/controllers/propertyController.js
const Property = require('../models/Property');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc    Create a new rental listing
// @route   POST /api/properties
// @access  Private (Landlord only)
exports.createProperty = async (req, res) => {
    try {
        if (req.user.role !== 'landlord' && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Only landlords can list properties' });
        }

        const propertyData = {
            ...req.body,
            landlordId: req.user.id,
            verified: false // Must be verified by admin first
        };

        const property = await Property.create(propertyData);
        res.status(201).json({ success: true, data: property });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get listings with search and filters
// @route   GET /api/properties
// @access  Public
exports.getProperties = async (req, res) => {
    try {
        let query = {};
        
        // Check if there is an auth token in the request headers
        let currentUser = null;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                const token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                currentUser = await User.findById(decoded.id);
            } catch (err) {
                // Ignore token errors for public browse
            }
        }

        // Apply visibility rules based on parameters
        if (req.query.myListings === 'true' && currentUser) {
            query.landlordId = currentUser._id;
        } else if (req.query.adminView === 'true' && currentUser && currentUser.role === 'admin') {
            // Admin sees everything
        } else {
            // Public visitors only see verified available listings
            query.verified = true;
            query.status = 'Available';
        }

        // Apply query filters if they exist
        if (req.query.district) {
            query.district = { $regex: req.query.district, $options: 'i' };
        }
        if (req.query.municipality) {
            query.municipality = { $regex: req.query.municipality, $options: 'i' };
        }
        if (req.query.location) {
            query.location = { $regex: req.query.location, $options: 'i' };
        }
        if (req.query.propertyType) {
            query.propertyType = req.query.propertyType;
        }
        if (req.query.rooms) {
            query.rooms = Number(req.query.rooms);
        }
        if (req.query.minPrice || req.query.maxPrice) {
            query.price = {};
            if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
            if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
        }

        const properties = await Property.find(query).populate('landlordId', 'fullname phone verified');
        res.json({ success: true, count: properties.length, data: properties });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update a property listing
// @route   PUT /api/properties/:id
// @access  Private (Landlord owner only)
exports.updateProperty = async (req, res) => {
    try {
        let property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }

        // Ensure user is the owner or admin
        if (property.landlordId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to edit this property' });
        }

        property = await Property.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.json({ success: true, data: property });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete a property listing
// @route   DELETE /api/properties/:id
// @access  Private (Landlord owner only)
exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }

        // Ensure user is the owner or admin
        if (property.landlordId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to delete this property' });
        }

        await Property.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Property listing removed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Verify/Approve a property listing
// @route   PUT /api/properties/:id/verify
// @access  Private (Admin only)
exports.verifyProperty = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Only administrators can verify properties' });
        }

        const { verified } = req.body; // Boolean
        const property = await Property.findByIdAndUpdate(req.params.id, { verified }, { new: true });

        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }

        res.json({ success: true, data: property });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};