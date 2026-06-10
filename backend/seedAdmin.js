// backend/seedAdmin.js
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        const adminExists = await User.findOne({ email: 'admin@smartbasai.com' });
        if (!adminExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);
            await User.create({
                fullname: 'Admin SmartBasai',
                email: 'admin@smartbasai.com',
                phone: '+977 9801111111',
                password: hashedPassword,
                role: 'admin',
                verified: true
            });
            console.log('🚀 Admin user seeded successfully!');
        } else {
            console.log('ℹ️ Admin user already exists.');
        }
        process.exit(0);
    })
    .catch((err) => {
        console.error('❌ Error seeding admin user:', err);
        process.exit(1);
    });
