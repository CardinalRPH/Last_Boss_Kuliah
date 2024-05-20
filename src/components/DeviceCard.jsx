import { faArrowUpRightFromSquare, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Button, IconButton, Paper, TextField, Typography } from "@mui/material"
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";

const DeviceCard = ({ onGoTo, onDelete, deviceName = "", deviceId = "", onSave, updateLoading }) => {
    const [readOnly, setReadOnly] = useState(true)
    const [defaultTextVal, setDefaultTextVal] = useState(deviceName)
    const [textValue, setTextValue] = useState(defaultTextVal)

    const saveChange = () => {
        setDefaultTextVal(textValue)
        onSave(textValue)
    }
    useEffect(() => {
        if (!updateLoading) {
            setReadOnly(true)
        }
    }, [updateLoading])
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 200,
                my: 2,
                position: 'relative',
                justifyContent: 'center'
            }}
        >
            <Box sx={{ position: 'absolute', right: 10, top: 5 }}>
                <IconButton onClick={onGoTo}>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </IconButton>
            </Box>
            <Box sx={{ position: 'absolute', right: 10, bottom: 5 }}>
                <IconButton onClick={onDelete}>
                    <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '80%' }}>
                    <TextField variant="standard" value={textValue} onChange={(v) => setTextValue(v.target.value)} placeholder="Device Name" inputProps={{ readOnly }} fullWidth />
                    <Typography variant="body1" sx={{ mx: 1 }} noWrap>{deviceId}</Typography>
                </Box>
                {readOnly && !updateLoading ? (
                    <IconButton onClick={() => setReadOnly(false)}>
                        <FontAwesomeIcon icon={faPenToSquare} style={{ marginLeft: 1, marginRight: 1 }} />
                    </IconButton>
                ) : (<>
                    <Button sx={{ mx: 1 }} disabled={updateLoading} onClick={saveChange}>Save</Button>
                    <Button sx={{ mx: 1 }} disabled={updateLoading} onClick={() => { setReadOnly(true); setTextValue(defaultTextVal) }}>Cancel</Button>
                </>)}

            </Box>

        </Paper>
    )
}

DeviceCard.propTypes = {
    onGoTo: PropTypes.func,
    onDelete: PropTypes.func,
    deviceName: PropTypes.string,
    deviceId: PropTypes.string,
    onSave: PropTypes.func,
    updateLoading: PropTypes.bool
}

export default DeviceCard