document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedor-productos");

    fetch("http://localhost:3000/api/productos")
        .then(res => res.json())
        .then(data => {
            const productos = data.data;
            contenedor.innerHTML = "";

            // Pintar cada tarjeta
            productos.forEach(producto => {
                const tarjeta = document.createElement("div");
                tarjeta.className = "col";
                tarjeta.innerHTML = `
                    <div class="card h-100 shadow-sm">
                        <div class="dropdown ms-auto mt-3 me-3">
                            <button class="btn btn-secondary dropdown-toggle dropdown-toggle-split" type="button" data-bs-toggle="dropdown">
                                Opciones
                            </button>
                            <ul class="dropdown-menu dropdown-menu-dark">
                                <li><a href="#" class="dropdown-item btn-editar" data-id="${producto.id}">Editar</a></li>
                                <li><a href="#" class="dropdown-item btn-eliminar" data-id="${producto.id}">Eliminar</a></li>
                            </ul>
                        </div>
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text text-muted">${producto.descripcion}</p>
                            <p class="card-text fs-4 fw-bold mt-auto">$${producto.precio.toLocaleString("es-CO")}</p>
                        </div>
                    </div>
                `;
                contenedor.appendChild(tarjeta);
            });

            // ✅ Asignar eventos después de pintar todas las tarjetas
            asignarEventosEditar();
            asignarEventosEliminar();
        })
        .catch(err => {
            console.error("❌ Error al cargar productos:", err);
        });

    function asignarEventosEditar() {
        const botonesEditar = document.querySelectorAll(".btn-editar");
        botonesEditar.forEach(boton => {
            boton.addEventListener("click", (e) => {
                e.preventDefault();
                const id = boton.getAttribute("data-id");
                window.location.href = `editar.html?id=${id}`;
            });
        });
    }
    function asignarEventosEliminar() {
        const botonesEliminar = document.querySelectorAll(".btn-eliminar");
        botonesEliminar.forEach(boton => {
            boton.addEventListener("click", (e) => {
                e.preventDefault();
                const id = boton.getAttribute("data-id");

                fetch(`http://localhost:3000/api/productos/eliminar/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            alert("Producto eliminado correctamente");
                            location.reload();
                        } else {
                            alert("Error al eliminar producto");
                        }
                    })
                    .catch(err => {
                        console.error("Error al eliminar producto:", err);
                    });
            }); 
        });
    }
});
