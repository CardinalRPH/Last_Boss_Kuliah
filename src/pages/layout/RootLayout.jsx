import { Badge, Box, Container, CssBaseline, Divider, IconButton, List, Toolbar, Typography } from "@mui/material"
import { Outlet, useLocation } from "react-router-dom"
import AppBarComponent from "../../components/AppBarComponent"
import DrawerComponent from "../../components/DrawerComponent"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { MainListItems, SignOutListItems } from "../../components/ListItemDrawer"
import drawerMainRoute from "../../utilities/drawerMainRoute"

const RootLayout = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const location = useLocation()
    return (
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
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            D
                        </Badge>
                    </IconButton>
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
                    <SignOutListItems />
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
                    <Outlet />
                </Container>
            </Box>
        </Box >
    )
}

export default RootLayout