document.addEventListener("DOMContentLoaded", ()=>{
    const formulario = document.getElementById("form-crear-producto");
    const mensaje = document.getElementById("mensaje");
    const vistaPrevia = document.getElementById("vista-previa");

    addEventListener("submit",(e)=>{
        e.preventDefault(); //Evitar que se recargue la página

        const producto = {
            nombre: document.getElementById("nombre").value.trim(),
            descripcion: document.getElementById("descripcion").value.trim(),
            precio: Number(document.getElementById("precio").value) || 0,
            imagen: document.getElementById("imagen").value.trim(),
            stock: Number(document.getElementById("stock").value),
            estado: document.getElementById("estado").value.trim().toLowerCase()
        };

        if( !producto.nombre || !producto.descripcion || isNaN(producto.precio)  || !producto.imagen || isNaN(producto.stock) || !producto.estado){
            mensaje.innerHTML = `<div class="alert alert-danger">❌ Por favor completa todos los campos correctamente</div>`;
            return;
        }

        console.log("Producto que se enviará:", producto);

        //Enviar al backend (API REST con node.js + mysql)
        
        fetch("http://localhost:3000/api/productos/crear",{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(producto) //convierte el objeto JS a JSON
        })

        .then(res => res.json())
        .then(data =>{
            if (data.success) {
                mensaje.innerHTML = `<div class="alert alert-success">✅ Producto creado correctamente.</div>`;
                formulario.reset();

                vistaPrevia.innerHTML += `<div class="col">
                        <div class="card h-100 shadow-sm">
                            <img src="${producto.imagen}" class="card-img-top" alt="Producto">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text text-muted">${producto.descripcion}</p>
                                <p class="card-text fs-4 fw-bold mt-auto">$${producto.precio.toLocaleString("es-CO")}</p>
                                <a href="#" class="btn btn-primary mt-2">Añadir al Carrito</a>
                            </div>
                        </div>
                    </div>`
            }else{
                mensaje.innerHTML = `<div class="alert alert-success">⚠️${data.error}</div>`
            }
        })
        //si la petición falló completamente (ejm: servidor caído)
        .catch(err => {
            console.log("❌ Error al cargar productos", err);
            mensaje.innerHTML = `<div class="alert alert-danger">Error al conectar con el servidor</div>`;
        });
    });
});