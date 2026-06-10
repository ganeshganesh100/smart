const mongoose = require('mongoose');

const SupportMessageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    text: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },
    senderRole: {
        type: String,
        enum: ['tenant', 'landlord', 'admin'],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('SupportMessage', SupportMessageSchema);
