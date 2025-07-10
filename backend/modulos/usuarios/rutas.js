const express = require("express")
const router = express.Router();
const controlador = require("./controlador");   

router.post("/registrar", controlador.registrar);
router.post("/iniciar", controlador.iniciarSesion);

module.exports = router;