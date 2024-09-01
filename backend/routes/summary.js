const express = require('express');
const { getLeadsSummary, exportLeadsToCSV } = require('../controllers/summaryController');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

router.get('/summary', authenticateJWT, getLeadsSummary);
router.get('/export', authenticateJWT, exportLeadsToCSV);

module.exports = router;
