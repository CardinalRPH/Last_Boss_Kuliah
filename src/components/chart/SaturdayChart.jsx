import { Box, Typography } from "@mui/material"
import { LineChart } from "@mui/x-charts"

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
];

const SaturdayChart = () => {
    return (
        <>
            <Typography variant="h6">Sensor X</Typography>
            <Box sx={{ width: '100%', height: 300 }}>
                <LineChart
                    series={[
                        { data: pData, label: 'pv' },
                        { data: uData, label: 'uv' },
                    ]}
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                />
            </Box>
            <Typography variant="h6">Sensor X</Typography>
            <Box sx={{ width: '100%', height: 300 }}>
                <LineChart
                    series={[
                        { data: pData, label: 'pv' },
                        { data: uData, label: 'uv' },
                    ]}
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                />
            </Box>
            <Typography variant="h6">Sensor X</Typography>
            <Box sx={{ width: '100%', height: 300 }}>
                <LineChart
                    series={[
                        { data: pData, label: 'pv' },
                        { data: uData, label: 'uv' },
                    ]}
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                />
            </Box>
            <Typography variant="h6">Sensor X</Typography>
            <Box sx={{ width: '100%', height: 300 }}>
                <LineChart
                    series={[
                        { data: pData, label: 'pv' },
                        { data: uData, label: 'uv' },
                    ]}
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                />
            </Box>
        </>
    )
}

export default SaturdayChart