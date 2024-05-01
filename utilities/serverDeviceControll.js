import { updateDevice } from "../models/firestoreDevice.js"
import getCurrentTime from "./getCurrentTime.js"

export const saveDeviceWatering = async (userMail, deviceId) => {
    const { day, date, time } = getCurrentTime()

    try {
        const updatedDevice = await updateDevice({
            email: userMail,
            deviceId,
            deviceData: (dbData) => {
                const { waterVal } = dbData
                const { date: dbDate } = waterVal[day]
                if (dbDate === date) {
                    const updatedWaterVal = { ...waterVal }
                    updatedWaterVal[day]?.data.push(time)
                    return { waterVal: updatedWaterVal }
                } else {
                    const updatedWaterVal = { ...waterVal }
                    updatedWaterVal[day].date = date
                    updatedWaterVal[day].data = [time]
                    return { waterVal: updatedWaterVal }
                }

            }
        })
        if (!updatedDevice) {
            console.log("SaveDeviceWater: Device Not Found");
            return
        }

    } catch (error) {
        console.error(error);
    }
}

export const saveDeviceSensorUpdate = async (userMail, deviceId, { soilSensorTop, soilSensorBot, waterSensor, lightSensor, rainSensor }) => {
    const { day, date, time } = getCurrentTime()

    try {
        const updatedDevice = await updateDevice({
            email: userMail,
            deviceId,
            deviceData: (dbData) => {
                const { sensorsVal } = dbData
                const { date: dbDate } = sensorsVal[day]
                if (dbDate === date) {
                    const updatedSensorVal = { ...sensorsVal }
                    updatedSensorVal[day]?.data.push({
                        soilSensorTop, soilSensorBot, waterSensor, lightSensor, rainSensor, time
                    })
                    return { sensorsVal: updatedSensorVal }
                } else {

                    const updatedSensorVal = { ...sensorsVal }
                    updatedSensorVal[day].date = date

                    updatedSensorVal[day].data = [{
                        soilSensorTop, soilSensorBot, waterSensor, lightSensor, rainSensor, time
                    }]
                    return { sensorsVal: updatedSensorVal }
                }

            }
        })
        if (!updatedDevice) {
            console.log("SaveDeviceWater: Device Not Found");
            return
        }
    } catch (error) {
        console.error(error);
    }
}