const express = require('express');
const { getStates } = require('../controllers/stateController');

const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getStates);

module.exports = router;
