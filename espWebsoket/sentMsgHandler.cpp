#include "sentMsgHandler.h"
#include "wsManager.h"
#include "wateringHandler.h"
#include "sensorReader.h"

wateringHandler wHandlers;
void handleSentMsgActivity()
{
    sensorReader snReader;
    JsonDocument docToSent;

    docToSent.clear(); // Bersihkan obj1
    JsonObject obj1 = docToSent.to<JsonObject>();
    JsonObject obj2 = obj1.createNestedObject("data");

    obj1["type"] = "message";
    obj2["Id"] = WiFi.macAddress();
    obj2["waterEvent"] = wHandlers.getWatering();
    obj2["soilSensorTop"] = snReader.readSoil1();
    obj2["soilSensorBot"] = snReader.readSoil2();
    obj2["waterSensor"] = snReader.readTankValue();
    obj2["lightSensor"] = snReader.readLightValue();
    obj2["rainSensor"] = snReader.isRaining();

    String jsonString;
    serializeJson(docToSent, jsonString);
    wsSentMsg(jsonString);
}