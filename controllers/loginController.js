import { userSockets } from "../webSocket/socketStates.js";

export default (req, res, next) => {
    const userId = req.body.userId;

    // Kirimkan pesan login ke koneksi websocket pengguna
    if (userSockets[userId]) {
        userSockets[userId].emit('login', userId);
    }

    res.status(200).json({
        ok: true
    })
}