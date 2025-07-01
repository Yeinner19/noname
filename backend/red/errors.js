// noname/red/errors.js
function errorHandler(err, req, res, next) {
console.error("❌ ERROR:", err);

res.status(err.status || 500).json({
    success: false,
    message: err.message || "Error interno del servidor"
});
}

module.exports = errorHandler;