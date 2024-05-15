#ifndef CONNECTIONSET_H
#define CONNECTIONSET_H
#include <ESP8266WiFi.h>
#include <Arduino.h>
#include <ArduinoJson.h>
#include "connectionState.h"
extern connectionState connState;
void initConnection(const char *ssid, const char *wifiPassword, String email, String password, String host, int port);

#endif