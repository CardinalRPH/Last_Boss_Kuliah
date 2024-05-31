import { Box, Button, CircularProgress, Grid, Link, TextField, Typography } from "@mui/material"
import TextFieldPassword from "../components/TextFieldPassword"
import { useNavigate } from "react-router-dom"
import { usePost } from "../hooks/dataHandler"
import { useEffect, useState } from "react"
import AlertMain from "../components/AlertMain"
import { useDispatch } from "react-redux"
import { validAction } from "../stores/validState"
import { authAction } from "../stores/authState"
import ImgMain from "../assets/img3.webp"
import LogoMain from "../assets/logo1fix.svg"

const SignUpPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { data, loading, error, execute } = usePost("createAccount")
    const [inputForm, setInputForm] = useState({
        userName: "",
        userPass: "",
        userMail: ""
    })
    const [alertState, setAlertState] = useState(false)
    const [alertComponent, setAlertComponent] = useState({
        severity: 'info',
        alertLabel: '',
        content: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        execute({
            data: inputForm
        })
    }

    const handleChange = (e) => {
        setInputForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        if (data) {
            dispatch(validAction.setSignUpState(true))
            dispatch(authAction.login(data.data))
            navigate('/access-verify', { replace: true })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])
    useEffect(() => {
        if (error) {
            //do error
            setAlertComponent({
                severity: 'error',
                alertLabel: 'Error',
                content: error.response.data.error
            })
            setAlertState(true)
        }
    }, [error])

    useEffect(() => {
        document.title = `Sign Up`
    }, [])
    return (
        <>

            <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <Box sx={{ height: '100%', width: { xs: '100%', md: '45%' }, bgcolor: 'white', borderRadius: '5px' }}>
                    <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
                        <img src={LogoMain} width={45} style={{ margin: 1 }} />
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} component="form" onSubmit={handleSubmit}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Name"
                                name="userName"
                                autoComplete="name"
                                autoFocus
                                onChange={handleChange}
                                value={inputForm.userName}
                                disabled={loading}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Email Address"
                                name="userMail"
                                autoComplete="email"
                                autoFocus
                                onChange={handleChange}
                                value={inputForm.userMail}
                                type="email"
                                disabled={loading}
                            />
                            <TextFieldPassword
                                label="Password"
                                name="userPass"
                                onChange={handleChange}
                                required
                                value={inputForm.userPass}
                                disabled={loading}
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
                                    "Sign Up"
                                }
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                </Grid>
                                <Grid item>
                                    <Link component="button" onClick={() => navigate('/signin')} variant="body2">
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
                <Box sx={{ height: '95%', display: { xs: 'none', md: 'flex' }, position: "relative", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '55%', backgroundImage: `url(${ImgMain})`, backgroundPosition: "top", borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }} >
                    <Box sx={{ position: "absolute", width: "100%", height: "100%", backdropFilter: "brightness(90%)" }} />
                    <Box sx={{ mx: 10, textAlign: 'left', zIndex: 0 }}>
                        <Typography variant="h3" sx={{ bgcolor: "white" }}>
                            Welcome to <br /> Smart Vertical Garden
                        </Typography>
                        <Typography variant="body1" sx={{ my: 2, color: "white" }}>
                            Get the convenience of monitoring and controlling plant conditions in real time with the Smart Vertical Garden
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <AlertMain
                open={alertState}
                onClose={() => setAlertState(false)}
                alertLabel={alertComponent.alertLabel}
                severity={alertComponent.severity}
                content={alertComponent.content}
            />
        </>
    )
}

export default SignUpPage