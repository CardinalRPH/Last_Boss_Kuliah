import { Box, Button, CircularProgress, Divider, Typography } from "@mui/material"
import TextFieldPassword from "../components/TextFieldPassword"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useGet, usePut } from "../hooks/dataHandler"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons"
import AlertMain from "../components/AlertMain"
import { useDispatch } from "react-redux"
import { uForgetAction } from "../stores/uForgetState"

const PassResetPage = () => {
    const { token } = useParams()
    const { data: dataGet, error: errorGet, loading: loadingGet, execute: executeGet } = useGet('resetValidate', true, false)
    const { data: dataPut, error: errorPut, loading: loadingPut, execute: executePut } = usePut('resetAccountPass')
    const [passForm, setPassForm] = useState('')
    const [email, setEmail] = useState('')
    const [alertState, setAlertState] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [alertComponent, setAlertComponent] = useState({
        severity: 'info',
        alertLabel: '',
        content: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        executePut({
            data: {
                token,
                newPassword: passForm
            }
        })
    }

    useEffect(() => {
        if (dataGet) {
            //do
            setEmail(dataGet?.data.email)
        }
        if (dataPut) {
            //do
            dispatch(uForgetAction.setUForgetState(false))
            dispatch(uForgetAction.setForgetResetScss(true))
            navigate('/reset-success')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataGet, dataPut])

    useEffect(() => {
        if (errorGet) {
            //do   
            setAlertComponent({
                severity: 'error',
                alertLabel: 'Error',
                content: errorGet.response?.data.error || errorGet.message
            })
            setAlertState(true)
        }
        if (errorPut) {
            //do
            setAlertComponent({
                severity: 'error',
                alertLabel: 'Error',
                content: errorPut.response?.data.error || errorPut.message
            })
            setAlertState(true)
        }
    }, [errorGet, errorPut])

    useEffect(() => {
        executeGet({
            params: {
                token
            }
        })
        document.title = `Reset Password`
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <Typography variant="h4">Reset Password</Typography>
            <Divider />
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', height: '90%', my: 2, display: 'flex', flexDirection: 'column', justifyContent: loadingGet ? 'center' : errorGet ? 'center' : 'start', alignItems: loadingGet ? 'center' : errorGet ? 'center' : 'start' }}>
                {loadingGet ? <CircularProgress size={50} /> :
                    dataGet ?
                        <>
                            <Typography>Please enter your new password below.</Typography>
                            <Typography>for Email : <b>{email}</b>.</Typography>
                            <Typography> Be sure to use a combination of letters, numbers, and special characters for better security</Typography>
                            <TextFieldPassword disabled={loadingPut} value={passForm} onChange={(e) => setPassForm(e.target.value)} label="New Password" containerSx={{ my: 2, width: '100%' }} required />
                            <Button disabled={loadingPut} type="submit" sx={{ my: 2 }} variant="contained">Change Password</Button>
                        </> :
                        <>
                            <Box sx={{ height: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FontAwesomeIcon icon={faCircleXmark} style={{ width: '50px', height: '50px' }} />
                            </Box>
                            <Box sx={{ height: '60%', textAlign: 'center' }}>
                                <Typography variant="body1">
                                    Link Expire or Wrong
                                </Typography>
                            </Box>
                        </>
                }
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

export default PassResetPage