//Este código tiene el propósito de *Establecer y Gestionar la 
//conexión de mi app node.js con la base de datos MySQL: mysql2*

const mysql = require("mysql2"); //Importo la librería sql2
//es como traer la herramienta que necesito para construir algo.

require("dotenv").config(); //Importo y cargo el paquete 'dotenv'. 
//El cual busca el archivo llamado '.env' en la raíz de mi proyecto
// y carga las variables que contiene en el objeto global 'process.env'
// Esto es crucial para la seguridad y la seguridad y configuración .


//Se crea la conexión a la base de datos
// La función 'createConnection' recibe un objeto con todos los detalles de la conexión.

const db = mysql.createConnection({ //esta es una instancia de conección a la base de datos. Aquí creo el objeto de conección directamente.
    //Estas son las credenciales y detalles de mi base de datos.
    // se leen desde '.env' para mantener la información sensible segura.
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

//Aquí se pruba la conección

db.connect((err) =>{ //función de callback recibe parámetro 'err'
    if (err){
        console.log("Error al conectar a MySQL:", err); // si hay un error, el objeto 'err' contiene la información del mismo.
    } else {
        console.log("Conectado a MySQL exitosamente")
    }
});

module.exports = db; // exporto la instancia conección ('db') para que pueda ser utilizada en otros archivos de aplicación.
//Esta línea es fundamental. Hace que el objeto de conexión db esté disponible para otros archivos de tu aplicación, lo que te permite importar la conexión y usarla para ejecutar consultas SQL (por ejemplo, db.query('SELECT * FROM productos')).