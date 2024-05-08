import { Alert, AlertTitle, Snackbar } from "@mui/material"
import PropTypes from 'prop-types';

const AlertMain = ({ alertLabel, content, severity, onClose, open = false, anchorPosition={vertical:'top', horizontal:'center'} }) => {

    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={onClose}
            anchorOrigin={anchorPosition}
            sx={{ minWidth: 300 }}
        >
            <Alert
                severity={severity}
                onClose={onClose}
                sx={{ width: '100%' }}
            >
                <AlertTitle>{alertLabel}</AlertTitle>
                {content}
            </Alert>
        </Snackbar>
    )
}

AlertMain.propTypes = {
    alertLabel: PropTypes.string,
    content: PropTypes.node,
    severity: PropTypes.oneOf(['success', 'info', 'warning', 'error']).isRequired,
    onClose: PropTypes.func,
    open: PropTypes.bool,
    anchorPosition: PropTypes.shape({
        vertical: PropTypes.oneOf(['top', 'bottom']),
        horizontal: PropTypes.oneOf(['left', 'center', 'right'])
    })

}

export default AlertMain