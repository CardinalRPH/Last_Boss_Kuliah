import { Box, LinearProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import passwordScore from '../utilities/passwordScore';

const PasswordMeter = ({ password, containerSx }) => {

    const score = passwordScore(password)
    const colorScore = ["grey", "red", "tomato", "orange", "teal", "green"]
    const textScore = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"]
    return (
        <Box sx={{ textAlign: "end", ...containerSx }}>
            <LinearProgress variant='determinate' sx={{ '& .MuiLinearProgress-bar': { bgcolor: colorScore[score] }, height: "10px", borderRadius: "3px" }} value={score * 20} />
            <Typography color={colorScore[score]}>{textScore[score]}</Typography>
        </Box>
    )
}

PasswordMeter.propTypes = {
    password: PropTypes.string,
    containerSx:PropTypes.object
}

export default PasswordMeter