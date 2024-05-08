import { createBrowserRouter } from "react-router-dom"
import SignInPage from "../pages/SignInPage"
import SignUpPage from "../pages/SignUpPage"
import VerifyPage from "../pages/VerifyPage"
import AuthLayout from "../pages/layout/AuthLayout"
import ResetPassLayout from "../pages/layout/ResetPassLayout"
import LostPassPage from "../pages/LostPassPage"
import PassResetPage from "../pages/PassResetPage"
import MustVerifyPage from "../pages/MustVerifyPage"
import RootLayout from "../pages/layout/RootLayout"
import DashboardPage from "../pages/DashboardPage"
import DevicePage from "../pages/DevicePage"
<<<<<<< HEAD
import ProfilePage from "../pages/ProfilePage"
=======
>>>>>>> 815e55c4a4a9f10e42dc33c7f2cb47be91a048a1


const AppRouter = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                path: '/signin',
                element: <SignInPage />
            },
            {
                path: '/signup',
                element: <SignUpPage />
            }
        ]
    },
    {
        path: '/verify',
        element: <VerifyPage />
    },
    {
        element: <ResetPassLayout />,
        children: [
            {
                path: '/lost-password',
                element: <LostPassPage />
            },
            {
                path: '/reset-password',
                element: <PassResetPage />
            }
        ]
    },
    {
        path: '/access-denied',
        element: <MustVerifyPage />
    },
    {
        element: <RootLayout />,
        children: [
            {
                path: '/dashboard',
                element: <DashboardPage />
            },
            {
                path: '/devices',
                element: <DevicePage />
<<<<<<< HEAD
            },
            {
                path: '/profile',
                element: <ProfilePage />
=======
>>>>>>> 815e55c4a4a9f10e42dc33c7f2cb47be91a048a1
            }
        ]
    }
])

export default AppRouter