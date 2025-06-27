document.addEventListener("DOMContentLoaded",()=>{
    
    const formulario = document.getElementById("form-crear-producto"); //Se obtiene el formulario desde el html por su ID

    const mensaje = document.getElementById("mensaje"); //Se obtiene un mensaje que mostrará "éxito" o "error" desde el html por su ID

    const vistaPrevia = document.getElementById("vista-previa");

    
    formulario.addEventListener("submit",(e)=>{
        e.preventDefault(); //Esto sirve para que la página no se recargue cuando se oprima el botón de submit

        const producto = {
            id: Date.now(),
            nombre: document.getElementById("nombre").value.trim(),
            descripcion: document.getElementById("descripcion").value.trim(),
            precio: parseFloat(document.getElementById("precio").value),
            imagen: document.getElementById("imagen").value.trim()
        };  
        
        if(!producto.nombre || !producto.descripcion || isNaN(producto.precio || !producto.imagen)){
            mensaje.innerHTML = `<div class="alert alert-danger">Por favor completa todos los campos correctamente </div>`;
            return;
        }


        const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];

        productosGuardados.push(producto);

        localStorage.setItem("productos", JSON.stringify(productosGuardados));
        
        mensaje.innerHTML = `<div class="alert alert-success"> Producto creado correctamente-</div>`;


        vistaPrevia.innerHTML += `
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
        
        formulario.reset();

    });
});
