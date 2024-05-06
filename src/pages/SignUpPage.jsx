import { Avatar, Box, Button, Grid, Link, TextField, Typography } from "@mui/material"
import TextFieldPassword from "../components/TextFieldPassword"
import { useNavigate } from "react-router-dom"

const SignUpPage = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ height: '100%', width: { xs: '100%', md: '45%' }, bgcolor: 'white', borderRadius: '5px' }}>
                <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        X
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth   
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextFieldPassword
                            label="Password"
                            name="password"
                            required
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            </Grid>
                            <Grid item>
                            <Link component="button" onClick={()=> navigate('/signin')} variant="body2">
                                    {"Already have an account? Sign in"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
                            {'Copyright © '}
                            <Link color="inherit" href="https://mui.com/">
                                Your Website
                            </Link>{' '}
                            {new Date().getFullYear()}
                            {'.'}
                        </Typography>
                    </Box>

                </Box>
            </Box>
            <Box sx={{ height: '95%', display: { xs: 'none', md: 'flex' }, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '55%', bgcolor: 'red', borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }} >
                <Box sx={{ mx: 10, textAlign: 'left' }}>
                    <Typography variant="h3">
                        Welcome to X
                    </Typography>
                    <Typography variant="body1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quis totam consequuntur laborum eos corporis, nulla est impedit, sequi velit recusandae minus obcaecati distinctio nostrum ipsum quasi sed saepe quaerat!
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default SignUpPage