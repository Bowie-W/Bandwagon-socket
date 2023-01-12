const { Socket } = require("socket.io")

const io = require("socket.io")(8080, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let users = []

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}

const addUser= (userId, socketId) => {
    !users.some(user=>user.userId === userId) &&
    users.push ({userId, socketId})
}

const getUser = (receiverId) => {
    return users.find(user=>user.userId === receiverId)
}

io.on('connection', (socket) => {
    // console.log('user Connected')

    //take ids
    socket.on('addUser', userId =>{
        addUser(userId, socket.id)
        io.emit('getUsers', users)
    })

    //send msgs
    socket.on('sendMsg', ({senderId, receiverId, text}) => {
        // console.log(senderId)
        const user = getUser(receiverId)
        console.log(user.socketId)
        io.to(user.socketId).emit('getMessage', {
            senderId,
            text
        })
    })

    //disconnect
    socket.on('disconnect', () => {
        console.log('user Disconnected')
        removeUser(socket.id)
        io.emit('getUsers', users)
    })
})

