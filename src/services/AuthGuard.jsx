import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const AuthGuard = ({ children }) => {
    const { isAuthenticated, isValid } = useSelector(state => state.auth)

    const navigate = useNavigate()

    useEffect(() => {
        !isAuthenticated ? navigate('/signin', { replace: true }) : !isValid && navigate('/access-verify', { replace: true })
    }, [isAuthenticated, isValid, navigate])

    return isAuthenticated && isValid && children
}

export default AuthGuard