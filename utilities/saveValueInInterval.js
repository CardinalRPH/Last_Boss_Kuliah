import { saveDeviceSensorUpdate } from "./serverDeviceControll.js"

export default (userMail, deviceId, deviceData) => {
    setInterval(async () => {
        if (deviceData) {
            const { soilSensorTop, soilSensorBot, waterSensor, lightSensor, rainSensor } = deviceData.message
            if (soilSensorBot && soilSensorTop && waterSensor && lightSensor && rainSensor) {
                await saveDeviceSensorUpdate(userMail, deviceId, { soilSensorBot, soilSensorTop, waterSensor, lightSensor, rainSensor })
            }
        }
    }, 2 * 60 * 60 * 1000)
}