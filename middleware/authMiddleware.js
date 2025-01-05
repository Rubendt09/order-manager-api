const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }

  // Verificar el token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado.' });
    }
    req.user = user; // Añadir la información del usuario al request
    next();
  });
};

module.exports = authenticateToken;
