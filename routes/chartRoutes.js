const express = require('express');
const { getChartData } = require('../controllers/chartController');

const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, getChartData);

module.exports = router;
