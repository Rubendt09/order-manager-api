const jwt = require("jsonwebtoken");
const db = require("../config/bd");
const crypto = require('node:crypto');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "24h", 
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email y contraseña son obligatorios." });
  }

  try {
    const query = "SELECT * FROM Usuarios WHERE email = ?";
    db.query(query, [email], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error del servidor.", error: err });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado." });
      }

      const user = results[0];

      const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

      if (user.password !== hashedPassword) {
        return res.status(401).json({ message: "Contraseña incorrecta." });
      }

      const token = generateToken(user.id);
      return res.status(200).json({
        message: "Inicio de sesión exitoso.",
        token,
        user: { id: user.id, nombre: user.nombre, email: user.email },
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor.", error });
  }
};

module.exports = { login };
