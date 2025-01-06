const db = require('../config/bd');
const crypto = require('crypto');

// Obtener todos los usuarios
const getUsers = (req, res) => {
  const query = 'SELECT id, nombre, email, fecha_creacion FROM Usuarios';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener usuarios.', error: err });
    }
    res.status(200).json({ message: 'Usuarios obtenidos con éxito.', data: results });
  });
};

// Obtener un usuario por ID
const getUserById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT id, nombre, email, fecha_creacion FROM Usuarios WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener el usuario.', error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.status(200).json({ message: 'Usuario obtenido con éxito.', data: results[0] });
  });
};

// Crear un nuevo usuario
const createUser = (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  // Cifrar la contraseña con SHA2
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  const query = 'INSERT INTO Usuarios (nombre, email, password, fecha_creacion) VALUES (?, ?, ?, NOW())';
  db.query(query, [nombre, email, hashedPassword], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al crear el usuario.', error: err });
    }
    res.status(201).json({ message: 'Usuario creado con éxito.', userId: results.insertId });
  });
};

// Actualizar un usuario
const updateUser = (req, res) => {
  const { id } = req.params;
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  // Cifrar la nueva contraseña con SHA2
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  const query = 'UPDATE Usuarios SET nombre = ?, email = ?, password = ? WHERE id = ?';
  db.query(query, [nombre, email, hashedPassword, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al actualizar el usuario.', error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.status(200).json({ message: 'Usuario actualizado con éxito.' });
  });
};

// Eliminar un usuario
const deleteUser = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Usuarios WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al eliminar el usuario.', error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.status(200).json({ message: 'Usuario eliminado con éxito.' });
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
