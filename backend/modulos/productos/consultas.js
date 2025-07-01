const db = require("../../config/db");

//esta es la función para crear un nuevo producto en la base de datos
function crearProducto(data){ //data es el objeto que contiene los datos del producto
    return new Promise ((resolve, reject)=>{
        const query = "INSERT INTO productos (nombre, descripcion, precio, imagen) VALUES (?, ?, ?, ?)";
        const valores = [data.nombre, data.descripcion, data.precio, data.imagen];

        db.query(query, valores, (error, result)=> { //Ejecutar la consulta en la base de datos 
            if(error) return reject(error);
            resolve(result);
        });
    });
}

//Función para ver todos los productos
function verTodos() {
    return new Promise ((resolve, reject)=>{
        const query = "SELECT * FROM productos";

        db.query(query, (error, results)=>{
            if (error) return reject(error); 
            resolve(results);
        });
    });
}

//Función para Ver un sólo producto
function verUno(id){
    return new Promise ((resolve, reject)=>{
        const query = "SELECT * FROM productos WHERE id = ?";
        db.query(query, [id], (error, resultado)=>{
            if (error){
                reject(error);
            } else {
                resolve(resultado[0])
            } 
        });
    });
}

//Función para Editar producto
const editarProducto = (data) =>{
    return new Promise ((resolve, reject)=>{
        const query = "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, imagen = ?";
        const valores = [data.nombre, data.descripcion, data.precio, data.imagen]

        db.query(query, valores, (error, result)=>{
            if (error) {;
                reject(error)
            } else {
                resolve(result);
            }
        })
    });
};

//Función para Eliminar un producto por su id
const eliminarProducto = (id) =>{
    return new Promise((resolve, reject)=>{
        const query = "DELETE FROM productos WHERE id = ?"

        db.query(query, [id], (error, result)=>{
            if (error) {
                reject(error);
            } else{
            resolve(result);
            }
        });
    });
}

module.exports ={
    crearProducto,
    verTodos,
    verUno,
    editarProducto,
    eliminarProducto
};