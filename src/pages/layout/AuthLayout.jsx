import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Outlet, useLocation } from "react-router-dom"
import { uForgetAction } from "../../stores/uForgetState"
import img1 from "../../assets/img2.webp"
import img2 from "../../assets/img3.webp"

const AuthLayout = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const [bgImg, setBgImg] = useState(img1)
    const { pathname } = location

    useEffect(() => {
        pathname === "/signin" ? setBgImg(img1) : setBgImg(img2)
    }, [pathname])

    useEffect(() => {
        dispatch(uForgetAction.setForgetResetScss(false))
        dispatch(uForgetAction.setUForgetState(false))
    }, [dispatch])
    return (
        <Box sx={{ width: '100%', height: '100vh', backgroundImage: `url(${bgImg})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize:"cover" }}>
            <Box sx={{ position: "absolute", width: "100%", height: "100%", backdropFilter: "blur(3px) brightness(60%)" }} />
            <Box sx={{ width: '100%', height: '100%', display: 'flex', position: "relative", justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ height: '90%', width: '80%' }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}

export default AuthLayout