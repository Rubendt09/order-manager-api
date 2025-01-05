const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/bd");

const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");
const stateRoutes = require("./routes/stateRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Bienvenido a la API del Gestor de Pedidos");
});

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/states", stateRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
