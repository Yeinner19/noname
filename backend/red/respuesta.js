/**
 * Este módulo centraliza todas las respuestas del servidor.
 * Sirve para mantener un formato uniforme: { success, message, data }
 */

// ✅ Respuesta de éxito
function exito(req, res, data = "", status = 200) {
  res.status(status).json({
    success: true,
    message: typeof data === "string" ? data : undefined,
    data: typeof data === "object" ? data : undefined,
  });
}

// ❌ Respuesta de error
function error(req, res, mensaje = "Error inesperado", status = 500) {
  res.status(status).json({
    success: false,
    error: mensaje,
  });
}

module.exports = {
  exito,
  error,
};
