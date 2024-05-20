import { faCircleCheck, faCircleXmark } from "@fortawesome/free-regular-svg-icons"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Card, CardContent, CircularProgress, Divider, Link, Typography } from "@mui/material"
import { useGet } from "../hooks/dataHandler"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authAction } from "../stores/authState"
import { cdAction } from "../stores/countDownState"
import { validAction } from "../stores/validState"
import AlertMain from "../components/AlertMain"

const VerifyPage = () => {
    const { pathToken } = useParams()
    const { data, loading, error, execute } = useGet("verifyAccount", true)
    const { isAuthenticated, isValid, payload } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [alertState, setAlertState] = useState(false)
    const [alertComponent, setAlertComponent] = useState({
        severity: 'info',
        alertLabel: '',
        content: ''
    })

    useEffect(() => {
        if (data) {
            if (isAuthenticated && !isValid && payload) {
                dispatch(authAction.updateState(data.data))
                dispatch(cdAction.removeCd())
                dispatch(validAction.setSignUpState(false))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    useEffect(() => {
        if (error) {
            setAlertComponent({
                severity: 'error',
                alertLabel: 'Error',
                content: error.response?.data.error || error.message
            })
            setAlertState(true)
        }
    }, [error])

    useEffect(() => {
        execute({
            params: {
                token: pathToken
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>

            <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'lightgray' }}>
                <Card sx={{ width: '30%', height: '90%' }}>
                    <CardContent sx={{ height: '100%' }}>
                        <Typography variant="h4">Verify Email</Typography>
                        <Divider />
                        <Box sx={{ width: '100%', height: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            {loading ?
                                <CircularProgress size={50} /> :
                                <>
                                    <Box sx={{ height: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {data && <FontAwesomeIcon icon={faCircleCheck} style={{ width: '50px', height: '50px' }} />}
                                        {error && <FontAwesomeIcon icon={faCircleXmark} style={{ width: '50px', height: '50px' }} />}

                                    </Box>
                                    <Box sx={{ height: '60%', textAlign: 'center' }}>
                                        <Typography variant="body1">
                                            {data && 'Your email has been verified'}
                                            {error && 'Your email has not been verified'}
                                        </Typography>
                                        <Typography variant="body1">
                                            {data && 'You can now go to Dashboard'}
                                            {error && 'Please check your email and verify it'}
                                        </Typography>
                                        {error && <Typography variant="body1">
                                            Link Expire or Wrong
                                        </Typography>}
                                        {isAuthenticated && payload ?
                                            <Link component="button" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', width: '100%', m: 1 }} onClick={() => navigate('/dashboard')}>
                                                <Typography sx={{ mx: 1 }}>
                                                    Go to Dashboard
                                                </Typography>
                                                <FontAwesomeIcon style={{ marginLeft: 1, marginRight: 1 }} icon={faArrowRight} />
                                            </Link> :
                                            <Link component="button" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', width: '100%', m: 1 }} onClick={() => navigate('/signin')}>
                                                <Typography sx={{ mx: 1 }}>
                                                    Go to Sign In
                                                </Typography>
                                                <FontAwesomeIcon style={{ marginLeft: 1, marginRight: 1 }} icon={faArrowRight} />
                                            </Link>
                                        }


                                    </Box>

                                </>
                            }
                        </Box>
                    </CardContent>
                </Card>
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

export default VerifyPage