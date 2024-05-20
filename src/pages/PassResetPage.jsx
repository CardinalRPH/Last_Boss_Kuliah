import { Box, Button, CircularProgress, Divider, Link, Typography } from "@mui/material"
import TextFieldPassword from "../components/TextFieldPassword"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons"
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons"

const RenderError = () => {
    return (
        <>
            <Box sx={{ height: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesomeIcon icon={faCircleXmark} style={{ width: '50px', height: '50px' }} />
            </Box>
            <Box sx={{ height: '60%', textAlign: 'center' }}>
                <Typography variant="body1">Link Expired</Typography>
                <Typography variant="body1">Try again to send the reset link</Typography>
                <Link variant="button" sx={{ display: 'flex', m: 1, justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                    <Typography sx={{ mx: 1 }}>
                        Try Again
                    </Typography>
                    <FontAwesomeIcon style={{ marginLeft: 1, marginRight: 1 }} icon={faArrowRotateRight} />
                </Link>
            </Box>
        </>
    )
}

const PassResetPage = () => {
    const loading = false
    const error = true
    return (
        <>
            <Typography variant="h4">Reset Password</Typography>
            <Divider />
            <Box sx={{ width: '100%', height: '90%', my: 2, display: 'flex', flexDirection: 'column', justifyContent: loading ? 'center' : error ? 'center' : 'start', alignItems: loading ? 'center' : error ? 'center' : 'start' }}>
                {loading ? (
                    <CircularProgress size={50} />
                ) : error ? (<RenderError />) : (
                    <>
                        <Typography>Please enter your new password below. Be sure to use a combination of letters, numbers, and special characters for better security</Typography>
                        <TextFieldPassword label="New Password" containerSx={{ my: 2, width: '100%' }} required />
                        <Button sx={{ my: 2 }} variant="contained">Change Password</Button>
                    </>
                )}

            </Box>
        </>
    )
}

export default PassResetPage