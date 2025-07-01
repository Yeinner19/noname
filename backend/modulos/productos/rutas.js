const express = require("express");
const router = express.Router();

const controlador = require("./controlador");
const { crearProducto } = require("./consultas");

router.post("/crear", controlador.crearProductos);
router.get("/", controlador.verTodos);
router.get("/:id", controlador.verUno);
router.put("/editar", controlador.editarProducto);
router.delete("/eliminar/:id", controlador.eliminarProducto);

module.exports = router;