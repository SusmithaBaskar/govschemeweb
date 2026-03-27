const express = require('express');
const router = express.Router();
const schemesController = require('../controllers/schemesController');

// POST /api/schemes (For eligibility check)
router.post('/schemes', schemesController.searchSchemes);

// GET /api/schemes/all (Optional list)
router.get('/schemes/all', schemesController.getAllSchemes);

// ✅ NEW: GET /api/scheme-details (For full details page)
// Endpoint: http://localhost:5000/api/scheme-details?name=SchemeName
router.get('/scheme-details', schemesController.getSchemeDetailsByName);

module.exports = router;