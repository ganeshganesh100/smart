// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Isolate token payload
            token = req.headers.authorization.split(' ')[1];
            
            // Decrypt token signature
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Inject authenticated profile into core request parameters
            req.user = await User.findById(decoded.id).select('-password');
            if (req.user && req.user.banned) {
                return res.status(403).json({ success: false, message: 'Your account has been suspended by an administrator.' });
            }
            return next();
        } catch (error) {
            return res.status(401).json({ success: false, message: 'Authorization verification failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied: No token validation context found' });
    }
};

module.exports = { protect };