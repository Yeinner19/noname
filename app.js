// Importar módulos necesarios
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

// Inicializar Express
const app = express();

// Conexión a la base de datos
require("./backend/config/db"); // Esto ejecuta db.connect una sola vez

// Importar rutas de módulos
const productos = require("./backend/modulos/productos/rutas");
const usuarios = require("./backend/modulos/usuarios/rutas");

// Middleware globales
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar las rutas del módulo productos
    app.use("/api/productos", productos);
    app.use("/api/usuarios", usuarios)

// Middleware para manejo de errores
const errorHandler = require("./backend/red/errors");
app.use(errorHandler); // SIEMPRE debe ir después de todas las rutas

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

