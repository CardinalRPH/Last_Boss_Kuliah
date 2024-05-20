import { createSlice } from "@reduxjs/toolkit"

const getCdLocalStorage = () => {
    const getLocalStorage = localStorage.getItem("_cdTime")
    if (getLocalStorage === null) {
        return {
            seconds: 0,
            minutes: 0
        }
    } else {
        const { seconds, minutes } = JSON.parse(getLocalStorage)
        return {
            seconds,
            minutes
        }
    }
}

const saveCdLocalStorage = (seconds, minutes) => {
    const countdown = { seconds, minutes }
    localStorage.setItem("_cdTime", JSON.stringify(countdown))
}

const removeCdLocalStorage = () => {
    localStorage.removeItem("_cdTime")
}


const initialState = () => {
    const { seconds, minutes } = getCdLocalStorage()
   return {seconds, minutes}
}

const cdSlicer = createSlice({
    name: "countD",
    initialState: initialState(),
    reducers: {
        setCd(state, action) {
            state.minutes = action.payload.minutes
            state.seconds = action.payload.seconds
            saveCdLocalStorage(state.seconds, state.minutes)
        },
        removeCd(state) {
            state.minutes = 0
            state.seconds = 0
            removeCdLocalStorage()
        }
    }
})

export const cdAction = cdSlicer.actions
export default cdSlicer.reducer