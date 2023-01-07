const { Socket } = require("socket.io")

const io = require("socket.io")(8080, {
    cors: {
        origin: "http://localhost:3000"
    }
})

io.on('connection', (Socket) => {
    console.log('user Connected')
})