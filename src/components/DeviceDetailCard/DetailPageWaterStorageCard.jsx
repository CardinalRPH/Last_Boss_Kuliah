import { faBucket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Paper, Typography } from "@mui/material"
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";

const DetailPageWaterStorageCard = ({ value = 0 }) => {
    const [colorIco, setColorIco] = useState("black")

    useEffect(() => {
        if (value === 0) {
            setColorIco("black")
        } else if (value <= 30) {
            setColorIco("crimson")
        } else if (value > 30 && value <=100) {
            setColorIco("dodgerblue")
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
                <FontAwesomeIcon icon={faBucket} size="2xl" style={{ marginTop: 1, marginBottom: 1, color: colorIco}} />
            </Box>
            <Box sx={{ m: 1 }}>
                <Typography variant="h6">{value}%</Typography>
                <Typography variant="body1">Water Storage</Typography>
            </Box>
        </Paper>
    )
}

DetailPageWaterStorageCard.propTypes = {
    value: PropTypes.number.isRequired
}

export default DetailPageWaterStorageCard