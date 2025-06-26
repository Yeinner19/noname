document.addEventListener("DOMContentLoaded",()=>{
    fetch("../productos/productos.json")
    .then(res => res.json())
    .then(data =>{
        mostrarProductos(data)
    })
    .catch(error => console.log("Error al cargar productos", error));
});

function mostrarProductos(productos){
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";  

    productos.forEach(producto => {
        contenedor.innerHTML += `
        <div class="col">
            <div class="card h-100 shadow-sm">
                <img src="${producto.imagen}" class="card-img-top" alt="Nombre del Producto 4">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text text-muted">${producto.descripcion}</p>
                    <p class="card-text fs-4 fw-bold mt-auto">$${producto.precio.toLocaleString("es-CO")}</p>
                    <a href="#" class="btn btn-primary mt-2">Añadir al Carrito</a>
                </div>
            </div>
        </div>
        `
    });
}