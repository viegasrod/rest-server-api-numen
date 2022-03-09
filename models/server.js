const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        //this.usuariosPath = '/api/usuarios';
        this.productosPath = '/api/productos';
        this.authPath = '/api/auth';
        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        //Conectar a la base de datos
        this.conectarDB()
    }

    async conectarDB(){
       await dbConnection()
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.productosPath, require('../routes/productos'));
        this.app.use( this.authPath, require('../routes/auth'));
        
        //this.app.use( this.productoPath, require('../routes/productos'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}
module.exports = Server;
