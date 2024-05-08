import { Button, Paper } from "@mui/material"
import PropTypes from 'prop-types';

const DetailPageButtonCard = ({ onWatering }) => {
    return (
        <Paper
            sx={{
                p: 2,
                minHeight: 200,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent:'center',
                alignItems:'center'
            }}
        >
            <Button onClick={onWatering} variant="outlined">Do Watering</Button>
        </Paper>
    )
}

DetailPageButtonCard.propTypes = {
    onWatering: PropTypes.func.isRequired
}
export default DetailPageButtonCard