const express = require("express");
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// CRUD de Órdenes
router.get("/", authenticateToken, getOrders);
router.get("/:id", authenticateToken, getOrderById);
router.post("/", authenticateToken, createOrder);
router.put("/:id", authenticateToken, updateOrder);
router.delete("/:id", authenticateToken, deleteOrder);

module.exports = router;
