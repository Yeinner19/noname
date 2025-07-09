const consultas = require("./consultas");
const { exito, error} = require("../../red/respuesta");

const registrar = (req, res, next) => {
    const data = req.body;

    if (!data.nombre || !data.correo || !data.contraseña){
        return error(req, res, "Todos los campos son obligatorios", 400)
    }
    consultas.registrarUsuario(data)
        .then(()=>exito(req, res,"Usuario registrado correctamente", 201))
        .catch(err => {
            if (err.code === "ER_DUP_ENTRY"){
            error(req, res, "El correo ya está registrado", 409);
            } else{
            next(err)
            }
        });
    };

module.exports = {
    registrar
};