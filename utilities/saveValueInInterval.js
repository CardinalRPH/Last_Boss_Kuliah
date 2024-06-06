import { saveDeviceSensorUpdate } from "./serverDeviceControll.js"

export default class saveValueInInterval {
    constructor() {
        this.breaker = false
        this.deviceData = null
        this.intervalTimer = null
    }

    saveValue(userMail = null, deviceId = null) {
        if (this.breaker === false && deviceId) {

            if (this.intervalTimer) {
                clearInterval(this.intervalTimer); // Clear any existing interval
            }
            this.intervalTimer = setInterval(async () => {
                if (this.deviceData) {
                    const { soilSensorTop, soilSensorBot, waterSensor, lightSensor, rainSensor } = this.deviceData
                    await saveDeviceSensorUpdate(userMail, deviceId, { soilSensorBot, soilSensorTop, waterSensor, lightSensor, rainSensor })
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
            clearInterval(this.intervalTimer);
            this.intervalTimer = null;
        }
    }
}