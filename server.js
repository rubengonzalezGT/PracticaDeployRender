// Carga las variables de entorno desde .env
require('dotenv').config();

// Importamos el modulo express 
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Configuración de CORS
var corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173" // ejemplo Vite
};

app.use(cors(corsOptions));

//  Middleware para parsear JSON y formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a la base de datos
const db = require("./app/models");
db.sequelize.sync()
.then(() => {
console.log("Database synchronized successfully.");
})
.catch((err) => {
console.error("Error connecting to the database:", err);
});
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// Ruta base de prueba
app.get("/", (req, res) => {
  res.json({ message: "UMG Web Application" });
});

// Rutas del proyecto
require("./app/routes/cliente.routes.js")(app);
require("./app/routes/stripe.routes.js")(app);

// Configuración del puerto desde variable de entorno
const PORT = process.env.PORT || 8081;

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});