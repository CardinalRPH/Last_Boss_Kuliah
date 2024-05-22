import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const UForgetGuard = ({ children }) => {
    const { isFromForget } = useSelector(state => state.uForget)

    const navigate = useNavigate()

    useEffect(() => {
        !isFromForget && navigate('/lost-password', { replace: true })
    }, [isFromForget, navigate])

    return isFromForget && children
}

export default UForgetGuard