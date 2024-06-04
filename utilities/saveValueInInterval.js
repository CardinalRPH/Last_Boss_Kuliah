import { saveDeviceSensorUpdate } from "./serverDeviceControll.js"

export default (userMail, deviceId, deviceData) => {
    console.log("Registered to Save");
    setInterval(async () => {
        if (deviceData) {
            if (deviceData?.message) {
                const { soilSensorTop, soilSensorBot, waterSensor, lightSensor, rainSensor } = deviceData.message
                await saveDeviceSensorUpdate(userMail, deviceId, { soilSensorBot, soilSensorTop, waterSensor, lightSensor, rainSensor })
            }
        }
    }, 2 * 60 * 60 * 1000)
}