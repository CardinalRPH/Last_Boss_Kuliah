import { Server } from "socket.io"
import { deviceSockets, userSockets } from "./socketStates.js"
import { verifyToken } from "../security/jwtManager.js"

//user a have 1,2
//user b have 3,4

export default (server) => {
    const io = new Server(server)


    io.on('connection', (socket) => {
        const token = socket.handshake.headers.auth

        if (!token) {
            socket.disconnect()
            return
        }
        const decode = verifyToken(token)
        if (!decode) {
            socket.disconnect()
            return
        }
        const { user, deviceId } = decode
        if (user && deviceId) {
            socket.join(`scRoom${user}`)
            deviceSockets[deviceId] = socket
        }
        if (user && deviceId === null) {
            console.log('got it');
            socket.join(`scRoom${user}`)
            userSockets[user] = socket
        }

        socket.on('sendMessageToRoom', (room, messages) => {
            io.to(room).emit("message", messages)
        })

        socket.on('disconnect', () => {
            // Temukan ID pengguna yang terkait dengan koneksi socket ini
            const userId = Object.keys(userSockets).find(key => userSockets[key] === socket);
            if (userId) {
                // Hapus koneksi socket untuk pengguna yang logout atau putus koneksi
                delete userSockets[userId];
                console.log('User disconnected:', userId);
                // Keluar dari room sesuai dengan userId
                socket.leave(userId);
            }
        });
    })
}