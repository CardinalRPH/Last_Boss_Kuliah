export default (dataObject, type = {}) => {
    let error = null;

    Object.keys(type).some((key) => {
        if (dataObject.hasOwnProperty(key)) {
            if (typeof dataObject[key] !== type[key]) {
                error = `${key} is not ${type[key]}`;
                return true;
            }
        }
        return false;
    });
    return error;
}