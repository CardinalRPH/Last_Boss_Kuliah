import { Box, Typography } from "@mui/material"
import { LineChart } from "@mui/x-charts"
import PropTypes from 'prop-types';


const timeArray = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']

const PanelChart = ({ dateVal, waterVal = [], sensorVal = [] }) => {

    const combinedTime = [...new Set([...waterVal, ...timeArray])].sort()
    const wateringTF = combinedTime.map(value => waterVal.find(value2 => value2 === value) ? 1 : 0)

    return (
        <>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', my: 1 }}>
                <Typography variant="h6">Date</Typography>
                <Typography variant="h5">{dateVal}</Typography>
            </Box>
            <Box sx={{ my: 1, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', bgcolor: "white", borderRadius: "5px", boxShadow: 1 }}>
                <Typography variant="h6">Watering</Typography>
                <Box sx={{ width: '100%', height: 300 }}>
                    <LineChart
                        series={[
                            { data: wateringTF, label: 'Time' },
                        ]}
                        xAxis={[{ scaleType: 'point', data: combinedTime }]}
                    />
                </Box>
            </Box>
            <Box sx={{ my: 1, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', bgcolor: "white", borderRadius: "5px", boxShadow: 1 }}>
                <Typography variant="h6">Soil Sensor</Typography>
                <Box sx={{ width: '100%', height: 300 }}>
                    <LineChart
                        series={[
                            { data: sensorVal.map(value => value.soilSensorTop), label: 'Soil Top' },
                            { data: sensorVal.map(value => value.soilSensorBot), label: 'Soil Bot' },
                        ]}
                        xAxis={[{ scaleType: 'point', data: sensorVal.map(value => value.time) }]}
                    />
                </Box>
            </Box>
            <Box sx={{ my: 1, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', bgcolor: "white", borderRadius: "5px", boxShadow: 1 }}>
                <Typography variant="h6">Water Storage</Typography>
                <Box sx={{ width: '100%', height: 300 }}>
                    <LineChart
                        series={[
                            { data: sensorVal.map(value => value.waterSensor), label: 'Water Storage (%)' },
                        ]}
                        xAxis={[{ scaleType: 'point', data: sensorVal.map(value => value.time) }]}
                    />
                </Box>
            </Box>
            <Box sx={{ my: 1, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', bgcolor: "white", borderRadius: "5px", boxShadow: 1 }}>
                <Typography variant="h6">Light Sensor</Typography>
                <Box sx={{ width: '100%', height: 300 }}>
                    <LineChart
                        series={[
                            { data: sensorVal.map(value => value.lightSensor), label: 'Light (Ω)' },
                        ]}
                        xAxis={[{ scaleType: 'point', data: sensorVal.map(value => value.time) }]}
                    />
                </Box>
            </Box>
            <Box sx={{ my: 1, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', bgcolor: "white", borderRadius: "5px", boxShadow: 1 }}>
                <Typography variant="h6">Rain Sensor</Typography>
                <Box sx={{ width: '100%', height: 300 }}>
                    <LineChart
                        series={[
                            { data: sensorVal.map(value => value.rainSensor), label: 'Rain' },
                        ]}
                        xAxis={[{ scaleType: 'point', data: sensorVal.map(value => value.time) }]}
                    />
                </Box>
            </Box>
        </>
    )
}

PanelChart.propTypes = {
    dateVal: PropTypes.string,
    waterVal: PropTypes.array,
    sensorVal: PropTypes.array
}

export default PanelChart