import checkAcceptHeader from "../security/validations/headers/checkAcceptHeader.js"
import checkContentType from "../security/validations/headers/checkContentType.js"
import checkUserAgent from "../security/validations/headers/checkUserAgent.js"
import verifyCookie from "../security/validations/headers/verifyCookie.js"

export default (req, res, next, noVerif=false) => {
    try {
        if (req.method !== "GET") {
            checkContentType(req)
        }
        checkAcceptHeader(req)
        checkUserAgent(req)
        verifyCookie(req, noVerif)
        next()
    } catch (error) {
        const { code, message } = error
        res.status(code).json({ error: message });

    }
}
