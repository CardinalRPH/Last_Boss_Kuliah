#ifndef SENTMSGHANDLER_H
#define SENTMSGHANDLER_H
#include <Arduino.h>

void handleSentMsgActivity(bool waterEvent, float readSoil1, float readSoil2, int readTankValue, float readLightValue, bool isRaining);

#endif