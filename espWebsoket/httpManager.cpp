#include "httpManager.h"
#include "connectionSet.h"
// #include "connectionState.h"

// connectionState connState;
void initHTTP(String host, int port, String email, String password, String wifiMac)
{
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
      connState.setHttpResponseCode(http.POST("{\"userMail\":\"" + email + "\", \"userPass\":\"" + password + "\", \"deviceId\":\"" + wifiMac + "\"}"));
      if (connState.getHttpResponseCode() > 0)
      {
        // response recieved and begin webSocket
        connected = true;
        connState.setHttpPayload(http.getString());
      }
      else
      {
        // response recived with error
        Serial.println("HTTP Response code: ");
        Serial.println(connState.getHttpResponseCode());
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
    connState.setHttpPayload("");
    Serial.println("Failed to establish connection after maximum attempts");
  }
}