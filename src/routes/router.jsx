import { Navigate, createBrowserRouter } from "react-router-dom"
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
import ProfilePage from "../pages/ProfilePage"
import DeviceDetailPage from "../pages/DeviceDetailPage"
import AuthGuard from "../services/AuthGuard"
import NotAuthGuard from "../services/NotAuthGuard"
import NoValidGuard from "../services/NoValidGuard"
import LostPassCheckMail from "../pages/LostPassCheckMail"
import UForgetGuard from "../services/UForgetGuard"
import ResetPassScss from "../pages/ResetPassScss"
import ResetScssGuard from "../services/ResetScssGuard"


const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to='/dashboard' replace />
    },
    {
        element: (
            <NotAuthGuard>
                <AuthLayout />
            </NotAuthGuard>
        ),
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
        path: '/verify/:pathToken',
        element: (
            <VerifyPage />
        )
    },
    {
        element: <ResetPassLayout />
        ,
        children: [
            {
                path: '/lost-password',
                element: (
                    <NotAuthGuard>
                        <LostPassPage />
                    </NotAuthGuard>
                )
            },
            {
                path: '/check-reset-mail',
                element: (
                    <NotAuthGuard>
                        <UForgetGuard>
                            <LostPassCheckMail />
                        </UForgetGuard>
                    </NotAuthGuard>
                )
            },
            {
                path: '/reset-password/:token',
                element: (
                    <PassResetPage />
                )
            },
            {
                path: '/reset-success',
                element: (
                    <ResetScssGuard>
                        <ResetPassScss />
                    </ResetScssGuard>
                )
            }
        ]
    },
    {
        path: '/access-verify',
        element: (
            <NoValidGuard>
                <MustVerifyPage />
            </NoValidGuard>
        )
    },
    {
        element: (
            <AuthGuard>
                <RootLayout />
            </AuthGuard>
        ),
        children: [
            {
                path: '/dashboard',
                element: <DashboardPage />
            },
            {
                path: '/devices',
                element: <DevicePage />
            },
            {
                path: '/devices/:id',
                element: <DeviceDetailPage />
            },
            {
                path: '/profile',
                element: <ProfilePage />
            },
        ]
    }
])

export default AppRouter