import { addUpdateUserToken, deleteUserToken, getUserToken } from "../models/firestoreToken.js"
import { addNewUser, deleteUser, getUserbyId, updateUser, updateUserVerify } from "../models/firestoreUser.js"
import { encrypt } from "../security/aesManager.js"
import { Bcompare, Bhash } from "../security/bcryptPassword.js"
import generateOTP from "../security/generateOTP.js"
import { generateToken, verifyToken } from "../security/jwtManager.js"
import contentValidation from "../security/validations/contentValidation.js"
import isEmailValid from "../security/validations/isEmailValid.js"
import mailSender from "../utilities/mailSender.js"

export const userAccountPost = async (req, res) => {
    //creaate account
    const { userMail, userPass, userName } = req.body
    //validating
    if (!userMail || !userPass || !userName) {
        res.status(400).json({
            error: "Missing Data!"
        })
        return
    }
    const validContent = contentValidation(req.body, {
        userMail: 'string',
        userPass: 'string',
        userName: 'string'
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
    // do logic controller
    try {
        const encryptedPass = await Bhash(userPass)
        const existsUser = await addNewUser({ email: userMail, name: userName, password: encryptedPass })
        if (!existsUser) {
            res.status(409).json({ error: 'User already exists' })
            return
        }
        //send OTP to email
        const OTPToken = generateOTP()
        await addUpdateUserToken({
            email: userMail,
            token: OTPToken
        })
        const token = generateToken({
            email: userMail,
            token: OTPToken
        }, false, {
            expireMinutes: 10
        })
        mailSender(userMail, 'verify', {
            userName,
            payload: `http://${process.env.FRONT_END_DOMAIN}/verify/${token}`
        })
        const expireHours = 24 * 60 * 60 * 1000;
        req.session.userData = { name: userName, email: userMail, isVerified: false, id: existsUser.id };

        const expirationDate = new Date(Date.now() + expireHours);
        req.session.cookie.expires = expirationDate;
        req.session.cookie.maxAge = expireHours;

        res.status(200).json({
            data: {
                name: userName,
                email: userMail,
                valid: false,

            }
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
}

export const userAccSendVerifPost = async (req, res) => {
    const { userMail } = req.body
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

    try {
        const existsUser = await getUserbyId({ email: userMail })
        if (!existsUser) {
            res.status(404).json({ error: 'User not found' })
            return
        }
        if (existsUser.data.isVerified) {
            res.status(400).json({ error: 'User already verified' })
            return
        }
        const OTPToken = generateOTP()
        await addUpdateUserToken({
            email: userMail,
            token: OTPToken
        })
        const token = generateToken({
            email: userMail,
            token: OTPToken
        }, false, {
            expireMinutes: 10
        })
        mailSender(userMail, 'verify', {
            userName: existsUser.data.name,
            payload: `http://${process.env.FRONT_END_DOMAIN}/verify/${token}`
        })
        res.status(200).json({
            data: {
                name: existsUser.data.name, email: userMail
            }
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
}

export const userAccountGet = async (req, res) => {
    //on login in profile
    const { userMail } = req.query

    //do the logic controller
    try {
        const existsUser = await getUserbyId({ email: userMail })
        if (!existsUser) {
            res.status(404).json({ error: 'User not found' })
            return
        }
        res.status(200).json({
            data: {
                name: existsUser.data.name,
                email: existsUser.data.email,
            }
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }

}

export const userAccountPut = async (req, res) => {
    // only for edit password
    const { userMail, userName, userNewPass = "", userOldPass = "" } = req.body

    //validating
    if (!userName) {
        res.status(400).json({
            error: "Missing Data!"
        })
        return
    }
    const validContent = contentValidation(req.query, {
        userName: 'string',
        userNewPass: 'string',
        userOldPass: 'string'
    })
    if (validContent !== null) {
        res.status(400).json({
            error: validContent
        })
        return
    }

    //do the logic controller
    try {
        const existsUser = await getUserbyId({ email: userMail })
        if (!existsUser) {
            res.status(404).json({ error: 'User not found' })
            return
        }
        let updatedUser
        if (userNewPass === "" && userOldPass === "") {
            //only update username
            updatedUser = await updateUser({ email: userMail, payload: { name: userName } })
        } else {
            //update username, and password
            const isMatched = await Bcompare(userOldPass, existsUser.data.password)
            if (!isMatched) {
                res.status(401).json({ error: "Wrong Password" })
                return
            }
            const hashedPassword = await Bhash(userNewPass)
            updatedUser = await updateUser({ email: userMail, payload: { name: userName, password: hashedPassword } })
        }
        res.status(200).json({ data: updatedUser.data })

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
}

export const userAccountDelete = async (req, res) => {
    // delete account
    const { userMail } = req.body

    //do controller logic
    await deleteUserToken({ email: userMail })
    const deletedUser = await deleteUser({ email: userMail })
    if (!deletedUser) {
        res.status(404).json({ error: 'User not found' })
        return
    }
    req.session.destroy()
    res.status(200).json({
        data: deletedUser.data
    })
}

export const userVerifyGet = async (req, res) => {
    //verify User
    const { token } = req.query
    //validation
    if (!token) {
        res.status(400).json({
            error: "Missing Data!"
        })
        return
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

        await updateUserVerify({ email, verified: true })
        await deleteUserToken({ email })
        if (req.session.userData && req.session.userData.email === email) {
            req.session.userData = { ...req.session.userData, isVerified: true }
        } else {
            req.session.destroy()
        }
        const encryptedPath = encrypt(email)
        const wstoken = generateToken({
            user: email,
            deviceId: null
        }, false, {})

        res.status(200).json({
            data: {
                email,
                valid: true,
                wsPath: `/app/${encryptedPath}/${wstoken}`
            }
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
}

export const userSignOutDelete = async (req, res) => {
    const { userMail } = req.body

    try {
        const existsUser = await getUserbyId({ email: userMail })
        if (!existsUser) {
            res.status(404).json({ error: 'User not found' })
            return
        }

        req.session.destroy()

        res.status(200).json({
            data: {
                status: 'Loged Out'
            }
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
}

export const userCheckVerify = async (req, res) => {
    const { userMail } = req.query
    try {
        const existsUser = await getUserbyId({ email: userMail })
        if (!existsUser) {
            res.status(404).json({ error: 'User not found' })
            return
        }
        if (req.session.userData) {
            req.session.userData = { ...req.session.userData, isVerified: true }
        }

        const encryptedPath = encrypt(existsUser.data.email)
        const token = generateToken({
            user: existsUser.data.email,
            deviceId: null
        }, false, {})

        res.status(200).json({
            data: {
                email: userMail,
                valid: existsUser.data.isVerified,
                wsPath: existsUser.data.isVerified ?`/app/${encryptedPath}/${token}` : null
            }
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
}