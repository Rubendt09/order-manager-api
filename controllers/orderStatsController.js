const db = require("../config/bd");

const getOrderStats = (req, res) => {
  const query = `
    SELECT 
      e.nombre AS label,
      COUNT(p.id) AS value
    FROM 
      Estado e
    LEFT JOIN 
      Pedidos p ON e.id = p.estado_id
    GROUP BY 
      e.nombre
    ORDER BY 
      value DESC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error al obtener estadísticas de órdenes.",
        error: err,
      });
    }

    // Devolver resultados en el formato solicitado
    res.status(200).json(results);
  });
};

module.exports = { getOrderStats };
