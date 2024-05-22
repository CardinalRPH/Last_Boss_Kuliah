#ifndef WSMANAGER_H
#define WSMANAGER_H
#include <Arduino.h>
#include <WebSocketsClient.h>
#include <ArduinoJson.h>

const int WSReconInterval = 5000;

void initWebSocket(String WSPath, int port, String host);
void wsSentMsg(String message);
void wsLoop();

#endif