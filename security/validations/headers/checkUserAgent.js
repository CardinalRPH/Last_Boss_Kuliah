const validateUserAgent = (userAgent) => {
    const regex = /^(?=.*\b(?:Chrome|Firefox|Safari|Edge|Opera)\b)(?=.*\b(?:Windows|Macintosh|Linux)\b).*$/i
    return regex.test(userAgent)
}

const validateEspUserAgent = (userAgent) => {
    return userAgent === "ESP8266HTTPClient"
}

const validatePostmanDevAgent = (userAgent) => {
    return userAgent === "PostmanRuntime/7.39.0"
}

export default (req) => {
    const userAgent = req.headers['user-agent']
    if (validateUserAgent(userAgent)) {
        return true
    } else if (validateEspUserAgent(userAgent)) {
        return true
    } else if (validatePostmanDevAgent(userAgent)) {
        return true
    } else {
        throw { code: 403, message: 'Forbidden Agent' }
    }
}