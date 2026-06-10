// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please add a full name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email address'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email address']
    },
    phone: {
        type: String,
        required: [true, 'Please add a contact number'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please secure this profile with a password'],
        minlength: [8, 'Password must be at least 8 characters long']
    },
    role: {
        type: String,
        enum: ['tenant', 'landlord', 'admin'],
        default: 'tenant'
    },
    verified: {
        type: Boolean,
        default: false
    },
    banned: {
        type: Boolean,
        default: false
    },
    profilePicture: {
        type: String,
        default: ''
    },
    citizenshipDoc: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
