document.addEventListener("DOMContentLoaded",()=>{
    const form = document.getElementById("form-login");
    const mensaje = document.getElementById("mensaje");


    form.addEventListener("submit", (e)=>{
        e.preventDefault();

        const data = {
            correo: document.getElementById("correo").value.trim(),
            contraseña: document.getElementById("contraseña").value
        };

        fetch("http://localhost:3000/api/usuarios/iniciar",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(respuesta=>{
            if(respuesta.success){
                const usuario = respuesta.data.usuario;

                localStorage.setItem("usuario", JSON.stringify(usuario));

                mensaje.innerHTML = `<div class="alert alert-success">Bienvenido ${usuario.nombre}</div>`

                setTimeout(()=>{
                    if(usuario.rol === "admin"){
                        window.location.href = "admin.html";
                    } else if (usuario.rol === "vendedor"){
                        window.location.href = "vendedor.html"
                    }else {
                        window.location.href = "pagina-principal.html"
                    }
                }, 1500)
            } else{
                mensaje.innerHTML = `<div class="alert alert-danger">❌ ${respuesta.error}</div>`
            }
        })
        .catch(err=>{
            console.error("❌ Error al iniciar sesión", err);
            mensaje.innerHTML = `<div class="alert alert-danger">Error al conectar con el servidor</div>`
        });
    });
});