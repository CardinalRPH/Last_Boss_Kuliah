#include "wsManager.h"
#include "connectionSet.h"

WebSocketsClient webSocket;
// handle check doc object this will catch if error or inappropriate
void handleMessageCheck(JsonDocument wsData)
{
    if (wsData["type"].isNull() || wsData["data"].isNull() && wsData["message"].isNull())
    {
        Serial.println("Some Data is Null");
        webSocket.sendTXT("{\"type\":\"error\",\"data\":\"Some Data is Null\"}");
        return;
    }
    if (!wsData["type"].is<String>())
    {
        Serial.println("Type is not string");
        webSocket.sendTXT("{\"type\":\"error\",\"data\":\"Type is not string\"}");
        return;
    }
    String type = wsData["type"];
    if (type != "message" && type != "error" && type != "info")
    {
        Serial.println("Type not listed");
        webSocket.sendTXT("{\"type\":\"error\",\"data\":\"Type not listed\"}");
        return;
    }
}

void handleWsMessage(JsonDocument wsData)
{
    // Do something with the data received from the server here...
    String type = wsData["type"];

    if (wsData["data"].is<JsonObject>() && type == "message")
    {
        if (wsData["data"]["event"] == "watering")
        {
            waterHandler.setWatering(true, 74000);
        }
    }
    else
    {
        return;
    }
}

void webSocketEvent(WStype_t type, uint8_t *payload, size_t length)
{
    JsonDocument wsData;
    DeserializationError parseError;
    switch (type)
    {
    case WStype_DISCONNECTED:
        connState.setWSConnected(false);
        Serial.printf("[WSc] Disconnected!\n");
        outDevConn.buzzerRinger(4);
        break;
    case WStype_CONNECTED:
        connState.setWSConnected(true);
        Serial.printf("[WSc] Connected to url: %s\n", payload);
        outDevConn.buzzerRinger(1);
        // send message to server when Connected
        webSocket.sendTXT("{\"type\":\"info\",\"data\":\"Client Connected to Server\"}");
        break;
    case WStype_TEXT:
        Serial.printf("[WSc] get text: %s\n", payload);
        parseError = deserializeJson(wsData, payload);
        if (parseError)
        {
            Serial.print("Failed to parse JSON: ");
            Serial.println(parseError.c_str());
            webSocket.sendTXT("{\"type\":\"info\",\"data\":\"Message is not JSON String\"}");
            return;
        }
        handleMessageCheck(wsData);
        handleWsMessage(wsData);
        // send message to server
        // webSocket.sendTXT("message here");
        break;
    case WStype_BIN:
        Serial.printf("[WSc] get binary length: %u\n", length);
        hexdump(payload, length);
        // send data to server
        // webSocket.sendBIN(payload, length);
        break;
    case WStype_PING:
        // pong will be send automatically
        Serial.printf("[WSc] get ping\n");
        break;
    case WStype_PONG:
        // answer to a ping we send
        Serial.printf("[WSc] get pong\n");
        break;
    }
}

void initWebSocket(String WSPath, int port, String host)
{
    webSocket.begin(host, port, WSPath);
    Serial.println("Connected to url: ");
    Serial.println(String(host) + ":" + String(port) + String(WSPath));
    webSocket.onEvent(webSocketEvent);
    webSocket.setReconnectInterval(WSReconInterval);
}

void wsSentMsg(String message)
{
    webSocket.sendTXT(message);
}

void wsLoop()
{
    webSocket.loop();
}
