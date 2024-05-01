import { sentToClientinRoom } from "../webSocket/webSocketServer.js"

export const sentToClient = (req, res, next) => {
    const { message, roomId, clientId } = req.body
    const exception = sentToClientinRoom(roomId, clientId, message)
    console.log(exception);
    if (!exception) {
        res.status(404).json({
            error: "Not Found"
        })
        return
    }
    res.status(200).json({
        status: "ok"
    })
}

export const broadcastClientInRoom = (req, res) => {
    
}