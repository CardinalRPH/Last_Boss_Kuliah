import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material"
import PropTypes from 'prop-types';
import Title from "./Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faBucket, faCloudRain, faFaucetDrip } from "@fortawesome/free-solid-svg-icons";

const DashShortcutCard = ({ deviceName = 'zero', onWatering, isRain = false, lastWaterDay, lastWaterHour, onIconClick, waterStorage = 0 }) => {
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 200,
                my: 2,
                position: 'relative'
            }}
        >
            <Title>{`Device ${deviceName}`}</Title>
            <Box sx={{ position: 'absolute', top: 5, right: 10 }}>
                <IconButton onClick={onIconClick}>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </IconButton>
            </Box>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                    <FontAwesomeIcon icon={faCloudRain} size="2xl" style={{ marginTop: 1, marginBottom: 1 }} />
                    <Typography variant="body1" sx={{ my: 1 }}>Is Rain</Typography>
                    <Typography variant="h6" sx={{ my: 1 }}>{isRain ? 'Yes' : 'No'}</Typography>
                </Grid>
                <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', textAlign: 'center' }}>
                    <FontAwesomeIcon icon={faFaucetDrip} size="2xl" style={{ marginTop: 1, marginBottom: 1 }} />
                    <Typography variant="body1" sx={{ my: 1 }}>Today Last Watering</Typography>
                    <Typography variant="h6" sx={{ my: 1 }}>{lastWaterDay}, {lastWaterHour}</Typography>
                </Grid>
                <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', textAlign: 'center' }}>
                    <FontAwesomeIcon icon={faBucket} size="2xl" style={{ marginTop: 1, marginBottom: 1 }} />
                    <Typography variant="body1" sx={{ my: 1 }}>Water Storage</Typography>
                    <Typography variant="h6" sx={{ my: 1 }}>{waterStorage}%</Typography>
                </Grid>
                <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Button onClick={onWatering} variant="outlined">Do Watering</Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

DashShortcutCard.propTypes = {
    deviceName: PropTypes.string,
    isRain: PropTypes.bool,
    lastWaterDay: PropTypes.string,
    lastWaterHour: PropTypes.string,
    onWatering: PropTypes.func,
    onIconClick: PropTypes.func,
    waterStorage: PropTypes.number
}

export default DashShortcutCard