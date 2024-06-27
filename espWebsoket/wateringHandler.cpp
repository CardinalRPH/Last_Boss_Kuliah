#include "wateringHandler.h"
#include "connectionSet.h"

unsigned long previousMillis = 0;

void wateringHandler::setWatering(bool manual, int wTime)
{
    isManual = manual;
    waterTime = wTime;
}

bool wateringHandler::getWatering()
{
    if (isManual)
    {
        // Do watering here
        unsigned long currentMillis = millis();
        Serial.println("Watering started");
        isWatering = true;
        isManual = false;
        outDevConn.relaySwitchOn();
        previousMillis = currentMillis;
    }

    if (isWatering)
    {
        unsigned long currentMillis = millis();
        // check is watering time finished
        if (currentMillis - previousMillis >= waterTime)
        {
            outDevConn.relaySwitchOff();
            Serial.println("Watering finished");
            waterTime = 0;
            isWatering = false;
        }
        return true;
    }
    return false;
}

int wateringHandler::getWateringTime() {
    return waterTime;
}