import { faCircleInfo, faCubes, faMicrochip, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default [
    {
        name: 'Dashboard',
        route: '/dashboard',
        icon: <FontAwesomeIcon icon={faCubes} size="xl" />

    },
    {
        name: 'Devices',
        route: '/devices',
        icon: <FontAwesomeIcon icon={faMicrochip} size="xl" />

    },
    {
        name: 'Profile',
        route: '/profile',
        icon: <FontAwesomeIcon icon={faUser} size="xl" />

    },
    {
        name: 'About',
        route: '/about',
        icon: <FontAwesomeIcon icon={faCircleInfo} size="xl" />

    },
]