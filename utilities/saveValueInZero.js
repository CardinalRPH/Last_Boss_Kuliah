import cron from "node-cron"
import getCurrentTime from "./getCurrentTime.js"
import { updateDevice } from "../models/firestoreDevice.js"

const saveValueActivity = async (email, deviceId) => {
    const { day, date } = getCurrentTime()
    try {
        const updatedDevice = await updateDevice({
            email,
            deviceId,
            deviceData: (dbData) => {
                const { sensorsVal, waterVal } = dbData
                const updatedWaterVal = { ...waterVal }
                updatedWaterVal[day].date = date
                updatedWaterVal[day].data = []

                const updatedSensorVal = { ...sensorsVal }
                updatedSensorVal[day].date = date
                updatedSensorVal[day].data = []
                return { waterVal: updatedWaterVal, sensorsVal: updatedSensorVal }
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

export class saveValueInZero {
    constructor() {
        this.scheduledTask = null
    }

    start(email, deviceId) {
        this.scheduledTask = cron.schedule('1 0 * * *', async () => saveValueActivity(email, deviceId), {
            scheduled: true,
            timezone: "Asia/Jakarta"
        })
        this.scheduledTask.start()
    }

    stop() {
        if (this.scheduledTask) {
            this.scheduledTask.stop()
        }
    }
}
