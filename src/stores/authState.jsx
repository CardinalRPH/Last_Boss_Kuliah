import { createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie"

const getAuthLocalStorage = () => {
    const getLocalStorage = localStorage.getItem("authentication")
    if (getLocalStorage === null) {
        return {
            isAuthenticated: false,
            payload: "",
        }
    } else {
        const { isAuthenticated, payload } = JSON.parse(getLocalStorage)
        return {
            isAuthenticated,
            payload,
        }
    }
}

const saveAuthLocalStorage = (isAuthenticated, payload) => {
    const authentication = { isAuthenticated, payload }
    localStorage.setItem("authentication", JSON.stringify(authentication))
}

const removeAuthLocalStorage = () => {
    localStorage.removeItem("authentication")
}


const initialState = () => {
    const { isAuthenticated, payload } = getAuthLocalStorage()
    const signInTokenCookie = Cookies.get("connect.sid")
    const isValid = payload?.valid
    if (isAuthenticated && signInTokenCookie) {
        return { isAuthenticated, payload, isValid }
    }
    return { isAuthenticated: false, payload: "", isValid: false }
}

const authSlicer = createSlice({
    name: "auth",
    initialState: initialState(),
    reducers: {
        login(state, action) {
            state.payload = action.payload
            const isValid = action.payload?.valid
            state.isAuthenticated = true
            state.isValid = isValid
            saveAuthLocalStorage(state.isAuthenticated, state.payload)
        },
        updateState(state, action) {
            state.payload = { ...state.payload, ...action.payload }
            const isValid = action.payload?.valid
            state.isAuthenticated = true
            state.isValid = isValid
            saveAuthLocalStorage(state.isAuthenticated, state.payload)
        },
        updateStateLocal(state, action) {
            saveAuthLocalStorage(state.isAuthenticated, {...state.payload, ...action.payload})
        },
        logout(state) {
            state.isAuthenticated = false
            state.payload = ""
            removeAuthLocalStorage()
            Cookies.remove("connect.sid")

        }
    }
})

export const authAction = authSlicer.actions
export default authSlicer.reducer