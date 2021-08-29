//Servidor express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const Sockets = require('./sockets');

class server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //http server
        this.server = http.createServer(this.app);

        //config socket
        //Configuracion del socket server
        this.io = socketio(this.server, {/* configuraciones */});
    }

    middlewares() {
        //Desplegar el directorio publico
        this.app.use( express.static( path.resolve( __dirname, '../public')));
    }

    socketConfigurarion() {
        new Sockets(this.io);
    }
    
    execute() {

        //Inicializar middlewares
        this.middlewares();

        //Inicializar sockets
        this.socketConfigurarion();
        
        //Inicializar server
        this.server.listen(this.port, () => {
            console.log("Server running in port: ", this.port)
        });
    }
}

module.exports = server;