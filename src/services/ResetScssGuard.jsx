import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const ResetScssGuard = ({ children }) => {
    const { forgetResetScss } = useSelector(state => state.uForget)

    const navigate = useNavigate()

    useEffect(() => {
        !forgetResetScss && navigate('/signin', { replace: true })
    }, [forgetResetScss, navigate])

    return forgetResetScss && children
}

export default ResetScssGuard