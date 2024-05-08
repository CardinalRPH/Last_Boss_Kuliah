import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material"
import TextFieldPassword from "../components/TextFieldPassword"
import { useNavigate } from "react-router-dom"

const SignInPage = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ height: '95%', display: { xs: 'none', md: 'flex' }, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '55%', bgcolor: 'red', borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px' }}>
                <Box sx={{mx:10,textAlign:'right'}}>
                    <Typography variant="h3">
                        Welcome Back
                    </Typography>
                    <Typography variant="body1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quis totam consequuntur laborum eos corporis, nulla est impedit, sequi velit recusandae minus obcaecati distinctio nostrum ipsum quasi sed saepe quaerat!
                    </Typography>
                </Box>

            </Box>
            <Box sx={{ height: '100%', width: { xs: '100%', md: '45%' }, bgcolor: 'white', borderRadius: '5px' }}>
                <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        X
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link component="button" onClick={()=> navigate('/forgetPassword')} variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link variant="body2" component="button" onClick={()=> navigate('/signup')}>
                                    {"Don't have an account? Sign Up"}
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
        </Box>
    )
}

export default SignInPage