import { faArrowUpRightFromSquare, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Button, IconButton, Paper, TextField, Typography } from "@mui/material"
import PropTypes from 'prop-types';
import { useState } from "react";

const DeviceCard = ({ onGoTo, onDelete, deviceName = "", deviceId = "", onSave }) => {
    const [readOnly, setReadOnly] = useState(true)
<<<<<<< HEAD
    const [defaultTextVal, setDefaultTextVal] = useState(deviceName)
    const [textValue, setTextValue] = useState(defaultTextVal)

    const saveChange = () => {
        setDefaultTextVal(textValue)
=======
    const [textValue, setTextValue] = useState(deviceName)

    const saveChange = () => {
>>>>>>> 815e55c4a4a9f10e42dc33c7f2cb47be91a048a1
        setReadOnly(true)
        onSave()
    }
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
                    <FontAwesomeIcon icon={faTrash} />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '80%' }}>
                    <TextField variant="standard" value={textValue} onChange={(v) => setTextValue(v.target.value)} placeholder="Device Name" inputProps={{ readOnly }} fullWidth />
                    <Typography variant="body1" sx={{ mx: 1 }} noWrap>{deviceId}</Typography>
                </Box>
                {readOnly ? (
                    <IconButton onClick={() => setReadOnly(false)}>
<<<<<<< HEAD
                        <FontAwesomeIcon icon={faPenToSquare} style={{ marginLeft: 1, marginRight: 1 }} />
                    </IconButton>
                ) : (<>
                    <Button sx={{ mx: 1 }} onClick={saveChange}>Save</Button>
                    <Button sx={{ mx: 1 }} onClick={() => { setReadOnly(true); setTextValue(defaultTextVal) }}>Cancel</Button>
=======
                        <FontAwesomeIcon icon={faPenToSquare} size="md" style={{ marginLeft: 1, marginRight: 1 }} />
                    </IconButton>
                ) : (<>
                    <Button sx={{ mx: 1 }} onClick={saveChange}>Save</Button>
                    <Button sx={{ mx: 1 }} onClick={() => { setReadOnly(true); setTextValue(deviceName) }}>Cancel</Button>
>>>>>>> 815e55c4a4a9f10e42dc33c7f2cb47be91a048a1
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
}

export default DeviceCard