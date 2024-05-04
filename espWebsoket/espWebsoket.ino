#include <WebSocketsClient.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>

WebSocketsClient webSocket;
// Wifi Setup
const char *ssid = "PARZ!VAL X";
const char *wifiPassword = "batusarino1";

// User Account
const String email = "example@mail.com";
const String password = "secret";

// insert Host and port
const String host = "192.168.1.12";
const int port = 5000;

const int WSReconInterval = 5000;

unsigned long lastMsgTime = 0;
const unsigned long interval = 1000;
const unsigned long interval2 = 5000;
// to do
// neeed to re consturct
// this is only sent and read the message webscoket
// cant rewrite data and send it again
// on watering then it will update like sensor do update

JsonDocument docToSent;
int httpResponseCode;
bool isWatering = false;
unsigned long previousMillis = 0;

String handleWatering(bool manual = false)
{
  if (manual)
  {
    // Jalankan penyiraman manual di sini, seperti menyalakan relay atau yang serupa
    unsigned long currentMillis = millis();
    Serial.println("Manual watering started");
    isWatering = true;
    digitalWrite(BUILTIN_LED, HIGH);
    previousMillis = currentMillis; // Tetapkan previousMillis saat ini
  }
  
  // Periksa apakah masih dalam proses penyiraman
  if (isWatering)
  {
    unsigned long currentMillis = millis();
    // Periksa apakah sudah mencapai interval penyiraman yang diinginkan
    if (currentMillis - previousMillis >= interval2)
    {
      Serial.println("Watering finished");
      digitalWrite(BUILTIN_LED, LOW);
      isWatering = false;
    }
    return "isNow";
  }
  
  // Periksa kondisi tanah dan lakukan penyiraman jika diperlukan
  // Lakukan pengecekan dan pengiriman ke server di sini
  return "";
}


void handleWsMessage(JsonDocument wsData)
{
  // Do something with the data received from the server here...
  String type = wsData["type"];

  if (wsData["data"].is<JsonObject>() && type == "message")
  {
    if (wsData["data"]["event"] == "watering")
    {
      handleWatering(true);
    }
  }
  else
  {
    return;
  }
}

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

void webSocketEvent(WStype_t type, uint8_t *payload, size_t length)
{
  JsonDocument wsData;
  DeserializationError parseError;
  switch (type)
  {
  case WStype_DISCONNECTED:
    Serial.printf("[WSc] Disconnected!\n");
    break;
  case WStype_CONNECTED:
    Serial.printf("[WSc] Connected to url: %s\n", payload);
    // send message to server when Connected
    webSocket.sendTXT("{\"type\":\"info\",\"data\":\"Client Connected to Server\"}");
    break;
  case WStype_TEXT:
    // Serial.printf("[WSc] get text: %s\n", payload);
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

void handleSentMsgActivity()
{

  docToSent.clear(); // Bersihkan obj1
  JsonObject obj1 = docToSent.to<JsonObject>();
  JsonArray array1 = obj1.createNestedArray("data");
  JsonObject obj2 = array1.createNestedObject();

  obj1["type"] = "message";

  obj2["id"] = WiFi.macAddress();

  if (handleWatering() == "")
  {
    obj2["event"] = nullptr; // Mengganti NULL dengan nullptr
  }
  else
  {
    obj2["event"] = "watering";
  }

  obj2["sensor1"] = "from sensor1";

  String jsonString;
  serializeJson(docToSent, jsonString);
  webSocket.sendTXT(jsonString);
}

void initWifi()
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

void initHTTP()
{
  JsonDocument httpData;
  DeserializationError parseError;

  if (WiFi.status() != WL_CONNECTED)
  {
    return;
  }

  HTTPClient http;
  WiFiClient client;
  bool connected = false;
  int maxAttempt = 3; // retry attempt
  int attempt = 0;
  while (!connected && attempt < maxAttempt)
  {
    if (http.begin(client, "http://" + host + ":" + String(port) + "/app/deviceLogin"))
    {
      http.addHeader("Content-Type", "application/json");
      http.addHeader("Accept", "application/json");
      // http.addHeader("User-Agent", "ESP8266HTTPClient/1.0 (esp8266; esp8266)");
      httpResponseCode = http.POST("{\"userMail\":\"" + email + "\", \"userPass\":\"" + password + "\", \"deviceId\":\"" + WiFi.macAddress() + "\"}");
      if (httpResponseCode > 0)
      {
        Serial.println(http.getString());
        parseError = deserializeJson(httpData, http.getString());
        // response recieved and begin webSocket
        connected = true;
        initWebSocket(httpData["path"].as<String>(), httpData["token"].as<String>());
      }
      else
      {
        // response recived with error
        Serial.println("HTTP Response code: ");
        Serial.println(httpResponseCode);
      }
      http.end();
    }
    else
    {
      Serial.printf("[HTTPS] Unable to connect\n");
    }
    delay(3000);
    attempt++;
  }
  if (!connected)
  {
    Serial.println("Failed to establish connection after maximum attempts");
  }
}

void initWebSocket(String WSPath, String WSHeaderToken)
{

  webSocket.begin(host, port, WSPath);
  Serial.println("Connected to url: ");
  Serial.println(String(host) + ":" + String(port) + String(WSPath));
  webSocket.onEvent(webSocketEvent);
  webSocket.setExtraHeaders(WSHeaderToken.c_str());
  webSocket.setReconnectInterval(WSReconInterval);
}

void setup()
{
  // put your setup code here, to run once:
  pinMode(BUILTIN_LED, OUTPUT);
  // digitalWrite(LED_BUILTIN, LOW);
  Serial.begin(9600);
  initWifi();
  initHTTP();
}

void loop()
{
  // put your main code here, to run repeatedly:
  if (httpResponseCode > 0)
  {
    webSocket.loop();
  }
  unsigned long currentMillis = millis();
  if (currentMillis - lastMsgTime >= interval)
  {
    handleSentMsgActivity();     // Panggil fungsi untuk mengirim pesan
    lastMsgTime = currentMillis; // Perbarui waktu terakhir pesan dikirim
  }
}