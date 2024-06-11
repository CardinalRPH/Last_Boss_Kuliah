import { Box, CircularProgress, Grid, Typography } from "@mui/material"
import { useOutletContext, useParams } from "react-router-dom"
import DetailPageRainCard from "../components/DeviceDetailCard/DetailPageRainCard"
import DetailPageLastWaterCard from "../components/DeviceDetailCard/DetailPageLastWaterCard"
import DetailPageWaterStorageCard from "../components/DeviceDetailCard/DetailPageWaterStorageCard"
import DetailPageButtonCard from "../components/DeviceDetailCard/DetailPageButtonCard"
import TabPanel from "../components/TabPanel"
import { useGet, usePost } from "../hooks/dataHandler"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import AlertMain from "../components/AlertMain"
import getCurrentTime, { daysOfWeek } from "../utilities/getCurrentTime"
import DetailPageLightCard from "../components/DeviceDetailCard/DetailPageLightCard"
import DetailPageSoilCard from "../components/DeviceDetailCard/DetailPageSoilCard"
import LegendDetail from "../components/LegendDetail"

const DeviceDetailPage = () => {
    const { id } = useParams()
    const { payload, isAuthenticated } = useSelector(state => state.auth)
    const [alertState, setAlertState] = useState(false)
    const [mainData, setMainData] = useState({})
    const { wsMessage } = useOutletContext()
    const { data: dataGet, error: errorGet, loading: loadingGet, execute: executeGet } = useGet('userDevice', true, false)
    const { data: dataPost, error: errorPost, loading: loadingPost, execute: executePost } = usePost('doWatering')
    const { day } = getCurrentTime()
    const [alertComponent, setAlertComponent] = useState({
        severity: 'info',
        alertLabel: '',
        content: ''
    })

    const handleOnWatering = () => {
        executePost({
            data: {
                deviceId: id,
                userMail: payload?.email
            }
        })
    }

    useEffect(() => {
        if (dataGet) {
            //do
            setMainData(dataGet.data)
        }
        if (dataPost) {
            setAlertComponent({
                severity: 'success',
                alertLabel: 'Success',
                content: 'Success Watering'
            })
            setAlertState(true)
        }

    }, [dataGet, dataPost])

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
        if (errorPost) {
            setAlertComponent({
                severity: 'error',
                alertLabel: 'Error',
                content: errorPost.response?.data.error || errorPost.message
            })
            setAlertState(true)
        }
    }, [errorGet, errorPost])

    useEffect(() => {
        if (isAuthenticated) {
            executeGet({
                params: {
                    userMail: payload.email,
                    deviceId: id
                }
            })
        }
        document.title = `Detail Device`
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
                            <DetailPageRainCard value={JSON.parse(wsMessage?.find(fVal => JSON.parse(fVal.data).Id === id)?.data || '{"rainSensor":false}').rainSensor} />
                        </Grid>
                        {/* from DB */}
                        <Grid item xs={12} md={3}>
                            <DetailPageLastWaterCard value={`${day}, ${mainData?.waterVal?.[day]?.data[mainData?.waterVal?.[day]?.data.length - 1] || '00:00'}`} />
                        </Grid>
                        {/* from webSocket */}
                        <Grid item xs={12} md={3}>
                            <DetailPageLightCard value={JSON.parse(wsMessage?.find(fVal => JSON.parse(fVal.data).Id === id)?.data || '{"lightSensor":0}').lightSensor} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <DetailPageSoilCard title="Soil Bot Value" value={JSON.parse(wsMessage?.find(fVal => JSON.parse(fVal.data).Id === id)?.data || '{"soilSensorBot":0}').soilSensorBot} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <DetailPageSoilCard title="Soil Top Value" value={JSON.parse(wsMessage?.find(fVal => JSON.parse(fVal.data).Id === id)?.data || '{"soilSensorTop":0}').soilSensorTop} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <DetailPageWaterStorageCard value={JSON.parse(wsMessage?.find(fVal => JSON.parse(fVal.data).Id === id)?.data || '{"waterSensor":0}').waterSensor} />
                        </Grid>
                        {/* function */}
                        <Grid item xs={12} md={3}>
                            <DetailPageButtonCard disableBtn={loadingPost} onWatering={handleOnWatering} />
                        </Grid>
                        <Grid item xs={12} >
                            <LegendDetail />
                        </Grid>
                        <Grid item xs={12} >
                            <Typography variant="h6">Device Report</Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <TabPanel data={mainData} selTab={daysOfWeek.indexOf(day)-1} />
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