// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enables cross-origin requests from React
app.use(express.json()); // Parses incoming JSON payloads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Basic Test Route
app.get('/api/test', (req, res) => {
    res.json({ message: "Namaste! SmartBasai Backend API is running smoothly." });
});

// API Routes Middleware
// (Maps incoming HTTP requests to their respective route controllers)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/agreements', require('./routes/agreementRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/chats', require('./routes/chatRoutes'));

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("🚀 Successfully connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`📡 Server actively listening on port ${PORT}`);
});
