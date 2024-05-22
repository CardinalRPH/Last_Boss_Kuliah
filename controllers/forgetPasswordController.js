import { addUpdateUserToken, deleteUserToken, getUserToken } from "../models/fireStoreToken.js"
import { getUserbyId, updateUser } from "../models/firestoreUser.js"
import { Bhash } from "../security/bcryptPassword.js"
import generateOTP from "../security/generateOTP.js"
import { generateToken, verifyToken } from "../security/jwtManager.js"
import contentValidation from "../security/validations/contentValidation.js"
import isEmailValid from "../security/validations/isEmailValid.js"
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
        const codeToken = generateOTP()
        const token = generateToken({
            email: existUser.data.email,
            token: codeToken
        }, false, {
            expireMinutes: 10
        })

        await addUpdateUserToken({ email: userMail, token: codeToken, expireMinutes: 10 })

        mailSender(userMail, 'resetPass', {
            userName: existUser.data.name,
            payload: `http://${process.env.FRONT_END_DOMAIN}/reset-password/${token}`
        })
        req.session.destroy()
        res.status(200).json({
            data: 'Recovery password link sent to your email!'
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
}

export const forgetValidateTokenGet = async (req, res) => {
    //this will validate token from email
    const { token } = req.query
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
    const { email, token: userToken } = validToken
    if (!isEmailValid(email)) {
        res.status(400).json({
            error: "Email not Valid"
        })
        return
    }

    try {
        const existToken = await getUserToken({ email })

        if (!existToken) {
            res.status(404).json({
                error: 'Data not found'
            })
            return
        }

        const { token: tokenDB, expire } = existToken.data

        const nowTime = new Date()
        if (nowTime > expire) {
            res.status(410).json({
                error: 'Expired Token'
            })
            return
        }
        if (tokenDB.toString() !== userToken) {
            res.status(401).json({
                error: 'Wrong Token'
            })
            return
        }

        res.status(200).json({
            data: {
                email
            }
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
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

    const { email, token: userToken } = validToken

    if (!isEmailValid(email)) {
        res.status(400).json({
            error: "Email not Valid"
        })
        return
    }

    //do logic controller

    try {
        const existToken = await getUserToken({ email })
        if (!existToken) {
            res.status(404).json({
                error: 'Data not found'
            })
            return
        }
        const { token: tokenDB, expire } = existToken.data

        const nowTime = new Date()
        if (nowTime > expire) {
            res.status(410).json({
                error: 'Expired Token'
            })
            return
        }
        if (tokenDB.toString() !== userToken) {
            res.status(401).json({
                error: 'Wrong Token'
            })
            return
        }

        if (!isEmailValid(email)) {
            res.status(400).json({
                error: "Email not Valid"
            })
            return
        }

        const encryptedPass = await Bhash(newPassword)
        await deleteUserToken({ email })
        const updatedUser = await updateUser({
            email,
            payload: {
                password: encryptedPass
            }
        })

        if (!updatedUser) {
            res.status(404).json({ error: 'User not found' })
            return
        }

        req.session.destroy()
        res.status(200).json({
            data: updatedUser.data
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }

}