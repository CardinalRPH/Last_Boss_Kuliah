import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authState'
import cdReducer from './countDownState'
import validReducer from './validState'
import uForgetReducer from './uForgetState'

const store = configureStore({
    reducer: {
        auth: authReducer,
        countD: cdReducer,
        valid: validReducer,
        uForget: uForgetReducer
    }
})

export default store