const express = require('express');
const {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} = require('../controllers/clientController');

const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// CRUD de Clientes
router.get('/', authenticateToken, getClients);
router.get('/:id', authenticateToken, getClientById);
router.post('/', authenticateToken, createClient);
router.put('/:id', authenticateToken, updateClient);
router.delete('/:id', authenticateToken, deleteClient);

module.exports = router;
