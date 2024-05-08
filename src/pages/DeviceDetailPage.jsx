import { Grid, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import DetailPageRainCard from "../components/DeviceDetailCard/DetailPageRainCard"
import DetailPageLastWaterCard from "../components/DeviceDetailCard/DetailPageLastWaterCard"
import DetailPageWaterStorageCard from "../components/DeviceDetailCard/DetailPageWaterStorageCard"
import DetailPageButtonCard from "../components/DeviceDetailCard/DetailPageButtonCard"
import TabPanel from "../components/TabPanel"

const DeviceDetailPage = () => {
    const { id } = useParams()
    console.log(id)

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <Typography variant="h6">Device Name</Typography>
                    <Typography variant="body1">Device ID</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                    <DetailPageRainCard />
                </Grid>
                <Grid item xs={6} md={3}>
                    <DetailPageLastWaterCard />
                </Grid>
                <Grid item xs={6} md={3}>
                    <DetailPageWaterStorageCard />
                </Grid>
                <Grid item xs={6} md={3}>
                    <DetailPageButtonCard/>
                </Grid>
                <Grid item xs={12} >
                    <Typography variant="h6">Device Report</Typography>
                </Grid>
                <Grid item xs={12} >
                    <TabPanel/>
                </Grid>
            </Grid>
        </>
    )
}

export default DeviceDetailPage