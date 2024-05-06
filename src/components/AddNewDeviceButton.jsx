import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Paper, Typography } from "@mui/material"
import PropTypes from 'prop-types';

const AddNewDeviceButton = ({ onClick }) => {
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 100,
                minWidthidth: { xs: '100%', md: 250 },
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Button variant="outlined" onClick={onClick}>
                <FontAwesomeIcon icon={faCirclePlus} style={{ margin: 2 }} size="2xl" />
                <Typography sx={{ margin: 2 }} variant="h6">Add a new Device</Typography>
            </Button>
        </Paper>
    )
}

AddNewDeviceButton.propTypes = {
    onClick: PropTypes.func
}

export default AddNewDeviceButton