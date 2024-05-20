import { Avatar, Box, Button, Checkbox, CircularProgress, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material"
import TextFieldPassword from "../components/TextFieldPassword"
import { useNavigate } from "react-router-dom"
import { usePost } from "../hooks/dataHandler"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { authAction } from "../stores/authState"

const SignInPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [signInData, setSignInData] = useState({
        userMail: '',
        userPass: '',
        keepSignIn: false
    })
    const { loading, data, error, execute } = usePost("userLogin")

    const handleSubmit = (e) => {
        e.preventDefault()
        execute({
            data: signInData
        })
    }
    const handleChange = (e) => {
        e.target.type === "text" || e.target.type === "password" || e.target.type ==="email" ?
            setSignInData(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            })) :
            setSignInData(prevState => ({
                ...prevState,
                [e.target.name]: e.target.checked
            }))

    }

    useEffect(() => {
        if (data) {
            dispatch(authAction.login(data))
            navigate('/dashboard', { replace: true })
        }
    }, [data, dispatch, navigate])

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ height: '95%', display: { xs: 'none', md: 'flex' }, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '55%', bgcolor: 'red', borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px' }}>
                <Box sx={{ mx: 10, textAlign: 'right' }}>
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
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} component="form" onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="userMail"
                            onChange={handleChange}
                            value={signInData.userMail}
                            autoComplete="email"
                            type="email"
                            autoFocus
                        />
                        <TextFieldPassword
                            label="Password"
                            onChange={handleChange}
                            value={signInData.userPass}
                            name="userPass"
                            required
                        />
                        {error &&
                            <Typography color="red">{error.response.data.error}</Typography>
                        }
                        <FormControlLabel
                            control={<Checkbox checked={signInData.keepSignIn} onChange={handleChange} name="keepSignIn" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {loading ?
                                <CircularProgress color="grey" size={24} /> :
                                "Sign In"
                            }
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link component="button" onClick={() => navigate('/forgetPassword')} variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link variant="body2" component="button" onClick={() => navigate('/signup')}>
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