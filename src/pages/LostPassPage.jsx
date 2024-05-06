import { Box, Button, Divider, TextField, Typography } from "@mui/material"

const LostPassPage = () => {
    return (
        <>
            <Typography variant="h4">Forgot Password</Typography>
            <Divider />
            <Box sx={{ width: '100%', height: '90%', my: 2 }}>
                <Typography>Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.</Typography>
                <TextField label="Email Address" sx={{ my: 2 }} fullWidth required />
                <Button sx={{ my: 2 }} variant="contained">Reset Password</Button>
            </Box>
        </>
    )
}

export default LostPassPage