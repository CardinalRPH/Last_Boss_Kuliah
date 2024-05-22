const mergeObtoArr = (array, newObj) => {
    const index = array.findIndex(item => item.id === newObj.id);
    if (index !== -1) {
        array[index] = newObj;
    } else {
        array.push(newObj);
    }
    return [...array]; // Return a new array to trigger re-render
};

export default mergeObtoArr