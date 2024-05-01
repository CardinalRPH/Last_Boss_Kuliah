import { getUserbyId, updateUser } from "../models/firestoreUser.js"
import { Bhash } from "../security/bcryptPassword.js"
import { generateToken, verifyToken } from "../security/jwtManager.js"
import contentValidation from "../security/validations/contentValidation.js"
import mailSender from "../utilities/mailSender.js"

export const forgetValidateEmailPost = async (req, res) => {
    //this is validate email user and send to user email reset pass
    const { userMail } = req.body
    //validation
    if (!userMail) {
        res.status(400).json({
            error: "Missing Data!"
        })
        return
    }
    const validContent = contentValidation(req.body, {
        userMail: 'string',
    })
    if (validContent !== null) {
        res.status(400).json({
            error: validContent
        })
        return
    }
    if (!isEmailValid(userMail)) {
        res.status(400).json({
            error: "Email not Valid"
        })
        return
    }

    //do logic controller
    try {
        const existUser = await getUserbyId({ email: userMail })
        if (!existUser) {
            res.status(404).json({ error: 'User not found' })
            return
        }

        const token = generateToken({
            email: existUser.data.email
        }, false, {
            expireMinutes: 10
        })

        mailSender(userMail, 'resetPass', {
            userName: existUser.data.name,
            payload: `http://${process.env.FRONT_END_DOMAIN}/${token}`
        })
        res.status(200).json({
            data: 'Recovery password link sent to your email!'
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
}

export const forgetValidateTokenPost = (req, res) => {
    //this will validate token from email
    const { token } = req.body
    //validation
    if (!token) {
        res.status(400).json({
            error: "Missing Data!"
        })
    }
    const validContent = contentValidation(req.body, {
        token: 'string',
    })
    if (validContent !== null) {
        res.status(400).json({
            error: validContent
        })
        return
    }
    //do controller logic
    const validToken = verifyToken(token, false)
    if (!validToken) {
        res.status(403).json({ error: 'Forbidden - Token Expire or Wrong' })
        return
    }
    const { email } = validToken

    if (!isEmailValid(email)) {
        res.status(400).json({
            error: "Email not Valid"
        })
        return
    }

    res.status(200).json({
        data: {
            email
        }
    })
}

export const foregetResetPasswordPost = async (req, res) => {
    //this will reset user Password
    const { newPassword, token } = req.body
    //validating
    if (!token || !newPassword) {
        res.status(400).json({
            error: "Missing Data!"
        })
    }
    const validContent = contentValidation(req.body, {
        token: 'string',
        newPassword: 'string'
    })
    if (validContent !== null) {
        res.status(400).json({
            error: validContent
        })
        return
    }

    const validToken = verifyToken(token, false)
    if (!validToken) {
        res.status(403).json({ error: 'Forbidden - Token Expire or Wrong' })
        return
    }

    const { email } = validToken

    if (!isEmailValid(email)) {
        res.status(400).json({
            error: "Email not Valid"
        })
        return
    }
    //do logic controller

    try {
        const encryptedPass = await Bhash(newPassword)
        const updatedUser = await updateUser({
            email,
            password: encryptedPass,
            name: null
        })

        if (!updatedUser) {
            res.status(404).json({ error: 'User not found' })
            return
        }
        res.status(200).json({
            data: updatedUser.data
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }

}