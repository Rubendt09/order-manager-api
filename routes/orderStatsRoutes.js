const express = require('express');
const { getOrderStats } = require('../controllers/orderStatsController');

const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
router.get('/', authenticateToken, getOrderStats);

module.exports = router;
