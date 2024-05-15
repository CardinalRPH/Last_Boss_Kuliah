#include "sentMsgHandler.h"
#include "wsManager.h"
#include "wateringHandler.h"


void handleSentMsgActivity()
{
    JsonDocument docToSent;

    docToSent.clear(); // Bersihkan obj1
    JsonObject obj1 = docToSent.to<JsonObject>();
    JsonObject obj2 = obj1.createNestedObject("data");

    obj1["type"] = "message";
    obj2["id"] = WiFi.macAddress();
    obj2["waterEvent"] = handleWatering();

    obj2["sensor1"] = "from sensor1";

    String jsonString;
    serializeJson(docToSent, jsonString);
    wsSentMsg(jsonString);
}