import { createSlice } from "@reduxjs/toolkit"


const uForgetSlicer = createSlice({
    name: "uForget",
    initialState: {
        isFromForget: false,
        forgetResetScss: false
    },
    reducers: {
        setUForgetState(state, action) {
            state.isFromForget = action.payload
        },
        setForgetResetScss(state, action) {
            state.forgetResetScss = action.payload
        }
    }
})

export const uForgetAction = uForgetSlicer.actions
export default uForgetSlicer.reducer