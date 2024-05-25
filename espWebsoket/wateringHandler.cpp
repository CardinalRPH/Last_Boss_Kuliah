#include "wateringHandler.h"
#include "outputDev.h"

unsigned long previousMillis = 0;
outputDev otDev;

void wateringHandler::setWatering(bool manual, int wTime)
{
    isManual = manual;
    waterTime = wTime;
}

bool wateringHandler::getWatering()
{
    if (isManual)
    {
       //Do watering here
        unsigned long currentMillis = millis();
        Serial.println("Watering started");
        isWatering = true;
        otDev.relaySwitch(waterTime);
        previousMillis = currentMillis;
    }

    if (isWatering)
    {
        unsigned long currentMillis = millis();
        //check is watering time finished
        if (currentMillis - previousMillis >= waterTime)
        {
            Serial.println("Watering finished");
            waterTime = 0;
            isWatering = false;
        }
        return true;
    }
    return false;
}