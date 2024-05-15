#ifndef HTTPMANAGER_H
#define HTTPMANAGER_H
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>

void initHTTP(String host, int port, String email, String password, String wifiMac);

#endif