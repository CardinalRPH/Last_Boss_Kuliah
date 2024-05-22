import { Box } from "@mui/material"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import { uForgetAction } from "../../stores/uForgetState"

const AuthLayout = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(uForgetAction.setForgetResetScss(false))
        dispatch(uForgetAction.setUForgetState(false))
    },[dispatch])
    return (
        <Box sx={{ width: '100%', height: '100vh', display:'flex', justifyContent:'center', alignItems:'center', bgcolor:'darkblue' }}>
            <Box sx={{  height: '90%', width:'80%' }}>
                <Outlet />
            </Box>
        </Box>
    )
}

export default AuthLayout