#ifndef WATERINGHANDLER_H
#define WATERINGHANDLER_H
#include <Arduino.h>

class wateringHandler
{
private:
    bool isWatering = false;
    int waterTime = 0;
    bool isManual = false;

public:
    void setWatering(bool state, int wTime);
    bool getWatering();
};

#endif