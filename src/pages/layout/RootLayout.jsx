import { Box, CircularProgress, Container, CssBaseline, Divider, IconButton, List, Toolbar, Typography } from "@mui/material"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import AppBarComponent from "../../components/AppBarComponent"
import DrawerComponent from "../../components/DrawerComponent"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { MainListItems, SignOutListItems } from "../../components/ListItemDrawer"
import drawerMainRoute from "../../utilities/drawerMainRoute"
import DialogAlert from "../../components/DialogAlert"
import { useDispatch, useSelector } from "react-redux"
import { authAction } from "../../stores/authState"
import { cdAction } from "../../stores/countDownState"
import { validAction } from "../../stores/validState"
import { useDelete } from "../../hooks/dataHandler"
import AlertMain from "../../components/AlertMain"
import useWebSocket from "react-use-websocket"
import mergeObtoArr from "../../utilities/mergeObjtoArr"
import { wsURI } from "../../config/originConfig"

const RootLayout = () => {
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false)
    const [alertState, setAlertState] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { payload, isAuthenticated } = useSelector(state => state.auth)
    const { data, loading, error, execute } = useDelete('/logOut')
    const [wsURL, setWsURL] = useState('')
    const [wsMessage, setWsMessage] = useState([])

    const handleWSOpen = () => {
        setAlertComponent({
            severity: 'info',
            alertLabel: 'WS Info',
            content: 'Websocket Opened'
        })
        setAlertState(true)
    }

    const handleWSClose = () => {
        setAlertComponent({
            severity: 'info',
            alertLabel: 'WS Info',
            content: 'Websocket Closed'
        })
        setAlertState(true)
    }

    const handleWSError = () => {
        setAlertComponent({
            severity: 'error',
            alertLabel: 'Error',
            content: 'Websocket Fail to Connect'
        })
        setAlertState(true)
    }

    const { lastMessage } = useWebSocket(wsURI + wsURL, {
        onOpen: handleWSOpen,
        onClose: handleWSClose,
        onError: handleWSError,
        reconnectAttempts: 3,
        shouldReconnect: true
    })


    const [alertComponent, setAlertComponent] = useState({
        severity: 'info',
        alertLabel: '',
        content: ''
    })

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleSignOut = () => {
        if (isAuthenticated) {
            execute({
                data: {
                    userMail: payload?.email
                }
            })
        }
    }

    const handleDialogOpen = () => {
        if (isAuthenticated) {
            setDialogOpen(true)
        }
    }

    useEffect(() => {
        if (data) {
            //do data
            setDialogOpen(false)
            dispatch(authAction.logout())
            dispatch(cdAction.removeCd())
            dispatch(validAction.setSignUpState(false))
            navigate('/signin', { replace: true })
        }
    }, [data, dispatch, navigate])

    useEffect(() => {
        if (error) {
            //do 
            setDialogOpen(false)
            setAlertComponent({
                severity: 'error',
                alertLabel: 'Error',
                content: error.response?.data.error || error.message
            })
            setAlertState(true)
        }
    }, [error])

    useEffect(() => {
        if (isAuthenticated && payload) {
            //do
            setWsURL(payload?.wsPath)
        }
    }, [isAuthenticated, payload])

    useEffect(() => {
        const updatedArr = mergeObtoArr(wsMessage, lastMessage)
        setWsMessage(updatedArr)
        //need to know is wsMessage uses
    }, [lastMessage, wsMessage])

    return (
        <>
            <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex' }}>
                <CssBaseline />
                <AppBarComponent position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            {drawerMainRoute.find(value => location.pathname.includes(value.route)).name}
                        </Typography>
                        <Typography variant="h6">{payload?.name.split(' ')[0] || 'null'}</Typography>
                    </Toolbar>
                </AppBarComponent>
                <DrawerComponent variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List sx={{ overflow: 'hidden' }}>
                        <MainListItems pathName={location.pathname} />
                        <Divider />
                        <SignOutListItems onClick={handleDialogOpen} />
                    </List>
                </DrawerComponent>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        minHeight: '100vh',
                        overflow: 'auto',
                        bgcolor: (theme) => theme.palette.grey[100]
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ my: 4 }}>
                        <Outlet context={{ wsMessage }} />
                    </Container>
                </Box>
            </Box >
            <DialogAlert
                open={dialogOpen}
                onClose={() => !loading && setDialogOpen(false)}
                handleCancle={() => setDialogOpen(false)}
                dialogTitle="Sign Out"
                handleAccept={handleSignOut}
                disableAccBtn={loading}
                disableCancelBtn={loading}
                customAccBtn={loading ? <CircularProgress size={27} /> : 'Ok'}
            >
                Are you sure to sign out
            </DialogAlert>
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

export default RootLayout