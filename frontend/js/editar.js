document.addEventListener("DOMContentLoaded", () => {
    const id = new URLSearchParams(window.location.search).get("id");
    console.log("🧠 ID recibido desde URL:", id);
    const mensaje = document.getElementById("mensaje");

    // 🚨 Corrección 1: Validar si el ID existe antes de continuar
    if (!id) {
        console.error("❌ Error: No se encontró un ID de producto en la URL.");
        if (mensaje) {
            mensaje.innerHTML = `<div class="alert alert-danger">❌ Debes seleccionar un producto para editar.</div>`;
        }
        // Opcional: Redirigir al usuario a una página principal
        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000);
        return; // Detener la ejecución del script aquí
    }

    // 🚨 Corrección 2: Mover la obtención del formulario aquí, ya que el ID es válido
    const formulario = document.getElementById("form-editar-producto");

    if (!formulario) {
        console.error("❌ Error: No se encontró el formulario de edición en el HTML.");
        if (mensaje) {
            mensaje.innerHTML = `<div class="alert alert-danger">❌ Error interno: Formulario no encontrado.</div>`;
        }
        return;
    }

    // El resto de la lógica se ejecuta solo si el ID y el formulario existen.
    
    // Obtener los datos del producto para editar
    fetch(`http://localhost:3000/api/productos/${id}`)
    .then(res => res.json())
    .then(data => {
        const producto = data.data;
        if (producto) {
            document.getElementById("id").value = producto.id;
            document.getElementById("nombre").value = producto.nombre;
            document.getElementById("descripcion").value = producto.descripcion;
            document.getElementById("precio").value = producto.precio;
            document.getElementById("imagen").value = producto.imagen;
        } else {
            if (mensaje) {
                mensaje.innerHTML = `<div class="alert alert-warning">⚠️ Producto no encontrado.</div>`;
            }
        }
    })
    .catch(err => {
        if (mensaje) {
            mensaje.innerHTML = `<div class="alert alert-danger">❌ Error al cargar el producto.</div>`;
        }
        console.error("❌ Error", err);
    });

    // Lógica para el envío del formulario
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const productoActualizado = {
            id: document.getElementById("id").value,
            nombre: document.getElementById("nombre").value.trim(),
            descripcion: document.getElementById("descripcion").value.trim(),
            precio: parseFloat(document.getElementById("precio").value),
            imagen: document.getElementById("imagen").value.trim()
        };

        fetch("http://localhost:3000/api/productos/editar", {
            method: "PUT",
            body: JSON.stringify(productoActualizado),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                if (mensaje) {
                    mensaje.innerHTML = `<div class="alert alert-success">✅ Producto actualizado correctamente.</div>`;
                }
                setTimeout(() => {
                    window.location.href = "/noname/index.html";
                }, 2000);
            } else {
                if (mensaje) {
                    mensaje.innerHTML = `<div class="alert alert-danger">❌ ${data.error}</div>`;
                }
            }
        })
        .catch(error => {
            if (mensaje) {
                mensaje.innerHTML = `<div class="alert alert-danger">❌ Error al conectar con el servidor.</div>`;
            }
            console.error("Error", error);
        });
    });
});