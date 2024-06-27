#include "sentMsgHandler.h"
#include "wsManager.h"

void handleSentMsgActivity(bool waterEvent, float readSoil1, float readSoil2, int readTankValue, float readLightValue, bool isRaining, int waterMlSecond)
{
    JsonDocument docToSent;

    docToSent.clear(); // Bersihkan obj1
    JsonObject obj1 = docToSent.to<JsonObject>();
    JsonObject obj2 = obj1.createNestedObject("data");

    obj1["type"] = "message";
    obj2["Id"] = WiFi.macAddress();
    obj2["waterEvent"] = waterEvent;
    obj2["soilSensorTop"] = readSoil1;
    obj2["soilSensorBot"] = readSoil2;
    obj2["waterSensor"] = readTankValue;
    obj2["lightSensor"] = readLightValue;
    obj2["rainSensor"] = isRaining;
    obj2["pumpSecond"] = waterMlSecond / 1000;

    String jsonString;
    serializeJson(docToSent, jsonString);
    Serial.println(jsonString);
    wsSentMsg(jsonString);
}