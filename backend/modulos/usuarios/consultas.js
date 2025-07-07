const db = require("../../config/db") //importo conexión  a la base de datos.


const registrarUsuario = (usuario) =>{
    return new Promise((resolve, reject)=>{

        const query = "INSERT INTO usuarios(nombre, correo, contrasena, tipo) VALUES (?, ?, ?, ?)";
        const valores = [usuario.nombre, usuario.correo, usuario.contrasena, usuario.tipo || 'cliente'];

        db.query(query, valores,(error, resultado )=>{
            if (error){
                reject(error)
            } else {
                resolve(resultado)
            }
        })
    });
}

const buscarUsuarioPorCorreo = (correo) => {
    return new Promise((resolve, reject)=>{

        const query = "SELECT * FROM usuarios WHERE correo = ?";

        db.query(query, [correo], (error, resultado)=>{
            if (error) {
                reject(error);
            } else {
                resolve(resultado)
            }
        });       
    });
}

module.exports = {
    registrarUsuario,
    buscarUsuarioPorCorreo
}