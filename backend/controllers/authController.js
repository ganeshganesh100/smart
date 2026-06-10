// backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper wrapper to sign standard JWT structures
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.registerUser = async (req, res) => {
    try {
        const { fullname, email, phone, password, role } = req.body;

        if (!password || password.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
        }

        const userExists = await User.findOne({ $or: [{ email }, { phone }] });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'Email address or Phone number already registered' });
        }

        // Salt and Hash raw password entries securely
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Extract file upload paths if available
        let profilePicture = '';
        let citizenshipDoc = '';
        
        if (req.files) {
            if (req.files['profilePicture'] && req.files['profilePicture'][0]) {
                profilePicture = 'uploads/' + req.files['profilePicture'][0].filename;
            }
            if (req.files['citizenshipDoc'] && req.files['citizenshipDoc'][0]) {
                citizenshipDoc = 'uploads/' + req.files['citizenshipDoc'][0].filename;
            }
        }

        const user = await User.create({
            fullname,
            email,
            phone,
            password: hashedPassword,
            role: role || 'tenant',
            profilePicture,
            citizenshipDoc
        });

        res.status(201).json({
            success: true,
            token: generateToken(user._id),
            user: { 
                id: user._id, 
                fullname: user.fullname, 
                email: user.email, 
                role: user.role,
                profilePicture: user.profilePicture,
                citizenshipDoc: user.citizenshipDoc
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid authentication credentials' });
        }

        if (user.banned) {
            return res.status(403).json({ success: false, message: 'Your account has been suspended by an administrator.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid authentication credentials' });
        }

        res.json({
            success: true,
            token: generateToken(user._id),
            user: { 
                id: user._id, 
                fullname: user.fullname, 
                email: user.email, 
                role: user.role,
                profilePicture: user.profilePicture || '',
                citizenshipDoc: user.citizenshipDoc || ''
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
