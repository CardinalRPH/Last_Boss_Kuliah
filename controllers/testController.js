import { encrypt } from "../security/aesManager.js"
import { generateToken } from "../security/jwtManager.js"

export const jwtController = (req, res, next) => {
    const { user, deviceId } = req.body
    const token = generateToken({
        user, deviceId
    }, false, {})
    const encryptedemail = encrypt(user)
    res.status(200).json({
        path: encryptedemail,
        token
    })
}

