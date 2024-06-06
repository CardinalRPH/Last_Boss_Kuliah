import { WebSocketServer } from "ws"
import { decrypt } from "../security/aesManager.js"
import { verifyToken } from "../security/jwtManager.js"
import { userSockets } from "./socketStates.js"
import { saveDeviceWatering } from "../utilities/serverDeviceControll.js"
import saveValueInInterval from "../utilities/saveValueInInterval.js"
import { getUserDevicebyId } from "../models/firestoreDevice.js"
import { getUserbyId } from "../models/firestoreUser.js"

export default (server) => {
    const wsServer = new WebSocketServer({ noServer: true })

    server.on('upgrade', (request, socket, head) => {
        try {
            const path = request.url.split("/")
            if (path[1] !== "app") {
                socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
                socket.destroy()
                return
            }
            const pathToken = path[2]
            const authToken = path[3]
            if (!pathToken || !authToken) {
                socket.write("HTTP/1.1 400 Bad Request\r\n\r\n");
                socket.destroy()
                return
            }
            //aes 256 cbc path decrypt
            const decode = decrypt(pathToken)
            if (!decode) {
                socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
                socket.destroy()
                return
            }
            //check jwt  token is valid or not
            const acceptableToken = verifyToken(authToken, false)
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

    wsServer.on('connection', async (ws, req, acceptableToken, decode) => {
        const { user, deviceId } = acceptableToken
        console.log(`Device ${deviceId || user} connected`);
        //pushing user to array with group of user from ws path
        //check ws room
        const availableRoom = userSockets.find(item => item.roomId === decode)
        if (!availableRoom) {
            userSockets.push({ roomId: decode, member: [] })
        }
        const saveInterval = new saveValueInInterval()
        const saveDeviceWater = new saveDeviceWatering()
        const findRoom = userSockets.find(item => item.roomId === decode)
        console.log(findRoom);
        if (user && deviceId) {
            const existDevice = await getUserDevicebyId({ email: user, deviceId })
            if (!existDevice) {
                console.log('Device not Registered');
                ws.terminate()
                return
            }
            const userInRoom = findRoom?.member.find(item => item.id === deviceId)
            if (!userInRoom) {
                findRoom?.member.push({ id: deviceId, ws: ws })
            }
            //do interval saveData
            saveInterval.saveValue(decode, deviceId)
        } else if (user && deviceId === null) {
            const existUser = await getUserbyId({ email: user })
            if (!existUser) {
                console.log('User not Registered');
                ws.terminate()
                return
            }
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
        ws.on('message', async (message) => {

            try {
                const parsedData = JSON.parse(message)
                const { type, data } = parsedData
                if (!type || !data) {
                    ws.send(JSON.stringify({ type: 'error', message: 'Type or Data not found' }))
                    return
                }
                if (type !== 'message' && type !== 'error' && type !== 'info') {
                    ws.send(JSON.stringify({ type: 'error', message: 'Type not listed' }))
                    return
                }
                if (type === 'info') {
                    ws.send(JSON.stringify({ type: 'info', message: 'Server Connected to Client' }))
                }
                if (type === "message" && typeof data === "object") {
                    saveInterval.setDeviceData(data)
                    // console.log(data);

                    if (data?.waterEvent === true) {
                        //save watering into db
                        await saveDeviceWater.saveWatering(decode, deviceId)
                    } else {
                        saveDeviceWater.setIsWatering(false)
                    }
                    if (findRoom) {
                        //broadcast message in room
                        findRoom.member.forEach((client) => {
                            if (client.id === decode) {
                                // console.log(JSON.stringify(data));
                                client.ws.send(JSON.stringify(data))
                                // return
                            }
                        })
                    }
                }
            } catch (error) {
                console.error(error);
                ws.send(JSON.stringify({ type: 'error', message: 'Message is not JSON' }))
            }

        })

        //remove connection from group
        ws.on('close', () => {
            if (findRoom) {
                const roomIndex = userSockets.indexOf(findRoom)
                const memberIndex = findRoom.member.findIndex(item => item.ws === ws)

                console.log(`Device ${deviceId || user} disconeccted`);
                //remove user from room
                if (memberIndex !== -1) {
                    userSockets[roomIndex].member.splice(memberIndex, 1)
                }
                if (user && deviceId) {
                    saveInterval.setBreaker(true)
                    saveDeviceWater.setIsWatering(false)
                }
                //remove room from group if member is 0
                if (userSockets[roomIndex].member.length == 0) {
                    userSockets.splice(roomIndex, 1)
                }
            }
        })
        ws.on('error', (error) => {
            console.error(`WebSocket error: ${error}`);
            if (findRoom) {
                const roomIndex = userSockets.indexOf(findRoom)
                const memberIndex = findRoom.member.findIndex(item => item.ws === ws)

                console.log(`Device ${deviceId || user} disconeccted`);
                //remove user from room
                if (memberIndex !== -1) {
                    userSockets[roomIndex].member.splice(memberIndex, 1)
                }
                if (user && deviceId) {
                    saveInterval.setBreaker(true)
                    saveDeviceWater.setIsWatering(false)
                }
                //remove room from group if member is 0
                if (userSockets[roomIndex].member.length == 0) {
                    userSockets.splice(roomIndex, 1)
                }
            }
        })

    })
}

export const broadcastToRoom = (roomId, message) => {
    const findRoom = userSockets.find(item => item.roomId === roomId)
    if (findRoom) {
        findRoom.member.forEach((client) => {
            client.ws.send(JSON.stringify(message))
        })
    }
}

export const sentToClientinRoom = (roomId, clientId, message) => {
    const findRoom = userSockets.find(item => item.roomId === roomId)
    if (!findRoom) {
        return false
    }
    const clientInRoom = findRoom.member.find(c => c.id === clientId)
    if (!clientInRoom) {
        return false
    }

    clientInRoom.ws.send(JSON.stringify(message))
    return true
}