import { Grid } from "@mui/material"
import DeviceCard from "../components/DeviceCard"
import AddNewDeviceButton from "../components/AddNewDeviceButton"

const DevicePage = () => {
    return (
        <Grid container spacing={3} justifyContent="center">
            <Grid item >
                <AddNewDeviceButton />
            </Grid>
            <Grid item xs={12} >
                <DeviceCard />
            </Grid>
        </Grid>
    )
}

export default DevicePage