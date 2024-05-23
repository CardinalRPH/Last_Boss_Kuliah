import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Link, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const NotFoundPage = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '90vh' }}>
            <Typography sx={{ mt: 1 }} variant="h5">404</Typography>
            <Typography sx={{ mb: 1 }} variant="h6">Page Not Found</Typography>
            <Link component="button" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', width: '100%', m: 1 }} onClick={() => navigate('/signin')}>
                <Typography sx={{ mx: 1 }}>
                    Back
                </Typography>
                <FontAwesomeIcon style={{ marginLeft: 1, marginRight: 1 }} icon={faArrowRight} />
            </Link>

        </Box>
    )
}

export default NotFoundPage