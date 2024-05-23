import { Button, Paper } from "@mui/material"
import PropTypes from 'prop-types';

const DetailPageButtonCard = ({ onWatering, disableBtn = false }) => {
    return (
        <Paper
            sx={{
                p: 2,
                minHeight: 150,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Button disabled={disableBtn} onClick={onWatering} variant="outlined">Do Watering</Button>
        </Paper>
    )
}

DetailPageButtonCard.propTypes = {
    onWatering: PropTypes.func.isRequired,
    disableBtn: PropTypes.bool
}
export default DetailPageButtonCard