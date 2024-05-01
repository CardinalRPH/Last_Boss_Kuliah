import contentValidation from "../contentValidation.js";
import isEmailValid from "../isEmailValid.js";

export default (req, noVerif = false) => {
    const sessionData = req.session.userData;

    if (!sessionData) {
        throw { message: 'Unauthorized - User not logged in', code: 401 }
    }

    if (!noVerif) {
        const userMail = req.body.userMail || req.query.userMail
        if (!userMail) {
            throw { message: "Missing Data!", code: 400 }
        }
        const validContent = contentValidation(req.body, {
            userMail: 'string',
        })
        if (validContent !== null) {
            throw { message: validContent, code: 400 }
        }
        if (!isEmailValid(userMail)) {
            throw { message: 'Email not Valid', code: 400 }
        }
        const { isVerified, email } = sessionData
        if (email !== userMail) {
            throw { message: 'Forbidden - User dont have access', code: 403 }
        }
        if (!isVerified) {
            throw { message: 'Forbidden - User not verified', code: 403 }
        }
    }

};