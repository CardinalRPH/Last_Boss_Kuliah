import { faSeedling } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Paper, Typography } from "@mui/material"
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";

const DetailPageSoilCard = ({ value = 0, title }) => {
    const [colorIco, setColorIco] = useState("black")

    useEffect(() => {
        if (value === 0) {
            setColorIco("black")
        } else if (value <= 400) {
            setColorIco("forestgreen")
        } else if (value > 400 && value < 700) {
            setColorIco("lightsalmon")
        } else if (value >= 700 && value <= 1024) {
            setColorIco("crimson")
        } else {
            setColorIco("black")
        }
    }, [value])
    return (
        <Paper
            sx={{
                p: 2,
                minHeight: 150,
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <Box sx={{ borderRadius: '50%', bgcolor: 'lightgrey', width: 60, height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', m: 1 }}>
                <FontAwesomeIcon icon={faSeedling} size="2xl" style={{ marginTop: 1, marginBottom: 1, color: colorIco }} />
            </Box>
            <Box sx={{ m: 1 }}>
                <Typography variant="h6">{value}</Typography>
                <Typography variant="body1">{title}</Typography>
            </Box>
        </Paper>
    )
}

DetailPageSoilCard.propTypes = {
    value: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
}

export default DetailPageSoilCard