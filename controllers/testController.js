import { generateToken } from "../security/jwtManager.js"

export const jwtController = (req, res, next) => {
    const { user, deviceId } = req.body
    const token = generateToken({
        user, deviceId
    }, false, {})
    res.status(200).json(token)
}

