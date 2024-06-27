import getCurrentTime from "./getCurrentTime.js"
import { saveDeviceSensorUpdate, saveDeviceWatering } from "./serverDeviceControll.js"

export default class saveValueInInterval {
    constructor() {
        this.breaker = false
        this.deviceData = null
        this.intervalTimer = null
    }

    saveValue(userMail = null, deviceId = null) {
        const saveDeviceWater = new saveDeviceWatering()
        if (this.breaker === false && deviceId) {

            if (this.intervalTimer) {
                clearInterval(this.intervalTimer); // Clear any existing interval
            }
            const { time, date } = getCurrentTime()
            this.intervalTimer = setInterval(async () => {
                if (this.deviceData) {
                    console.log(`Saving on ${deviceId} at ${time} ${date}`)
                    const { soilSensorTop, soilSensorBot, waterSensor, lightSensor, rainSensor, pumpSecond } = this.deviceData
                    await saveDeviceSensorUpdate(userMail, deviceId, { soilSensorBot, soilSensorTop, waterSensor, lightSensor, rainSensor })
                    await saveDeviceWater.saveWatering(userMail, deviceId, pumpSecond)
                    saveDeviceWater.setIsWatering(false)
                }
            }, 2 * 60 * 60 * 1000)
        } else {
            if (this.intervalTimer) {
                clearInterval(this.intervalTimer)
                this.intervalTimer = null
            }
        }
    }

    setDeviceData(value) {
        this.deviceData = value
    }

    setBreaker(value = false) {
        this.breaker = value;
        if (this.breaker === true && this.intervalTimer) {
            console.log("Device Connection CLosed")
            clearInterval(this.intervalTimer);
            this.intervalTimer = null;
        }
    }
}