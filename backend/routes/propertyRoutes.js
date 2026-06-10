// backend/routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const { 
    createProperty, 
    getProperties, 
    updateProperty, 
    deleteProperty, 
    verifyProperty 
} = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getProperties)
    .post(protect, createProperty);

router.route('/:id')
    .put(protect, updateProperty)
    .delete(protect, deleteProperty);

router.route('/:id/verify')
    .put(protect, verifyProperty);

module.exports = router;