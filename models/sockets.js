
class Sockets {
    constructor(io) {
        this.io = io;
        this.socketsEvents();
    }

    socketsEvents() {
        // On connection
        this.io.on('connection', (socket) => {
            console.log("Client connected ID:", socket.id)
            
            //Listen event: message-to-server
            socket.on('message-to-server', (data) => {
                console.log(data)

                this.io.emit('message-from-server', data)
            })
        });
    }
}

module.exports = Sockets;