import { createSlice } from "@reduxjs/toolkit"


const validSlicer = createSlice({
    name: "valid",
    initialState: {
        isSignUp: false
    },
    reducers: {
        setSignUpState(state, action) {
            state.isSignUp = action.payload
        }
    }
})

export const validAction = validSlicer.actions
export default validSlicer.reducer