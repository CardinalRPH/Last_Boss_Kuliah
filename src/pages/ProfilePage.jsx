import { Box, Button, CircularProgress, Paper, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import AlertMain from "../components/AlertMain"
import { useDelete, useGet, usePut } from "../hooks/dataHandler"
import DialogAlert from "../components/DialogAlert"
import { useSelector } from "react-redux"

const ProfilePage = () => {
    const [readOnly, setReadOnly] = useState(true)
    const [alertState, setAlertState] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const { data: dataPut, error: errorPut, loading: loadingPut, execute: executePut } = usePut('removeAccount')
    const { data: dataGet, error: errorGet, loading: loadingGet, execute: executeGet } = useGet('getAccount', true, false)
    const { data: dataDel, error: errorDel, loading: loadingDel, execute: executeDel } = useDelete('removeAccount')
    const { payload, isAuthenticated } = useSelector(state => state.auth)
    const [textNameDefValue, setTextNameDefValue] = useState('')
    const [textFieldVal, setTextFieldVal] = useState({
        userName: "",
        userMail: "",
        userOldPass: "",
        userNewPass: ""
    })
    const [alertComponent, setAlertComponent] = useState({
        severity: 'info',
        alertLabel: '',
        content: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isAuthenticated) {
            executePut({
                data: textFieldVal
            })
        }
        setReadOnly(true)
    }

    const handleTextChange = (e) => {
        setTextFieldVal(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleDelete = () => {
        if (isAuthenticated) {
            executeDel({
                data: {
                    userMail: payload?.email
                }
            })
        }
    }

    useEffect(() => {
        if (dataGet) {
            //do
            setTextFieldVal(prevState => ({ ...prevState, userMail: dataGet?.data.email, userName: dataGet?.data.name }))
        }
        if (dataPut) {
            //do
            setTextNameDefValue(textFieldVal.userName)
            setTextFieldVal(prevState => (
                {
                    ...prevState,
                    userOldPass: "",
                    userNewPass: ""
                }
            ))
            setAlertComponent({
                severity: 'success',
                alertLabel: 'Success',
                content: 'Success Update Profile'
            })
            setAlertState(true)
        }
        if (dataDel) {
            //do
            setAlertComponent({
                severity: 'success',
                alertLabel: 'Success',
                content: 'Success Delete Account'
            })
            setAlertState(true)
        }
    }, [dataDel, dataGet, dataPut, textFieldVal.userName])

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
        if (errorDel) {
            //do
            setAlertComponent({
                severity: 'error',
                alertLabel: 'Error',
                content: errorDel.response?.data.error || errorDel.message
            })
            setAlertState(true)
        }
    }, [errorDel, errorGet, errorPut])

    useEffect(() => {
        if (isAuthenticated) {
            executeGet({
                params: {
                    userMail: payload?.email
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', height: '80vh' }}>
                {loadingGet ?
                    <CircularProgress size={60} /> :
                    <>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 250,
                                my: 1,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <TextField name="userMail" onChange={handleTextChange} value={textFieldVal.userMail} label="Email" sx={{ width: { xs: '90%', md: '70%' }, mx: 2, my: 2 }} disabled required />
                            <TextField name="userName" onChange={handleTextChange} value={textFieldVal.userName} label="Name" sx={{ width: { xs: '90%', md: '70%' }, mx: 2, my: 2 }} required inputProps={{ readOnly }} />
                        </Paper>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                height: 200,
                                my: 1,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexWrap: { xs: 'wrap', md: 'nowrap' }
                            }}
                        >
                            <TextField name="userOldPass" onChange={handleTextChange} value={textFieldVal.userOldPass} sx={{ mx: 2, width: { xs: '100%', md: '50%' } }} label="Old Password" inputProps={{ readOnly }} required={textFieldVal.userNewPass !== ''} />
                            <TextField name="userNewPass" onChange={handleTextChange} value={textFieldVal.userNewPass} sx={{ mx: 2, width: { xs: '100%', md: '50%' } }} label="New Password" inputProps={{ readOnly }} required={textFieldVal.userOldPass !== ''} />
                        </Paper>
                        <Box sx={{ my: 1 }}>
                            {readOnly && !loadingPut ? (
                                <Button sx={{ mx: 2 }} onClick={() => { setReadOnly(false) }} variant="outlined">Edit</Button>

                            ) : (
                                <>
                                    <Button disabled={loadingPut} sx={{ mx: 2 }} onClick={() => {
                                        setReadOnly(true); setTextFieldVal({
                                            userName: textNameDefValue,
                                            userOldPass: "",
                                            userNewPass: ""
                                        })
                                    }} variant="outlined">Cancel</Button>
                                    <Button disabled={loadingPut} sx={{ mx: 2 }} type="onsubmit" variant="outlined">Save</Button>
                                </>
                            )}

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
            <DialogAlert
                open={dialogOpen}
                onClose={() => !loadingDel && setDialogOpen(false)}
                handleCancle={() => setDialogOpen(false)}
                dialogTitle="Delete"
                handleAccept={handleDelete}
                disableAccBtn={loadingDel}
                disableCancelBtn={loadingDel}
                customAccBtn={loadingDel ? <CircularProgress size={25} /> : 'Ok'}
            >
                <Typography>Are you sure to delete Account</Typography>
            </DialogAlert>
        </>
    )
}

export default ProfilePage