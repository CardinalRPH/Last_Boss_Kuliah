import { Typography } from "@mui/material"
import PropTypes from 'prop-types';

const Title = ({ children }) => {
    return (
        <Typography variant="h6" component="h2" color="primary" gutterBottom>
            {children}
        </Typography>
    )
}

Title.propTypes = {
    children: PropTypes.node
}

export default Title