import { Avatar, Box, Button, CircularProgress, Grid, Link, TextField, Typography } from "@mui/material"
import TextFieldPassword from "../components/TextFieldPassword"
import { useNavigate } from "react-router-dom"
import { usePost } from "../hooks/dataHandler"
import { useEffect, useState } from "react"
import AlertMain from "../components/AlertMain"
import { useDispatch } from "react-redux"
import { validAction } from "../stores/validState"
import { authAction } from "../stores/authState"

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
    return (
        <>

            <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <Box sx={{ height: '100%', width: { xs: '100%', md: '45%' }, bgcolor: 'white', borderRadius: '5px' }}>
                    <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            X
                        </Avatar>
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
                            />
                            <TextFieldPassword
                                label="Password"
                                name="userPass"
                                onChange={handleChange}
                                required
                                value={inputForm.userPass}
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