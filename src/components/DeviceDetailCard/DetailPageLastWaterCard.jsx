import { faFaucetDrip } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Paper, Typography } from "@mui/material"
import PropTypes from 'prop-types';

const DetailPageLastWaterCard = ({value}) => {
    return (
        <Paper
            sx={{
                p: 2,
                minHeight: 200,
                position: 'relative'
            }}
        >
            <FontAwesomeIcon icon={faFaucetDrip} size="2xl" style={{ marginTop: 1, marginBottom: 1 }} />
            <Typography variant="h6">{value}</Typography>
            <Typography variant="body1">XXX</Typography>
        </Paper>
    )
}
DetailPageLastWaterCard.propTypes = {
    value: PropTypes.string.isRequired
}

export default DetailPageLastWaterCard