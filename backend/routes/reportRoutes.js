// backend/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const { 
    createReport, 
    getReports, 
    resolveReport 
} = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getReports)
    .post(protect, createReport);

router.route('/:id/resolve')
    .put(protect, resolveReport);

module.exports = router;
