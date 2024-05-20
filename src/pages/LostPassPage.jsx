import { Box, Button, Divider, TextField, Typography } from "@mui/material"
import { usePost } from "../hooks/dataHandler"
import { useEffect, useState } from "react"
import AlertMain from "../components/AlertMain"

const LostPassPage = () => {
    const { data, error, loading, execute } = usePost('resetSendMail')
    const [emailForm, setEmailForm] = useState('')
    const [alertState, setAlertState] = useState(false)
    const [alertComponent, setAlertComponent] = useState({
        severity: 'info',
        alertLabel: '',
        content: ''
    })

    const handleSubmit = () => {
        execute({
            data: {
                userMail:emailForm
            }
        })
    }
    useEffect(() => {
        if (data) {
           //do data
       }
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
    },[error])
    return (
        <>
            <Typography variant="h4">Forgot Password</Typography>
            <Divider />
            <Box sx={{ width: '100%', height: '90%', my: 2 }}>
                <Typography>Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.</Typography>
                <TextField type="email" label="Email Address" sx={{ my: 2 }} value={emailForm} onChange={(e)=>setEmailForm(e.target.value)} fullWidth required />
                <Button sx={{ my: 2 }} disabled={loading} onClick={handleSubmit} variant="contained">Reset Password</Button>
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