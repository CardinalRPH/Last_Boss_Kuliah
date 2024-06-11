import { faArrowRightFromBracket, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import drawerMainRoute from "../utilities/drawerMainRoute";

export const MainListItems = ({ pathName }) => {
    const navigate = useNavigate()
    return drawerMainRoute.map((value, index) => (
        <ListItemButton
            key={index}
            sx={{ bgcolor: (theme) => pathName.includes(value.route) && theme.palette.grey[300] }}
            onClick={() => navigate(value.route)}
        >
            <ListItemIcon>
                {value.icon}
            </ListItemIcon>
            <ListItemText primary={value.name} />
        </ListItemButton>
    ))
}

MainListItems.propTypes = {
    pathName: PropTypes.string
}

export const SignOutListItems = ({ onClick }) => {

    return (
        <ListItemButton onClick={onClick}>
            <ListItemIcon>
                <FontAwesomeIcon icon={faArrowRightFromBracket} size="xl" />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
        </ListItemButton>
    )
}

SignOutListItems.propTypes = {
    onClick: PropTypes.func
}

export const AboutListItem = ({ onClick }) => {
    return (
        <ListItemButton onClick={onClick}>
            <ListItemIcon>
                <FontAwesomeIcon icon={faCircleInfo} size="xl" />
            </ListItemIcon>
            <ListItemText primary="About" />
        </ListItemButton>
    )
}

AboutListItem.propTypes = {
    onClick: PropTypes.func
}
