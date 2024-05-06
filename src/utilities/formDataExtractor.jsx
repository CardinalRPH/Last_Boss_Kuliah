const formDataExctractor = (target) => {
    const formData = new FormData(target)
    let data = {}
    formData.forEach((value, key) => {
        data[key] = value
    })
    return data
}

export default formDataExctractor