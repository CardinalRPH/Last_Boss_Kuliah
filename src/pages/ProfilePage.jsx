import { Box, Button, Paper, TextField } from "@mui/material"
import { useState } from "react"
import AlertMain from "../components/AlertMain"

const ProfilePage = () => {
    const defaultValueText = "XXX"
    const [readOnly, setReadOnly] = useState(true)
    const [alertState, setAlertState] = useState(false)
    const [alertComponent, setAlertComponent] = useState({
        severity: 'info',
        alertLabel: '',
        content: ''
    })
    const [textNameDefValue, setTextNameDefValue] = useState(defaultValueText)
    const [textFieldVal, setTextFieldVal] = useState({
        userName: defaultValueText,
        userOldPass: "",
        userNewPass: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        setTextNameDefValue(textFieldVal.userName)
        setTextFieldVal(prevState => (
            {
                ...prevState,
                userOldPass: "",
                userNewPass: ""
            }
        ))
        setReadOnly(true)
        setAlertState(true)
        setAlertComponent({
            severity: 'success',
            alertLabel: 'Success',
            content:'Success Update User'
        })
    }

    const handleTextChange = (e) => {
        setTextFieldVal(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }



    return (
        <>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', height: '80vh' }}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 200,
                        my: 1,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <TextField name="userName" onChange={handleTextChange} value={textFieldVal.userName} label="Name" sx={{ width: { xs: '90%', md: '70%', mx: 2 } }} required inputProps={{ readOnly }} />
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
                    <TextField name="userOldPass" onChange={handleTextChange} value={textFieldVal.userOldPass} sx={{ mx: 2, width: { xs: '100%', md: '50%' } }} label="Old Password" inputProps={{ readOnly }} />
                    <TextField name="userNewPass" onChange={handleTextChange} value={textFieldVal.userNewPass} sx={{ mx: 2, width: { xs: '100%', md: '50%' } }} label="New Password" inputProps={{ readOnly }} />
                </Paper>
                <Box sx={{ my: 1 }}>
                    {readOnly ? (
                        <Button sx={{ mx: 2 }} onClick={() => { setReadOnly(false) }} variant="outlined">Edit</Button>

                    ) : (
                        <>
                            <Button sx={{ mx: 2 }} onClick={() => {
                                setReadOnly(true); setTextFieldVal({
                                    userName: textNameDefValue,
                                    userOldPass: "",
                                    userNewPass: ""
                                })
                            }} variant="outlined">Cancel</Button>
                            <Button sx={{ mx: 2 }} type="onsubmit" variant="outlined">Save</Button>
                        </>
                    )}

                </Box>
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

export default ProfilePage