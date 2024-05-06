import { Paper, Typography } from "@mui/material"
import Title from "./Title"
import PropTypes from 'prop-types';


const TotalDevice = ({ totalDevice = 0 }) => {
    return (

        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
                width: { xs: '100%', md: 300 }
            }}
        >
            <Title>Total Device</Title>
            <Typography component="p" variant="h4">
                {`${totalDevice} Device`}
            </Typography>
        </Paper>

    )
}

TotalDevice.propTypes = {
    totalDevice: PropTypes.number
}

export default TotalDevice