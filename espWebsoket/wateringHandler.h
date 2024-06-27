#ifndef WATERINGHANDLER_H
#define WATERINGHANDLER_H
#include <Arduino.h>

class wateringHandler
{
private:
    bool isWatering;
    int waterTime;
    bool isManual;

public:
    void setWatering(bool state, int wTime);
    bool getWatering();
    int getWateringTime();
};

#endif