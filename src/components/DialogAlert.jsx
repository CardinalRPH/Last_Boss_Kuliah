import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import PropTypes from 'prop-types';

const DialogAlert = ({ open = false, onClose, handleCancle, handleAccept, dialogTitle, children, disableCancelBtn=false, disableAccBtn=false, customAccBtn='Ok' }) => {
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
                sx={{ minWidth: 300 }}
            >
                <DialogContentText id="alert-dialog-description">
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button disabled={disableCancelBtn} onClick={handleCancle}>Cancel</Button>
                <Button disabled={disableAccBtn} onClick={handleAccept} autoFocus>
                  {customAccBtn}
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
    children: PropTypes.node,
    disableAccBtn: PropTypes.bool,
    disableCancelBtn: PropTypes.bool,
    customAccBtn:PropTypes.node
}

export default DialogAlert