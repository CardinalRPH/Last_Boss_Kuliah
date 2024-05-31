#ifndef CONNECTIONSET_H
#define CONNECTIONSET_H
#include <ESP8266WiFi.h>
#include <Arduino.h>
#include <ArduinoJson.h>
#include "connectionState.h"
#include "wateringHandler.h"
#include "outputDev.h"
extern connectionState connState;
extern wateringHandler waterHandler;
extern outputDev outDevConn;
void initConnection(const char *ssid, const char *wifiPassword, String email, String password, String host, int port);

#endif