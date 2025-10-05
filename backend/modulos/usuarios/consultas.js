const db = require("../../config/db");
const bcrypt = require("bcrypt");

const registrarUsuario = (data) =>{
    return new Promise(async (resolve, reject)=>{
        try{
            const {nombre, correo, contrasena} = data;
            const hash = await bcrypt.hash(contrasena, 10);
            const query = `
            INSERT INTO usuarios (nombre, correo, contrasena)
            VALUES (?, ?, ?)`;
            const valores = [nombre, correo, hash];

            db.query(query, valores, (err, result )=>{
                if (err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        } catch(error){
            reject(error)
        }
    });
};

const iniciarSesion = (correo) =>{
    return new Promise((resolve, reject)=>{
        const query = `SELECT * FROM usuarios WHERE correo = ?`;

        console.log("SQL Query a ejecutar:", query);
        console.log("Parámetros de la query:", [correo]);

        db.query(query, [correo], (err, results) =>{
            if(err) {
                console.error("Error en db.query (iniciarSesion):", err);
                reject(err);
            }
            else if (results.length === 0) resolve(null);
            else resolve(results[0]);
        });
    });
};

module.exports = {
    registrarUsuario,
    iniciarSesion
}