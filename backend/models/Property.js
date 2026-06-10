// backend/models/Property.js
const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    landlordId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please enter a property title'],
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true // Local street address detail
    },
    district: {
        type: String,
        required: [true, 'Specify the target District in Nepal']
    },
    municipality: {
        type: String,
        required: [true, 'Specify the target Municipality']
    },
    price: {
        type: Number,
        required: [true, 'Set monthly rental charge in NPR']
    },
    rooms: {
        type: Number,
        required: true
    },
    propertyType: {
        type: String,
        enum: ['Room', 'Flat', 'Apartment', 'House'],
        required: true
    },
    images: [{
        type: String // File system storage path URLs
    }],
    amenities: [{
        type: String // ['Wifi', 'Water Supply', 'Parking']
    }],
    status: {
        type: String,
        enum: ['Available', 'Booked', 'Archived'],
        default: 'Available'
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Property', PropertySchema);