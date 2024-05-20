import { getUserbyId } from "../models/firestoreUser.js"
import { encrypt } from "../security/aesManager.js"
import { Bcompare } from "../security/bcryptPassword.js"
import { generateToken } from "../security/jwtManager.js"
import contentValidation from "../security/validations/contentValidation.js"
import isEmailValid from "../security/validations/isEmailValid.js"

export const userAuthPost = async (req, res) => {
    //onLogin from website
    const { userMail, userPass, keepSignIn = false } = req.body
    //validating
    if (!userMail || !userPass) {
        res.status(400).json({
            error: "Missing Data!"
        })
        return
    }
    const validContent = contentValidation(req.body, {
        userMail: 'string',
        userPass: 'string',
        keepSignIn: 'boolean'
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
    //do the controller logic
    const userData = await getUserbyId({ email: userMail })
    if (!userData) {
        res.status(404).json({
            error: 'User not Found'
        })
        return
    }

    const passCompare = await Bcompare(userPass, userData.data.password)
    if (!passCompare) {
        res.status(401).json({
            error: 'Wrong password!'
        })
        return
    }
    const expireHours = keepSignIn ? 24 * 60 * 60 * 1000 * 60 : 24 * 60 * 60 * 1000;
    req.session.userData = { name: userData.data.name, email: userData.data.email, isVerified: userData.data.isVerified, id: userData.id };

    const expirationDate = new Date(Date.now() + expireHours);
    req.session.cookie.expires = expirationDate;
    req.session.cookie.maxAge = expireHours;
    res.status(200).json({
        name: userData.data.name, email: userData.data.email, valid:userData.data.isVerified
    })
}

export const deviceAuthPost = async (req, res) => {
    //onLogin from device
    const { userMail, userPass, deviceId } = req.body
    //validating
    if (!userMail || !userPass || !deviceId) {
        res.status(400).json({
            error: "Missing Data!"
        })
        return
    }
    const validContent = contentValidation(req.body, {
        userMail: 'string',
        userPass: 'string',
        deviceId: 'string'
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

    //do the controller logic
    const userData = await getUserbyId({ email: userMail })
    if (!userData) {
        res.status(401).json({
            error: 'Wrong email or password!'
        })
        return
    }

    const passCompare = await Bcompare(userPass, userData.data.password)
    if (!passCompare) {
        res.status(401).json({
            error: 'Wrong email or password!'
        })
        return
    }

    const encryptedPath = encrypt(userData.data.email)
    const token = generateToken({
        user: userData.data.email,
        deviceId
    }, false, {})

    res.status(200).json({
        path: `/app/${encryptedPath}`,
        token: `authorization:${token}`
    })
}