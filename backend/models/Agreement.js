// backend/models/Agreement.js
const mongoose = require('mongoose');

const AgreementSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    landlordId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    terms: {
        type: String,
        required: true
    },
    tenantSignature: {
        type: String,
        required: true
    },
    landlordSignature: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Agreement', AgreementSchema);
