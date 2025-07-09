const db = require("../../config/db");
const bcrypt = require("bcrypt");

const registrarUsuario = (data) =>{
    return new Promise(async (resolve, reject)=>{
        try{
            const {nombre, correo, contraseña} = data;
            const hash = await bcrypt.hash(contraseña, 10);
            const query = `
            INSERT INTO usuarios (nombre, correo, contraseña)
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

module.exports = {
    registrarUsuario
}