import { addUpdateUserToken, deleteUserToken, getUserToken } from "../models/fireStoreToken.js"
import { addNewUser, deleteUser, getUserbyId, updateUser, updateUserVerify } from "../models/firestoreUser.js"
import { Bhash } from "../security/bcryptPassword.js"
import generateOTP from "../security/generateOTP.js"
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
        mailSender(userMail, 'verify', {
            userName,
            payload: `http://${process.env.FRONT_END_DOMAIN}/${token}`
        })
        const expireHours = 24 * 60 * 60 * 1000;
        req.session.userData = { name: userName, email: userMail, isVerified: false, id: existsUser.id };

        const expirationDate = new Date(Date.now() + expireHours);
        req.session.cookie.expires = expirationDate;
        req.session.cookie.maxAge = expireHours;
        res.status(200).json({
            data: {
                name: userName, email: userMail
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
    const { userMail, userName, userPass = "" } = req.body

    //validating
    if (!userName) {
        res.status(400).json({
            error: "Missing Data!"
        })
        return
    }
    const validContent = contentValidation(req.query, {
        userName: 'string',
        userPass: 'string'
    })
    if (validContent !== null) {
        res.status(400).json({
            error: validContent
        })
        return
    }

    //do the logic controller
    try {
        const updatedUser = await updateUser({ email: userMail, name: userName, password: userPass })
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

export const userVerifyPost = async (req, res) => {
    //verify User
    const { userMail, userOTP } = req.body
    //validating
    if (!userOTP) {
        res.status(400).json({
            error: "Missing Data!"
        })
        return
    }
    const validContent = contentValidation(req.body, {
        userOTP: 'string',
    })
    if (validContent !== null) {
        res.status(400).json({
            error: validContent
        })
        return
    }
    // do logic controller
    try {
        const existsUser = await getUserbyId({ email: userMail })
        if (!existsUser) {
            res.status(404).
                json({
                    error: `The mail ${userMail} does not exist.`
                })
            return
        }
        const existToken = await getUserToken({ email: userMail })
        if (!existToken) {
            res.status(404).
                json({
                    error: `This account is not registered with OTP`
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
        if (tokenDB.toString() !== userOTP) {
            res.status(401).json({
                error: 'Wrong Token'
            })
            return
        }

        //update verified on db and delete  the token  from db
        await updateUserVerify({ email: userMail, verified: true })
        await deleteUserToken({ email: userMail })

        //update session verified
        req.session.userData = { ...req.session.userData, isVerified: true };

        res.status(200).json({
            data: {
                name: existsUser.data.name, email: existsUser.data.email
            }
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
}