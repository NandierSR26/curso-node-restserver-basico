const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // conectar a la db
        this.conectarDB();

        // middlewares
        this.middlewares()


        // rutas de mi app
        this.routes();
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        // CORS
        this.app.use(cors())

        // parseo y lectura del body
        this.app.use(express.json())

        // directorio publico
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor correindo en el puerto ', this.port);
        })
    }
}

module.exports = Server;