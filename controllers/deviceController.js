import { addNewDevice, deleteDevice, getAllUserDevice, getUserDevicebyId, updateDevice } from "../models/firestoreDevice.js"
import contentValidation from "../security/validations/contentValidation.js"
import defaultValueDeviceData from "../utilities/defaultValueDeviceData.js"
import { sentToClientinRoom } from "../webSocket/webSocketServer.js"

export const deviceGet = async (req, res) => {
    //get all device in email from DB
    const { userMail, deviceId } = req.query

    //do logic Controller
    if (deviceId) {
        const validContent = contentValidation(req.query, {
            deviceId: 'string',
        })

        if (validContent !== null) {
            res.status(400).json({
                error: validContent
            })
            return
        }

        try {
            const userDevice = await getUserDevicebyId({
                email: userMail,
                deviceId
            })
            if (!userDevice) {
                res.status(404).json({ error: 'Devices not found' })
                return
            }

            res.status(200).json({
                data: userDevice.data
            })
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Server error. Please try again later." });
        }
    } else {
        try {
            const allUserDevice = await getAllUserDevice({ email: userMail })
            if (!allUserDevice) {
                res.status(404).json({ error: 'Devices not found' })
                return
            }

            res.status(200).json({
                data: allUserDevice.data
            })
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Server error. Please try again later." });
        }
    }
}

export const devicePost = (req, res) => {
    // add a new Device to DB
    const { deviceName, deviceId, userMail } = req.body

    //validating
    if (!deviceName || deviceId) {
        res.status(400).json({
            error: "Missing Data!"
        })
        return
    }

    const validContent = contentValidation(req.body, {
        deviceName: 'string',
        deviceId: 'string',

    })

    if (validContent !== null) {
        res.status(400).json({
            error: validContent
        })
        return
    }

    //do the logic controller
    try {
        const newDevice = addNewDevice({
            email: userMail,
            deviceId,
            deviceData: {
                ...defaultValueDeviceData,
                name: deviceName
            }
        })

        if (!newDevice) {
            res.status(409).json({ error: 'Device already exists' })
            return
        }
        res.status(200).json({
            data: {
                newDevice
            }
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
}

export const devicePut = async (req, res) => {
    //edit  an existing Device in the DB
    const { deviceId, userMail, deviceName } = req.body
    //validating
    if (!deviceName || deviceId) {
        res.status(400).json({
            error: "Missing Data!"
        })
        return
    }

    const validContent = contentValidation(req.body, {
        deviceName: 'string',
        deviceId: 'string',

    })

    if (validContent !== null) {
        res.status(400).json({
            error: validContent
        })
        return
    }

    //do the logic controller
    try {
        const updatedDevice = await updateDevice({
            email: userMail,
            deviceId,
            deviceData: () => {
                return {
                    name: deviceName
                }
            }
        })
        if (!updatedDevice) {
            res.status(404).json({ error: 'Devices not found' })
            return
        }
        res.status(200).json({
            data: {
                updatedDevice
            }
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
}

export const deviceDelete = async (req, res) => {
    //delete  a Device from the DB
    const { deviceId, userMail } = req.body

    // validating
    if (!deviceId) {
        res.status(400).json({
            error: "Missing Data!"
        })
        return
    }

    const validContent = contentValidation(req.query, {
        deviceId: 'string',
    })

    if (validContent !== null) {
        res.status(400).json({
            error: validContent
        })
        return
    }

    //do the logic controller
    try {
        const deletedDevice = await deleteDevice({
            email: userMail,
            deviceId
        })
        if (!deletedDevice) {
            res.status(404).json({ error: 'Devices not found' })
            return
        }
        res.status(200).json({
            data: deletedDevice.data
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }

}

export const deviceWateringPost = async (req, res) => {
    const { deviceId, userMail } = req.body

    // validating
    if (!deviceId) {
        res.status(400).json({
            error: "Missing Data!"
        })
        return
    }

    const validContent = contentValidation(req.query, {
        deviceId: 'string',
    })

    if (validContent !== null) {
        res.status(400).json({
            error: validContent
        })
        return
    }

    //do controller logic here

    try {
        const userDevice = await getUserDevicebyId({ email: userMail, deviceId })

        if (!userDevice) {
            res.status(404).json({ error: 'Devices not found' })
            return
        }

        //send watering event to device
        const exceptionRoom = sentToClientinRoom(userDevice.id, deviceId, {
            "type": "message",
            "data": {
                "event": "watering"
            }
        })
        if (!exceptionRoom) {
            res.status(404).json({
                error: "Device not found on room"
            })
            return
        }
        res.status(200).json({
            data: 'event sent'
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
}