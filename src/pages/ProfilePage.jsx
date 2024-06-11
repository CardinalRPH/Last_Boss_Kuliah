import { Box, Button, CircularProgress, Paper, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import AlertMain from "../components/AlertMain"
import { useDelete, useGet, usePut } from "../hooks/dataHandler"
import DialogAlert from "../components/DialogAlert"
import { useDispatch, useSelector } from "react-redux"
import { authAction } from "../stores/authState"
import PasswordMeter from "../components/PasswordMeter"
import TextFieldPassword from "../components/TextFieldPassword"

const ProfilePage = () => {
    const [readOnly, setReadOnly] = useState(true)
    const [alertState, setAlertState] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const { data: dataPut, error: errorPut, loading: loadingPut, execute: executePut } = usePut('updateAccount')
    const { data: dataGet, error: errorGet, loading: loadingGet, execute: executeGet } = useGet('getAccount', true, false)
    const { data: dataDel, error: errorDel, loading: loadingDel, execute: executeDel } = useDelete('removeAccount')
    const { payload, isAuthenticated } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [textNameDefValue, setTextNameDefValue] = useState({
        userName: "",
        userMail: "",
    })
    const [textFieldVal, setTextFieldVal] = useState({
        userName: textNameDefValue.userName,
        userMail: textNameDefValue.userMail,
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
            setTextNameDefValue({ userMail: dataGet?.data.email, userName: dataGet?.data.name })
        }
        if (dataPut) {
            //do
            dispatch(authAction.updateStateLocal({ name: textFieldVal.userName }))
            setTextNameDefValue({ userMail: textFieldVal.userMail, userName: textFieldVal.userName })
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataDel, dataGet, dataPut])

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
            setTextFieldVal(prevState => ({ ...prevState, userName: textNameDefValue.userName }))
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorDel, errorGet, errorPut])

    useEffect(() => {
        setTextFieldVal(prevState => ({ ...prevState, userMail: textNameDefValue.userMail, userName: textNameDefValue.userName }))
    }, [textNameDefValue.userMail, textNameDefValue.userName])

    useEffect(() => {
        if (isAuthenticated) {
            executeGet({
                params: {
                    userMail: payload?.email
                }
            })
        }
        document.title = `Profile`
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', height: '80vh' }}>
                {loadingGet ?
                    <CircularProgress size={50} /> :
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
                            <TextFieldPassword name="userOldPass" onChange={handleTextChange} value={textFieldVal.userOldPass} label="Old Password" readOnly={readOnly} required={textFieldVal.userNewPass !== ''} containerSx={{ mx: 2, width: { xs: '100%', md: '50%' } }}  />
                            <Box sx={{ mx: 2, width: { xs: '100%', md: '50%' }, position: "relative" }}>
                                <TextFieldPassword name="userNewPass" onChange={handleTextChange} value={textFieldVal.userNewPass} label="New Password" readOnly={readOnly} required={textFieldVal.userOldPass !== ''} containerSx={{width: "100%"}} />
                                <PasswordMeter password={textFieldVal.userNewPass} containerSx={{ position: "absolute", width: "100%" }} />
                            </Box>
                        </Paper>
                        <Box sx={{ my: 1, position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                            {readOnly && !loadingPut ? (
                                <>
                                    <Button sx={{ m: 2 }} type="button" onClick={(e) => { e.preventDefault(); setReadOnly(false) }} variant="outlined">Edit</Button>
                                    <Button sx={{ m: 2, position: { xs: 'relative', lg: 'absolute' }, left: 0, bottom: 0 }} onClick={() => setDialogOpen(true)} color="error" variant="outlined">Delete Account</Button>
                                </>

                            ) : (
                                <>
                                    <Button disabled={loadingPut} sx={{ mx: 2 }} onClick={() => {
                                        setReadOnly(true); setTextFieldVal({
                                            userMail: textNameDefValue.userMail,
                                            userName: textNameDefValue.userName,
                                            userOldPass: "",
                                            userNewPass: ""
                                        })
                                    }} variant="outlined">Cancel</Button>
                                    <Button disabled={loadingPut} sx={{ mx: 2 }} type="submit" variant="outlined">Save</Button>
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
                Are you sure to delete Account
            </DialogAlert>
        </>
    )
}

export default ProfilePage