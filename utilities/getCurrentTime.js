export default () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const now = new Date()
    const dayOfWeek = daysOfWeek[now.getDay()]

    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = now.getFullYear()
    const date = `${day}/${month}/${year}`

    const hour = String(now.getHours()).padStart(2, '0')
    const minute = String(now.getMinutes()).padStart(2, '0')
    const time = `${hour}:${minute}`

    return {
        day: dayOfWeek,
        date: date,
        time: time
    };
}