import { WebSocketServer } from "ws"
import { decrypt } from "../security/aesManager.js"
import { verifyToken } from "../security/jwtManager.js"
import { userSockets } from "./socketStates.js"

export default (server) => {
    const wsServer = new WebSocketServer({ noServer: true })

    server.on('upgrade', (request, socket, head) => {
        try {
            const path = request.url.substring(1)
            const token = request.headers.authorization
            if (!path || !token) {
                socket.write("HTTP/1.1 400 Bad Request\r\n\r\n");
                socket.destroy()
                return
            }
            //aes 256 cbc path decrypt
            const decode = decrypt(path)
            if (!decode) {
                socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
                socket.destroy()
                return
            }
            //check jwt  token is valid or not
            const acceptableToken = verifyToken(token, false)
            if (!acceptableToken) {
                socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
                socket.destroy()
                return
            }
            wsServer.handleUpgrade(request, socket, head, (ws) => {
                wsServer.emit('connection', ws, request, acceptableToken, decode)
            })
        } catch (error) {
            console.log("upgrade exception", error);
            socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
            socket.destroy()
        }
    })

    wsServer.on('connection', (ws, req, acceptableToken, decode) => {
        const { user, deviceId } = acceptableToken
        //pushing user to array with group of user from ws path
        //check ws room
        const availableRoom = userSockets.find(item => item.roomId === decode)
        if (!availableRoom) {
            userSockets.push({ roomId: decode, member: [] })
        }

        const findRoom = userSockets.find(item => item.roomId === decode)
        if (user && deviceId) {

            const userInRoom = findRoom?.member.find(item => item.id === deviceId)
            if (!userInRoom) {
                findRoom?.member.push({ id: deviceId, ws: ws })
            }
        } else if (user && deviceId === null) {

            const userInRoom = findRoom?.member.find(item => item.id === user)
            if (!userInRoom) {
                findRoom?.member.push({ id: user, ws: ws })
            }
        } else {
            ws.terminate()
            return
        }

        ws.on('pong', () => {
            ws.send(JSON.stringify({ type: 'pong', message: 'ok' }))
        })

        //send message over the group room
        ws.on('message', (message) => {       
            try {
                const parsedData = JSON.parse(message)
                const { type, data } = parsedData
                console.log(type);
                if (!type || !data) {
                    ws.send(JSON.stringify({ type: 'error', message: 'Type or Data not found' }))
                    return
                }
                if (type !== 'event' && type !== 'reader') {
                    ws.send(JSON.stringify({ type: 'error', message: 'Type not listed' }))
                    return
                }
                if (findRoom) {
                    findRoom.member.forEach((client) => {
                        client.ws.send(data)
                    })
                }
            } catch (error) {
                ws.send(JSON.stringify({ type: 'error', message: 'Message is not JSON' }))
            }

        })

        //remove connection from group
        ws.on('close', () => {
            if (findRoom) {
                const roomIndex = userSockets.indexOf(findRoom)
                const memberIndex = findRoom.member.findIndex(item => item.ws === ws)
                if (memberIndex !== -1) {
                    userSockets[roomIndex].member.splice(memberIndex, 1)
                }
                //remove room from group if member is 0
                if (userSockets[roomIndex].member.length == 0) {
                    userSockets.splice(roomIndex, 1)
                }
            }
        })

    })
}