import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authState'
import cdReducer from './countDownState'
import validReducer from './validState'

const store = configureStore({
    reducer: {
        auth: authReducer,
        countD: cdReducer,
        valid: validReducer
    }
})

export default store