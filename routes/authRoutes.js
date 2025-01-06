const express = require("express");

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { login } = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login", login);
router.get("/", authenticateToken, getUsers);
router.get("/:id", authenticateToken, getUserById);
router.post("/", authenticateToken, createUser);
router.put("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);

module.exports = router;
