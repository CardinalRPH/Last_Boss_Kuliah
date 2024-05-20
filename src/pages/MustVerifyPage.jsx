import { faCircleXmark } from "@fortawesome/free-regular-svg-icons"
import { fa1, faArrowRightFromBracket, faArrowRotateRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Card, CardContent, CircularProgress, Divider, Link, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { authAction } from "../stores/authState"
import { useDelete, useGet, usePost } from "../hooks/dataHandler"
import { useEffect, useState } from "react"
import AlertMain from "../components/AlertMain"
import CountdownTimer from "../components/CountdownTimer"
import { cdAction } from "../stores/countDownState"
import { validAction } from "../stores/validState"

const MustVerifyPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [alertState, setAlertState] = useState(false)
    const [disableBtn, setDisableBtn] = useState({
        btnResend: false,
        btnLogout: false
    })
    const { seconds: secondsState, minutes: minutesState } = useSelector(state => state.countD)
    const { data: dataCheck, error: errorCheck, loading: loadingCheck, execute: executeCheck } = useGet('/check-verify')
    const { data, execute, loading, error } = usePost("resend-verify")
    const { isAuthenticated, payload, isValid } = useSelector(state => state.auth)
    const { isSignUp } = useSelector(state => state.valid)
    const { data: dataLogout, loading: loadingLogOut, error: errorlogOut, execute: executeLogOut } = useDelete('/logOut')
    const [retryContent, setRetryContent] = useState(
        <>
            <Typography sx={{ mx: 1 }}>
                Try Resend Again
            </Typography>
            <FontAwesomeIcon style={{ marginLeft: 1, marginRight: 1 }} icon={faArrowRotateRight} />
        </>
    )
    const [alertComponent, setAlertComponent] = useState({
        severity: 'info',
        alertLabel: '',
        content: ''
    })

    const handleResendVerif = () => {
        if (isAuthenticated) {
            const { email } = payload
            setDisableBtn(prevState => ({
                ...prevState, btnResend: true
            }))
            execute({
                data: {
                    userMail: email
                }
            })
        } else {
            setAlertState(true)
            setAlertComponent({
                severity: 'error',
                alertLabel: 'Error',
                content: 'User Not Signed'
            })
        }
    }

    const handleSignOut = () => {
        executeLogOut({
            data: {
                userMail: payload.email
            }
        })
    }


    useEffect(() => {
        if (data) {
            //do countdown
            setDisableBtn(prevState => ({
                ...prevState, btnResend: true
            }))
            setRetryContent(
                <CountdownTimer initialMinutes={2} breakTime={isValid} />
            )
        }
        if (dataCheck) {
            setDisableBtn(prevState => ({
                ...prevState, btnLogout: false
            }))
            if (dataCheck.data.valid) {
                dispatch(authAction.updateState({ valid: dataCheck?.data.valid || false }))
                navigate('/dashboard', { replace: true })
            }
        }
        if (dataLogout) {
            dispatch(authAction.logout())
            dispatch(cdAction.removeCd())
            dispatch(validAction.setSignUpState(false))
            navigate('/signin', { replace: true })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, dataCheck, dataLogout, isValid])

    useEffect(() => {
        if (error) {
            setDisableBtn(prevState => ({
                ...prevState, btnResend: false
            }))
            setAlertComponent({
                severity: 'error',
                alertLabel: 'Error',
                content: error.response?.data.error || error.message
            })
            setAlertState(true)
        }
        if (errorCheck) {
            setDisableBtn({ btnLogout: false, btnResend: false })
            setAlertComponent({
                severity: 'error',
                alertLabel: 'Error',
                content: errorCheck.response?.data.error || errorCheck.message
            })
            setAlertState(true)
        }
        if (errorlogOut) {
            setDisableBtn(prevState => ({
                ...prevState, btnLogout: false
            }))
            setAlertComponent({
                severity: 'error',
                alertLabel: 'Error',
                content: errorCheck.response?.data.error || errorCheck.message
            })
            setAlertState(true)
        }
    }, [error, errorCheck, errorlogOut])

    useEffect(() => {
        if (!isSignUp)
            executeCheck({
                params: {
                    userMail: payload.email
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (secondsState === 0 && minutesState === 0) {
            setDisableBtn(prevState => ({
                ...prevState, btnResend: false
            }))

        } else if (secondsState !== 0 || minutesState !== 0) {
            setDisableBtn(prevState => ({
                ...prevState, btnResend: false
            }))
            setRetryContent(
                <CountdownTimer initialMinutes={minutesState} initialSeconds={secondsState} breakTime={isValid} />
            )
        } else {
            setDisableBtn(prevState => ({
                ...prevState, btnResend: false
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (secondsState === 0 && minutesState === 0) {
            setDisableBtn(prevState => ({
                ...prevState, btnResend: false
            }))
            setRetryContent(
                <>
                    <Typography sx={{ mx: 1 }}>
                        Try Resend Again
                    </Typography>
                    <FontAwesomeIcon style={{ marginLeft: 1, marginRight: 1 }} icon={faArrowRotateRight} />
                </>
            )
        }
    }, [minutesState, secondsState])

    return (
        <>
            <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'lightgray' }}>
                <Card sx={{ width: '30%', height: '90%' }}>
                    <CardContent sx={{ height: '100%' }}>
                        <Typography variant="h4">Not Verify</Typography>
                        <Divider />

                        <Box sx={{ width: '100%', height: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            {!isSignUp && loadingCheck ?
                                <CircularProgress size={50} /> :
                                <>
                                    <Box sx={{ height: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {isSignUp ?
                                            <FontAwesomeIcon icon={fa1} style={{ width: '50px', height: '50px' }} /> :
                                            <FontAwesomeIcon icon={faCircleXmark} style={{ width: '50px', height: '50px' }} />
                                        }
                                    </Box>
                                    <Box sx={{ height: '60%', textAlign: 'center' }}>
                                        <Typography variant="body1">
                                            {isSignUp ? 'One More Step to Continue' : 'Your email not verified'}
                                        </Typography>
                                        <Typography variant="body1">Please check your email inbox and verify your email</Typography>
                                        <Link underline={disableBtn.btnResend ? 'none' : 'hover'} component="button" disabled={disableBtn.btnResend} sx={{ display: 'flex', m: 1, justifyContent: 'center', alignItems: 'center', cursor: disableBtn.btnResend ? 'default' : 'pointer', width: '100%' }} onClick={handleResendVerif}>
                                            {loading ?
                                                <CircularProgress size={24} /> : retryContent
                                            }
                                        </Link>
                                        <Link underline={disableBtn.btnLogout ? 'none' : 'hover'} component="button" sx={{ display: 'flex', m: 1, justifyContent: 'center', alignItems: 'center', cursor: disableBtn.btnLogout ? 'default' : 'pointer', width: '100%' }} disabled={disableBtn.btnLogout} onClick={handleSignOut}>
                                            {loadingLogOut ?
                                                <CircularProgress size={24} /> :
                                                <>
                                                    <Typography sx={{ mx: 1 }}>
                                                        Sign Out
                                                    </Typography>
                                                    <FontAwesomeIcon style={{ marginLeft: 1, marginRight: 1 }} icon={faArrowRightFromBracket} />
                                                </>
                                            }
                                        </Link>
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

export default MustVerifyPage