const consultas = require("./consultas");
const { exito, error} = require("../../red/respuesta");
const bcrypt = require("bcrypt");

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


const iniciarSesion = (req, res, next) =>{
    const { correo, contraseña } = req.body;

    if(!correo || !contraseña){
        return error(req, res, "El correo y la contraseña son obligatorios", 400)
    }
    consultas.iniciarSesion(correo)
        .then(usuario =>{

            if (!usuario){
                return error(req, res, "Usuario no encontrado", 404)
            }

            bcrypt.compare(contraseña, usuario.contraseña, (err, coinciden)=>{
                if (err || !coinciden){
                    return error (req, res, "contraseña incorrecta", 401);
                }

                exito(req, res, {
                    mensaje: "Inicio de sesión exitoso",
                    usuario: {
                        id: usuario.id,
                        nombre: usuario.nombre,
                        correo: usuario.correo,
                        rol: usuario.rol
                    }
                }, 200);
            
            })
        })
        .catch(next);
};



module.exports = {
    registrar,
    iniciarSesion
};