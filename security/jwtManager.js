import jwt from "jsonwebtoken";

export const generateToken = (payload, bearer = true, { expireHours = 0, expireMinutes = 0 }) => {
    let options = {}
    const expireInSeconds = (expireHours * 3600) + (expireMinutes * 60);
    if (expireInSeconds > 0) {
        options.expiresIn = expireInSeconds
    }
    return `${bearer ? 'Bearer ' : ''}${jwt.sign(payload, process.env.SECRET_KEY, options)}`;
}

export const verifyToken = (token, bearer = true) => {
    try {
        let tokenWithoutBearer = token
        if (bearer) {
            tokenWithoutBearer = token.replace('Bearer ', '');
        }
        const _verif = jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY);
        return _verif
    } catch (error) {
        return false
    }
}