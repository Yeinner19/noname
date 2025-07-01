const consultas = require("./consultas"); //Importo el archivo 'consultas.js'

const { exito, error } = require("../../red/respuesta");

const crearProductos = (request, response, next) =>{
    const data = request.body;
    if(!data.nombre || !data.descripcion || !data.precio || data.imagen){
        return error(request, response, "Faltan campos obligatorios", 400);
    }
    consultas.crearProducto(data)
    .then(resultado => exito(request, response, "Producto creado correctamente", 201))
    .catch (err => next(err));
};

const verTodos = (request, response, next) =>{
    consultas.verTodos()
    .then(productos => exito(request, response, productos, 200))
    .catch(err => next(err));
};

const verUno = (request, response, next) =>{
    const id = request.params.id;

    consultas.verUno(id)
    .then(producto =>{
        if (producto){
            exito(request, response, producto, 200);
        } else {
            error(request, response, "Producto no encontrado", 404);
        }
    })
    .catch(err => next(err));
};

const editarProducto = (request, response, next) =>{
    const data = request.body;

    if (!data.id){
        return error(request, response, "Falta el ID del producto", 400)
    }

    consultas.editarProducto(data)
    .then(resultado => exito(request, response, "Producto actualizado", 200))
    .catch(err => next(err));
}

const eliminarProducto = (request, response, next) =>{
    const id = request.params.id;

    consultas.eliminarProducto(id)
    .then(() => exito(request, response, "Producto eliminado", 200))
    .catch (err => next(err));
}

module.exports = {
    crearProductos,
    verTodos,
    verUno,
    editarProducto,
    eliminarProducto
};