export default (req) => {
    const acceptHeader = req.headers.accept;
    if (!acceptHeader || acceptHeader.toLowerCase() !== 'application/json') {
        throw { code: 406, message: 'Not Acceptable. Expected Accept: application/json' }
    }
    return true
};