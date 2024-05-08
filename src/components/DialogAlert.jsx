import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import PropTypes from 'prop-types';

const DialogAlert = ({ open=false, onClose, handleCancle, handleAccept, dialogTitle, children }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {dialogTitle}
            </DialogTitle>
            <DialogContent
                sx={{ minWidth: 400 }}
            >
                <DialogContentText id="alert-dialog-description">
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
<<<<<<< HEAD
                <Button onClick={handleCancle}>Cancel</Button>
=======
                <Button onClick={handleCancle}>Batal</Button>
>>>>>>> 815e55c4a4a9f10e42dc33c7f2cb47be91a048a1
                <Button onClick={handleAccept} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

DialogAlert.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    handleCancle: PropTypes.func,
    handleAccept: PropTypes.func,
    dialogTitle: PropTypes.string,
    children: PropTypes.node
}

export default DialogAlert