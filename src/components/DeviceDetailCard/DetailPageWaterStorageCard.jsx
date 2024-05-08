import { faBucket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Paper, Typography } from "@mui/material"
import PropTypes from 'prop-types';

const DetailPageWaterStorageCard = ({ value }) => {
    return (
        <Paper
            sx={{
                p: 2,
                minHeight: 200,
                position: 'relative'
            }}
        >
            <FontAwesomeIcon icon={faBucket} size="2xl" style={{ marginTop: 1, marginBottom: 1 }} />
            <Typography variant="h6">{value}</Typography>
            <Typography variant="body1">XXX</Typography>
        </Paper>
    )
}

DetailPageWaterStorageCard.propTypes = {
    value: PropTypes.string.isRequired
}

export default DetailPageWaterStorageCard