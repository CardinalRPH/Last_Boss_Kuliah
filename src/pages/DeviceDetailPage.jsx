import { Box, CircularProgress, Grid, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import DetailPageRainCard from "../components/DeviceDetailCard/DetailPageRainCard"
import DetailPageLastWaterCard from "../components/DeviceDetailCard/DetailPageLastWaterCard"
import DetailPageWaterStorageCard from "../components/DeviceDetailCard/DetailPageWaterStorageCard"
import DetailPageButtonCard from "../components/DeviceDetailCard/DetailPageButtonCard"
import TabPanel from "../components/TabPanel"
import { useGet } from "../hooks/dataHandler"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import AlertMain from "../components/AlertMain"
import getCurrentTime from "../utilities/getCurrentTime"

const DeviceDetailPage = () => {
    const { id } = useParams()
    const { payload, isAuthenticated } = useSelector(state => state.auth)
    const [alertState, setAlertState] = useState(false)
    const [mainData, setMainData] = useState({})
    const { data: dataGet, error: errorGet, loading: loadingGet, execute: executeGet } = useGet('userDevice', true, false)
    const { day } = getCurrentTime()
    const [alertComponent, setAlertComponent] = useState({
        severity: 'info',
        alertLabel: '',
        content: ''
    })

    const handleOnWatering = () => {

    }

    useEffect(() => {
        if (dataGet) {
            //do
            setMainData(dataGet.data)
        }

    }, [dataGet])

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
    }, [errorGet])

    useEffect(() => {
        if (isAuthenticated) {
            executeGet({
                params: {
                    userMail: payload.email,
                    deviceId: id
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loadingGet ?
                <CircularProgress size={50} /> : errorGet ?
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h4">No Device Found</Typography>
                    </Box> :
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} >
                            <Typography variant="h6">{mainData?.name || 'Device Name'}</Typography>
                            <Typography variant="body1">{mainData?.id || 'Device ID'}</Typography>

                        </Grid>
                        {/* from webSocket */}
                        <Grid item xs={12} md={3}>
                            <DetailPageRainCard value={false} />
                        </Grid>
                        {/* from DB */}
                        <Grid item xs={12} md={3}>
                            <DetailPageLastWaterCard value={`${day}, ${mainData?.waterVal[day]?.data.reverse()[0] || '00:00'}`} />
                        </Grid>
                        {/* from webSocket */}
                        <Grid item xs={12} md={3}>
                            <DetailPageWaterStorageCard value={50} />
                        </Grid>
                        {/* function */}
                        <Grid item xs={12} md={3}>
                            <DetailPageButtonCard onWatering={handleOnWatering} />
                        </Grid>
                        <Grid item xs={12} >
                            <Typography variant="h6">Device Report</Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <TabPanel data={mainData} />
                        </Grid>
                    </Grid>
            }
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

export default DeviceDetailPage