import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const NoValidGuard = ({children}) => {
    const { isAuthenticated, isValid } = useSelector(state => state.auth)

    const navigate = useNavigate()

    useEffect(() => {
        !isAuthenticated && navigate('/signin', { replace: true })
        isAuthenticated && isValid && navigate('/dashboard', { replace: true })
    }, [isAuthenticated, isValid, navigate])

    return isAuthenticated && !isValid && children
}

export default NoValidGuard