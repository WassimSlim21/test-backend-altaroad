// uploadRoutes.js
const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload');

/**
 * POST route for file upload.
 * 
 * @route POST /api/upload
 * @access Public
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.post('/upload', uploadController.uploadFile);

module.exports = router;