import { faCircleCheck } from "@fortawesome/free-regular-svg-icons"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Divider, Link, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const ResetPassScss = () => {
    const navigate = useNavigate()
    return (
        <>
            <Typography variant="h4">Forgot Password</Typography>
            <Divider />
            <Box sx={{ width: '100%', height: '90%', my: 2 }}>
                <Box sx={{ height: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon={faCircleCheck} style={{ width: '50px', height: '50px' }} />
                </Box>
                <Box sx={{ height: '60%', textAlign: 'center' }}>
                    <Typography variant="body1">
                        Reset Password Success
                    </Typography>
                    <Link component="button" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', width: '100%', m: 1 }} onClick={() => navigate('/signin', { replace: true })}>
                        <Typography sx={{ mx: 1 }}>
                            Go to Sign In
                        </Typography>
                        <FontAwesomeIcon style={{ marginLeft: 1, marginRight: 1 }} icon={faArrowRight} />
                    </Link>
                </Box>
            </Box>
        </>
    )
}

export default ResetPassScss