import { Box, Button, Card, CardActions, CardContent, Divider } from "@mui/material"
import { Outlet, useNavigate } from "react-router-dom"

const ResetPassLayout = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'lightgray' }}>
            <Card sx={{ width: { sm: '90%', md: '30%' }, height: '90%' }}>
                <CardContent sx={{ height: '80%' }}>
                    <Outlet />
                </CardContent>
                <Divider />
                <CardActions>
                    <Button onClick={() => navigate('/signin')}>Remember your password?</Button>
                </CardActions>
            </Card>
        </Box>
    )
}
export default ResetPassLayout