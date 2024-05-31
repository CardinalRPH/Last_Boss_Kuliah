import { faSeedling } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Paper, Typography } from "@mui/material"
import PropTypes from 'prop-types';

const DetailPageSoilTopCard = ({ value = 0 }) => {
    return (
        <Paper
            sx={{
                p: 2,
                minHeight: 150,
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <Box sx={{ borderRadius: '50%', bgcolor: 'lightgrey', width: 60, height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', m: 1 }}>
                <FontAwesomeIcon icon={faSeedling} size="2xl" style={{ marginTop: 1, marginBottom: 1 }} />
            </Box>
            <Box sx={{ m: 1 }}>
                <Typography variant="h6">{value}</Typography>
                <Typography variant="body1">Soil Top Value</Typography>
            </Box>
        </Paper>
    )
}

DetailPageSoilTopCard.propTypes = {
    value: PropTypes.number.isRequired
}

export default DetailPageSoilTopCard