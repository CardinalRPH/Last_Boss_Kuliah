import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <Box sx={{ width: '100%', height: '100vh', display:'flex', justifyContent:'center', alignItems:'center', bgcolor:'darkblue' }}>
            <Box sx={{  height: '90%', width:'80%' }}>
                <Outlet />
            </Box>
        </Box>
    )
}

export default AuthLayout