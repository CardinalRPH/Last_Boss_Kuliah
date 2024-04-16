#include <WebSocketsClient.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>

WebSocketsClient webSocket;

const char *ssid = "Ruang_Staff I";
const char *password = "staffjungle2023";

const char *WSAddress = "http://192.168.134.20:3001/api/rfidFetch";
const int WSPort = 5000;
const char *WSPath = "/";
const int WSReconInterval = 5000;
const char *WSToken = "authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYSIsImRldmljZUlkIjoiNDU2IiwiaWF0IjoxNzEyMzQxNDA0fQ.-KTDsqD0FXXf2WCtvbsadK35lr3IcV3wRladvscxEyQ";
void webSocketEvent(WStype_t type, uint8_t *payload, size_t length)
{

  switch (type)
  {
  case WStype_DISCONNECTED:
    Serial.printf("[WSc] Disconnected!\n");
    break;
  case WStype_CONNECTED:
  {
    Serial.printf("[WSc] Connected to url: %s\n", payload);

    // send message to server when Connected
    webSocket.sendTXT("Connected");
  }
  break;
  case WStype_TEXT:
    Serial.printf("[WSc] get text: %s\n", payload);

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

void setup()
{
  // put your setup code here, to run once:
  Serial.begin(9600);
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  Serial.println(WiFi.macAddress());

  webSocket.begin(WSAddress, WSPort, WSAddress);
  webSocket.onEvent(webSocketEvent);
  webSocket.setExtraHeaders(WSToken);
  webSocket.setReconnectInterval(WSReconInterval);


}

void loop()
{
  // put your main code here, to run repeatedly:
}
