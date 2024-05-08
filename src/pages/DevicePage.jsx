import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import DeviceCard from "../components/DeviceCard"
import AddNewDeviceButton from "../components/AddNewDeviceButton"
import { useState } from "react"
import ModalMain from "../components/ModalMain"
import formDataExctractor from "../utilities/formDataExtractor"
import AlertMain from "../components/AlertMain"
import DialogAlert from "../components/DialogAlert"

const DevicePage = () => {
    const [modalState, setModalState] = useState(false)
    const [alertState, setAlertState] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [alertComponent, setAlertComponent] = useState({
        severity: 'info',
        alertLabel: '',
        content: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        setModalState(false)
        const formData = formDataExctractor(e.target)
        console.log(formData);
        setAlertState(true)
        setAlertComponent({
            severity: 'success',
            alertLabel: 'Success',
            content: 'Success add new Device'
        })
    }

    const handleDelete = () => {
        
    }
    return (
        <>
            <Grid container spacing={3} justifyContent="center">
                <Grid item >
                    <AddNewDeviceButton onClick={() => setModalState(true)} />
                </Grid>
                <Grid item xs={12} >
                    <DeviceCard
                        onDelete={()=> setDialogOpen(true)}
                    />
                </Grid>
            </Grid>
            <ModalMain
                open={modalState}
                onClose={() => setModalState(false)}
                modalTitle="Add a New Device"
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: { xs: 200, md: 500 } }} component="form" onSubmit={handleSubmit}>
                    <TextField name="deviceID" label="Device ID" required />
                    <TextField name="deviceName" label="Device Name" sx={{ my: 2 }} required />
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                        <Button sx={{ mx: 2 }} onClick={() => setModalState(false)}>Cancel</Button>
                        <Button sx={{ mx: 2 }} type="submit">Save</Button>
                    </Box>
                </Box>
            </ModalMain>
            <AlertMain
                open={alertState}
                onClose={() => setAlertState(false)}
                alertLabel={alertComponent.alertLabel}
                severity={alertComponent.severity}
                content={alertComponent.content}
            />
            <DialogAlert open={dialogOpen} onClose={() => setDialogOpen(false)} handleCancle={() => setDialogOpen(false)} dialogTitle="Delete" handleAccept={handleDelete}>
                <Typography>Are you sure to delete NAME item</Typography>
            </DialogAlert>
        </>
    )
}

export default DevicePage