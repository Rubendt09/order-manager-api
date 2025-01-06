const db = require('../config/bd');

const getChartData = (req, res) => {
  const query = `
    SELECT
      DATE_FORMAT(mes_inicio, '%d/%m/%Y') AS fecha,
      COUNT(DISTINCT c.id) AS Clientes,
      COUNT(DISTINCT p.id) AS Pedidos
    FROM (
        SELECT 
            DATE_FORMAT(fecha_creacion, '%Y-%m-01') AS mes_inicio
        FROM Clientes
        UNION
        SELECT 
            DATE_FORMAT(fecha_pedido, '%Y-%m-01') AS mes_inicio
        FROM Pedidos
    ) meses
    LEFT JOIN Clientes c
        ON DATE_FORMAT(c.fecha_creacion, '%Y-%m-01') = meses.mes_inicio
    LEFT JOIN Pedidos p
        ON DATE_FORMAT(p.fecha_pedido, '%Y-%m-01') = meses.mes_inicio
    GROUP BY mes_inicio
    ORDER BY mes_inicio;
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener los datos para el gráfico.', error: err });
    }

    // Construir la respuesta en el formato requerido
    const labels = results.map(row => row.fecha);
    const clientesData = results.map(row => row.Clientes);
    const pedidosData = results.map(row => row.Pedidos);

    const chart = {
      labels,
      series: [
        {
          name: 'Clientes',
          type: 'column',
          fill: 'solid',
          data: clientesData,
        },
        {
          name: 'Ordenes',
          type: 'area',
          fill: 'gradient',
          data: pedidosData,
        },
      ],
    };

    res.status(200).json(chart);
  });
};

module.exports = { getChartData };
