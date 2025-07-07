document.addEventListener("DOMContentLoaded",()=>{
    const contenedor = document.getElementById("contenedor-productos");

    fetch("http://localhost:3000/api/productos")
    .then (res => res.json())
    .then(data => {
        const productos = data.data;

        contenedor.innerHTML = "";

        productos.forEach(producto => {
            const tarjeta = document.createElement("div");
            tarjeta.className = "col";
            tarjeta.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="dropdown ms-auto mt-3 me-3">
                    <button class="btn btn-secondary dropdown-toggle dropdown-toggle-split" type="button" data-bs-toggle="dropdown">Opciones</button>
                <ul class="dropdown-menu dropdown-menu-dark">
                    <li><a class="dropdown-item active" href="#">Editar</a></li>
                    <li><a class="dropdown-item btn-eliminar" href="#" data-id="${producto.id}">Eliminar</a></li>
                </ul>
            </div>
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text text-muted">${producto.descripcion}</p>
                <p class="card-text fs-4 fw-bold mt-auto">'$${producto.precio.toLocaleString("es-CO")}'</p>
            </div>
            </div>
            `;
            contenedor.appendChild(tarjeta)
        });

        const botonesEliminar = document.querySelectorAll(".btn-eliminar");

        botonesEliminar.forEach(boton =>{
            boton.addEventListener("click", (e)=>{
                e.preventDefault();
                const id = boton.getAttribute("data-id");

                fetch(`http://localhost:3000/api/productos/eliminar/${id}`,{
                    method: "DELETE"
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success){
                        alert("Producto eliminado correctamente");
                        location.reload();
                    } else{
                        alert("Error al eliminar producto:");
                    }
                })
                .catch(err => {
                    console.error("Error al eliminar producto:", err)
                });
            });
        });
    })
    .catch(err =>{
        console.error("❌ Error al cargar productos:", err);
    });
});