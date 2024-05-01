export default (req) => {
    const contentType = req.headers['content-type'];
    if (!contentType || contentType.toLowerCase() !== 'application/json') {
        throw { code: 415, message: 'Unsupported Media Type. Expected Content-Type: application/json' }
    }
    return true
};