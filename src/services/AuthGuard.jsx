import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const AuthGuard = ({ children }) => {
    const { isAuthenticated } = useSelector(state => state.auths)

    const navigate = useNavigate()

    useEffect(() => {
        !isAuthenticated && navigate(' ')
    }, [isAuthenticated, navigate])

    return isAuthenticated && children
}

export default AuthGuard