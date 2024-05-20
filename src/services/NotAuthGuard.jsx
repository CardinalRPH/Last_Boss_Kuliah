import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const NotAuthGuard = ({ children }) => {
    const { isAuthenticated } = useSelector(state => state.auth)

    const navigate = useNavigate()

    useEffect(() => {
        isAuthenticated && navigate('/dashboard', { replace: true })
    }, [isAuthenticated, navigate])

    return !isAuthenticated && children
}

export default NotAuthGuard