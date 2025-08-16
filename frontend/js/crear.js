document.addEventListener("DOMContentLoaded", ()=>{
    const formulario = document.getElementById("form-crear-producto");
    const mensaje = document.getElementById("mensaje");
    const vistaPrevia = document.getElementById("vista-previa");

    addEventListener("submit",(e)=>{
        e.preventDefault(); //Evitar que se recargue la página

        const producto = {
            nombre: document.getElementById("nombre").value.trim(),
            descripcion: document.getElementById("descripcion").value.trim(),
            precio: parseFloat(document.getElementById("precio").value),
            imagen: document.getElementById("imagen").value.trim()
        };

        if( !producto.nombre || !producto.descripcion || isNaN(producto.precio)  || !producto.imagen){
            mensaje.innerHTML = `<div class="alert alert-danger">❌ Por favor completa todos los campos correctamente</div>`;
            return;
        }

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

(function () {
  // Garantiza que corra tanto si el script carga antes o después del DOM
  const start = () => {
    const fileInput = document.getElementById("fileInput");
    const previewImage = document.getElementById("previewImage");

    if (!fileInput || !previewImage) {
      console.error("No se encontró #fileInput o #previewImage. Revisa los IDs y el HTML.");
      return;
    }

    fileInput.addEventListener("change", () => {
      const file = fileInput.files && fileInput.files[0];
      if (!file) { previewImage.style.display = "none"; previewImage.removeAttribute("src"); return; }

      // Valida tipo: PNG o JPEG
      const ok = file.type === "image/png" || file.type === "image/jpeg";
      if (!ok) {
        alert("Solo se permiten imágenes PNG o JPEG.");
        fileInput.value = "";
        previewImage.style.display = "none";
        previewImage.removeAttribute("src");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewImage.style.display = "block";
      };
      reader.readAsDataURL(file);
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
