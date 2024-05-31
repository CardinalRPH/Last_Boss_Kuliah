#include "connectionSet.h"
#include "httpManager.h"
#include "wsManager.h"

connectionState connState;
outputDev outDevConn;
wateringHandler waterHandler;
void initWifi(const char *ssid, const char *wifiPassword)
{
    WiFi.begin(ssid, wifiPassword);
    Serial.println("Connecting");
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.print("Connected to WiFi network with IP Address: ");
    Serial.println(WiFi.localIP());
    Serial.println("Device ID and MAC: ");
    Serial.println(WiFi.macAddress());
    WiFi.setAutoReconnect(true);
    WiFi.persistent(true);
}

void initConnection(const char *ssid, const char *wifiPassword, String email, String password, String host, int port)
{
    JsonDocument httpData;
    DeserializationError parseError;

    initWifi(ssid, wifiPassword);
    if (WiFi.status() != WL_CONNECTED)
    {
        Serial.println("WiFi not connected");
        outDevConn.buzzerRinger(2);
        return;
    }
    initHTTP(host, port, email, password, WiFi.macAddress());
    if (connState.getHttpResponseCode() > 0)
    {
        parseError = deserializeJson(httpData, connState.getHttpPayload());
        initWebSocket(httpData["path"].as<String>(), port, host);
    } else {
        Serial.println("HTTP connection failed");
        outDevConn.buzzerRinger(3);
    }
}