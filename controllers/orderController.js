const db = require('../config/bd');

// Obtener todas las órdenes
const getOrders = (req, res) => {
  const query = `
    SELECT 
      o.id, 
      c.nombre AS cliente, 
      e.nombre AS estado, 
      o.descripcion, 
      o.fecha_pedido, 
      o.total
    FROM Pedidos o
    JOIN Clientes c ON o.cliente_id = c.id
    JOIN Estado e ON o.estado_id = e.id
  `;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener órdenes.', error: err });
    }
    res.status(200).json({ message: 'Órdenes obtenidas con éxito.', data: results });
  });
};

// Obtener una orden por ID
const getOrderById = (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT 
      o.id, 
      c.nombre AS cliente, 
      e.nombre AS estado, 
      o.descripcion, 
      o.fecha_pedido, 
      o.total
    FROM Pedidos o
    JOIN Clientes c ON o.cliente_id = c.id
    JOIN Estado e ON o.estado_id = e.id
    WHERE o.id = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener la orden.', error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Orden no encontrada.' });
    }
    res.status(200).json({ message: 'Orden obtenida con éxito.', data: results[0] });
  });
};

// Crear una nueva orden
const createOrder = (req, res) => {
  const { cliente_id, estado_id, descripcion, total } = req.body;

  if (!cliente_id || !estado_id || !descripcion || !total) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  const query = `
    INSERT INTO Pedidos (cliente_id, estado_id, descripcion, fecha_pedido, total)
    VALUES (?, ?, ?, NOW(), ?)
  `;
  db.query(query, [cliente_id, estado_id, descripcion, total], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al crear la orden.', error: err });
    }
    res.status(201).json({ message: 'Orden creada con éxito.', orderId: results.insertId });
  });
};

// Actualizar una orden
const updateOrder = (req, res) => {
  const { id } = req.params;
  const { cliente_id, estado_id, descripcion, total } = req.body;

  const query = `
    UPDATE Pedidos 
    SET cliente_id = ?, estado_id = ?, descripcion = ?, total = ?
    WHERE id = ?
  `;
  db.query(query, [cliente_id, estado_id, descripcion, total, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al actualizar la orden.', error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Orden no encontrada.' });
    }
    res.status(200).json({ message: 'Orden actualizada con éxito.' });
  });
};

// Eliminar una orden
const deleteOrder = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Pedidos WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al eliminar la orden.', error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Orden no encontrada.' });
    }
    res.status(200).json({ message: 'Orden eliminada con éxito.' });
  });
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
