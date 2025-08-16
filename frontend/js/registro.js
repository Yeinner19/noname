document.addEventListener("DOMContentLoaded",()=>{

    const formulario = document.getElementById("form-registro");
    const mensaje = document.getElementById("mensaje");

    formulario.addEventListener("submit",(e)=>{
        e.preventDefault();
        const data = {
            nombre: document.getElementById("nombre").value.trim(),
            correo: document.getElementById("correo").value.trim(),
            contraseña: document.getElementById("contraseña").value
        };

        if(!data.nombre || !data.correo || !data.contraseña){
            mensaje.innerHTML = `<div class="alert alert-danger">Todos los campos son obligatorios</div>`;
            console.log("3. Validación frontend fallida: campos obligatorios.");
            return;
        }
        

        fetch("http://localhost:3000/api/usuarios/registrar",{ //AQUÍ TENÍA MAL LA RUTA
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data) //convierte la data en una cadena de texto json
        })
        .then(res => {
            return res.json();
        })
        
        .then(respuesta =>{
            if(respuesta.success){
                mensaje.innerHTML = `<div class="alert alert-success">✅ Usuario registrado correctamente</div>`;
                formulario.reset();

                setTimeout  (()=>{
                    window.location.href = "login.html";
                },2000);
            } else{
                mensaje.innerHTML = `<div class="alert alert-danger">❌ ${respuesta.error}</div>`
            }
        })
        .catch(error=> {
            console.error("7. Error en la petición fetch (red/CORS):", error);
            mensaje.innerHTML = `<div class="alert alert-danger">Error al conectar con el servidor</div>`;
        });
    });
});