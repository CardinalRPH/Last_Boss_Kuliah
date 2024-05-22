import { Box, Button, CircularProgress, Grid, TextField, Typography } from "@mui/material"
import DeviceCard from "../components/DeviceCard"
import AddNewDeviceButton from "../components/AddNewDeviceButton"
import { useEffect, useState } from "react"
import ModalMain from "../components/ModalMain"
import formDataExctractor from "../utilities/formDataExtractor"
import AlertMain from "../components/AlertMain"
import DialogAlert from "../components/DialogAlert"
import { useDelete, useGet, usePost, usePut } from "../hooks/dataHandler"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const DevicePage = () => {
    const [modalState, setModalState] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [alertState, setAlertState] = useState(false)
    const [deviceData, setDeviceData] = useState([])
    const [deviceDeleteId, setDeviceDeleteId] = useState('')
    const { payload, isAuthenticated } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const { data: dataGet, error: errorGet, execute: executeGet, loading: loadingGet } = useGet('userDevice', true, false)
    const { data: dataPut, error: errorPut, execute: executePut, loading: loadingPut } = usePut('updateDevice')
    const { data: dataPost, error: errorPost, execute: executePost, loading: loadingPost } = usePost('addDevice')
    const { data: dataDel, error: errorDel, execute: executeDel, loading: loadingDel } = useDelete('deleteDevice')
    const [alertComponent, setAlertComponent] = useState({
        severity: 'info',
        alertLabel: '',
        content: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        setModalState(false)
        const formData = formDataExctractor(e.target)
        executePost({
            data: {
                ...formData,
                userMail: payload?.email
            }
        })
    }

    const handleDeleteIconClick = (deviceId) => {
        setDialogOpen(true)
        setDeviceDeleteId(deviceId)
    }

    const handleDelete = () => {
        executeDel({
            data: {
                userMail: payload?.email,
                deviceId: deviceDeleteId
            }
        })
    }

    const handleUpdateSave = (deviceId, deviceName) => {
        executePut({
            data: {
                userMail: payload?.email,
                deviceId,
                deviceName
            }
        })
    }

    useEffect(() => {
        if (dataGet) {
            //do data
            setDeviceData(dataGet?.data)
        }
    }, [dataGet])

    useEffect(() => {
        if (dataPut) {
            //do
            setAlertComponent({
                severity: 'success',
                alertLabel: 'Success',
                content: 'Success Add New Device'
            })
            setAlertState(true)
        }
        if (dataPost) {
            //do
            executeGet({
                params: {
                    userMail: payload?.email
                }
            })
            setAlertComponent({
                severity: 'success',
                alertLabel: 'Success',
                content: 'Success Update Device'
            })
            setAlertState(true)
        }
        if (dataDel) {
            //do
            setDialogOpen(false)
            executeGet({
                params: {
                    userMail: payload?.email
                }
            })
            setAlertState(true)
            setAlertComponent({
                severity: 'success',
                alertLabel: 'Success',
                content: 'Success Delete Device'
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataDel, dataPost, dataPut])

    useEffect(() => {
        if (errorGet) {
            //do error
            setAlertComponent({
                severity: 'error',
                alertLabel: 'Error',
                content: errorGet.response?.data.error || errorGet.message
            })
            setAlertState(true)
        }
        if (errorPut) {
            //do error
            setAlertComponent({
                severity: 'error',
                alertLabel: 'Error',
                content: errorPut.response?.data.error || errorPut.message
            })
            setAlertState(true)
        }
        if (errorPost) {
            //do error
            setAlertComponent({
                severity: 'error',
                alertLabel: 'Error',
                content: errorPost.response?.data.error || errorPost.message
            })
            setAlertState(true)
        }
        if (errorDel) {
            //do error
            setDialogOpen(false)
            setAlertComponent({
                severity: 'error',
                alertLabel: 'Error',
                content: errorDel.response?.data.error || errorDel.message
            })
            setAlertState(true)
        }
    }, [errorDel, errorGet, errorPost, errorPut])

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
            <Grid container spacing={3} justifyContent="center">
                <Grid item >
                    <AddNewDeviceButton onClick={() => setModalState(true)} />
                </Grid>
                <Grid item xs={12} >
                    {loadingGet ?
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <CircularProgress size={50} />
                        </Box> : deviceData.length > 0 ?
                            deviceData.map(value =>
                                <DeviceCard
                                    onDelete={() => handleDeleteIconClick(value.deviceId)}
                                    onSave={(deviceName) => handleUpdateSave(value.deviceId, deviceName)}
                                    onGoTo={() => navigate(`/devices/${value.deviceId}`)}
                                    key={value.deviceId}
                                    deviceId={value.deviceId}
                                    deviceName={value.name}
                                    updateLoading={loadingPut}
                                />
                            ) :
                            <Typography>
                                No Device Found
                            </Typography>
                    }

                </Grid>
            </Grid>
            <ModalMain
                open={modalState}
                onClose={() => !loadingPost && setModalState(false)}
                modalTitle="Add a New Device"
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: { xs: 200, md: 500 } }} component="form" onSubmit={handleSubmit}>
                    <TextField disabled={loadingPost} name="deviceId" label="Device ID" required />
                    <TextField disabled={loadingPost} name="deviceName" label="Device Name" sx={{ my: 2 }} required />
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                        <Button sx={{ mx: 2 }} disabled={loadingPost} onClick={() => setModalState(false)}>Cancel</Button>
                        <Button sx={{ mx: 2 }} disabled={loadingPost} type="submit">Save</Button>
                    </Box>
                </Box>
            </ModalMain>
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
               Are you sure to delete {deviceDeleteId} item
            </DialogAlert>
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

export default DevicePage