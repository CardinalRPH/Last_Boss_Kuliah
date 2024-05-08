<<<<<<< HEAD
import { Backdrop, Box, Fade, Modal } from "@mui/material"
import PropTypes from 'prop-types';
import Title from "./Title";
=======
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material"
import PropTypes from 'prop-types';
>>>>>>> 815e55c4a4a9f10e42dc33c7f2cb47be91a048a1

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalMain = ({ open, onClose, children, modalTitle }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
<<<<<<< HEAD
                    <Title> {modalTitle}</Title>
=======
                    <Typography id="modal-title" color='text.primary' variant="h6" component="h2">
                        {modalTitle}
                    </Typography>
>>>>>>> 815e55c4a4a9f10e42dc33c7f2cb47be91a048a1
                    {children}
                </Box>
            </Fade>
        </Modal>
    )
}

ModalMain.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node,
    modalTitle: PropTypes.string
}

export default ModalMain