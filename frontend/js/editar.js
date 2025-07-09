document.addEventListener("DOMContentLoaded",()=>{
    const id = new URLSearchParams(window.location.search).get("id");
    console.log("🧠 ID recibido desde URL:", id);
    const formulario = document.getElementById("form-editar-producto");
    const mensaje = document.getElementById("mensaje");

    fetch(`http://localhost:3000/api/productos/${id}`)
    .then(res => res.json())
    .then(data=>{
        const producto = data.data;
    document.getElementById("id").value = producto.id;
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("descripcion").value = producto.descripcion;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("imagen").value = producto.imagen;
    })
    .catch(err => {
        mensaje.innerHTML = `<div class="alert alert-danger">Error al cargar el producto.</div>`;
        console.error("❌ Error",err);
    });

    formulario.addEventListener("submit", (e)=> {
        e.preventDefault();

        const productoActualizado = {
            id: document.getElementById("id").value,
            nombre: document.getElementById("nombre").value.trim(),
            descripcion: document.getElementById("descripcion").value.trim(),
            precio: parseFloat(document.getElementById("precio").value),
            imagen: document.getElementById("imagen").value.trim()
        };

        fetch("http://localhost:3000/api/productos/editar",{
            method:"PUT",
            body: JSON.stringify(productoActualizado),
            headers:{"Content-Type":"application/json"}
        })
        .then(res => res.json())
        .then(data =>{
            if(data.success){
                mensaje.innerHTML = `<div class="alert alert-success">✅ Producto actualizado correctamente.</div>`;

                setTimeout(()=>{
                    window.location.href = "pagina-principal.html";
                }, 2000);
            } else{
                mensaje.innerHTML = `<div class="alert alert-danger">❌ ${data.error}</div>`;
            }
        })
        .catch(error =>{
            mensaje.innerHTML = `<div class="alert alert-danger">❌ Error al conectar con el servidor.</div>`;

            console.error("Error", error);
        });
    });
});