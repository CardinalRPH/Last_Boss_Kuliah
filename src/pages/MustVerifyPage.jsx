import { faCircleXmark } from "@fortawesome/free-regular-svg-icons"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Card, CardContent, Divider, Link, Typography } from "@mui/material"

const MustVerifyPage = () => {
    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'lightgray' }}>
            <Card sx={{ width: '30%', height: '90%' }}>
                <CardContent sx={{ height: '100%' }}>
                    <Typography variant="h4">Not Verify</Typography>
                    <Divider />
                    <Box sx={{ width: '100%', height: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ height: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FontAwesomeIcon icon={faCircleXmark} style={{ width: '50px', height: '50px' }} />
                        </Box>
                        <Box sx={{ height: '60%', textAlign: 'center' }}>
                            <Typography variant="body1">Your email not verified</Typography>
                            <Typography variant="body1">Please check your email inbox and verify your email</Typography>
                            <Link variant="button" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                                <Typography sx={{ mx: 1 }}>
                                    Sign Out
                                </Typography>
                                <FontAwesomeIcon style={{ marginLeft: 1, marginRight: 1 }} icon={faArrowRightFromBracket} />
                            </Link>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

export default MustVerifyPage