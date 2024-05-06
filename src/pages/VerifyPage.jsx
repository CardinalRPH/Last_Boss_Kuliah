import { faCircleCheck, faCircleXmark } from "@fortawesome/free-regular-svg-icons"
import { faArrowRight, faArrowRotateRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Card, CardContent, CircularProgress, Divider, Link, Typography } from "@mui/material"

const VerifyPage = () => {
    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'lightgray' }}>
            <Card sx={{ width: '30%', height: '90%' }}>
                <CardContent sx={{ height: '100%' }}>
                    <Typography variant="h4">Verify Email</Typography>
                    <Divider />
                    <Box sx={{ width: '100%', height: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {/* <CircularProgress size={50} /> */}
                        <Box sx={{ height: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FontAwesomeIcon icon={faCircleCheck} style={{ width: '50px', height: '50px' }} />
                            {/* <FontAwesomeIcon icon={faCircleXmark} style={{width:'50px', height:'50px'}}/> */}
                        </Box>
                        <Box sx={{ height: '60%', textAlign: 'center' }}>
                            <Typography variant="body1">Your email has been verified</Typography>
                            <Typography variant="body1">Thanks for registering</Typography>
                            <Link variant="button" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor:'pointer' }}>
                                <Typography sx={{ mx: 1 }}>
                                    Go to dashboard
                                </Typography>
                                <FontAwesomeIcon style={{ marginLeft: 1, marginRight: 1 }} icon={faArrowRight} />
                            </Link>
                            {/* <Typography variant="body1">Fail to veify email</Typography>
                            <Typography variant="body1">Try again to send the verification email</Typography>
                            <Link variant="button" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor:'pointer' }}>
                                <Typography sx={{ mx: 1 }}>
                                    Resend Veriification
                                </Typography>
                                <FontAwesomeIcon style={{ marginLeft: 1, marginRight: 1 }} icon={faArrowRotateRight} />
                            </Link> */}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

export default VerifyPage