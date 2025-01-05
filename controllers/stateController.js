const db = require('../config/bd');

// Obtener todos los estados
const getStates = (req, res) => {
  const query = 'SELECT * FROM Estado';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener estados.', error: err });
    }
    res.status(200).json({ message: 'Estados obtenidos con éxito.', data: results });
  });
};

module.exports = { getStates };
