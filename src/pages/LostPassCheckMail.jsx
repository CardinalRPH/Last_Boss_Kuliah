import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Divider, Typography } from "@mui/material"
import { useOutletContext } from "react-router-dom"

const LostPassCheckMail = () => {
    const { resetEmail } = useOutletContext()
    return (
        <>
            <Typography variant="h4">Forgot Password</Typography>
            <Divider />
            <Box sx={{ width: '100%', height: '90%', my: 2 }}>
                <Box sx={{ height: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon={faEnvelope} style={{ width: '50px', height: '50px' }} />
                </Box>
                <Box sx={{ height: '60%', textAlign: 'center' }}>
                    <Typography variant="body1">
                        We have sent you an email message to <b>{resetEmail}</b> with a link to reset your password.
                    </Typography>
                    <Typography variant="body1">Please check your email</Typography>
                </Box>
            </Box>
        </>
    )
}

export default LostPassCheckMail