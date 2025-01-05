const db = require('../config/bd');

// Obtener todos los clientes
const getClients = (req, res) => {
  const query = 'SELECT * FROM Clientes';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener clientes.', error: err });
    }
    res.status(200).json({ message: 'Clientes obtenidos con éxito.', data: results });
  });
};

// Obtener un cliente por ID
const getClientById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM Clientes WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener el cliente.', error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }
    res.status(200).json({ message: 'Cliente obtenido con éxito.', data: results[0] });
  });
};

// Crear un nuevo cliente
const createClient = (req, res) => {
  const { nombre, email, telefono } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ message: 'El nombre y el email son obligatorios.' });
  }

  const query = 'INSERT INTO Clientes (nombre, email, telefono) VALUES (?, ?, ?)';
  db.query(query, [nombre, email, telefono], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al crear el cliente.', error: err });
    }
    res.status(201).json({ message: 'Cliente creado con éxito.', clientId: results.insertId });
  });
};

// Actualizar un cliente
const updateClient = (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono } = req.body;

  const query = 'UPDATE Clientes SET nombre = ?, email = ?, telefono = ? WHERE id = ?';
  db.query(query, [nombre, email, telefono, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al actualizar el cliente.', error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }
    res.status(200).json({ message: 'Cliente actualizado con éxito.' });
  });
};

// Eliminar un cliente
const deleteClient = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Clientes WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al eliminar el cliente.', error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }
    res.status(200).json({ message: 'Cliente eliminado con éxito.' });
  });
};

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
