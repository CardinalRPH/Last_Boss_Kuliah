import { Box, Button, Divider, TextField, Typography } from "@mui/material"
import { usePost } from "../hooks/dataHandler"
import { useEffect, useState } from "react"
import AlertMain from "../components/AlertMain"
import { useDispatch } from "react-redux"
import { uForgetAction } from "../stores/uForgetState"
import { useNavigate, useOutletContext } from "react-router-dom"

const LostPassPage = () => {
    const { data, error, loading, execute } = usePost('resetSendMail')
    const [emailForm, setEmailForm] = useState('')
    const [alertState, setAlertState] = useState(false)
    const { setResetEmail } = useOutletContext()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [alertComponent, setAlertComponent] = useState({
        severity: 'info',
        alertLabel: '',
        content: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        execute({
            data: {
                userMail: emailForm
            }
        })
    }
    useEffect(() => {
        if (data) {
            dispatch(uForgetAction.setUForgetState(true))
            navigate('/check-reset-mail')
            setResetEmail(emailForm)
            //do data
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    useEffect(() => {
        if (error) {
            //do error
            setAlertComponent({
                severity: 'error',
                alertLabel: 'Error',
                content: error.response?.data.error || error.message
            })
            setAlertState(true)
        }
    }, [error])
    return (
        <>
            <Typography variant="h4">Forgot Password</Typography>
            <Divider />
            <Box sx={{ width: '100%', height: '90%', my: 2 }} component="form" onSubmit={handleSubmit}>
                <Typography>Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.</Typography>
                <TextField type="email" disabled={loading} label="Email Address" sx={{ my: 2 }} value={emailForm} onChange={(e) => setEmailForm(e.target.value)} fullWidth required />
                <Button sx={{ my: 2 }} disabled={loading} type="submit" variant="contained">Reset Password</Button>
            </Box>
            <AlertMain
                open={alertState}
                onClose={() => setAlertState(false)}
                alertLabel={alertComponent.alertLabel}
                severity={alertComponent.severity}
                content={alertComponent.content}
            />
        </>
    )
}

export default LostPassPage