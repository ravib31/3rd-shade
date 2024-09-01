const express = require('express');
const { createLead, getLeads } = require('../controllers/leadController');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

router.post('/', authenticateJWT, createLead);
router.get('/', authenticateJWT, getLeads);

module.exports = router;
