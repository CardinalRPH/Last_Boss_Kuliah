#ifndef OUTPUTDEV_H
#define OUTPUTDEV_H
#include <Arduino.h>

class outputDev
{
private:
    byte buzzerPin;
    byte relayPin;

public:
    void setupOutputPin(byte buzzer_pin, byte relay_pin);
    void buzzerRinger(int ringTimes);
    void relaySwitchOn();
    void relaySwitchOff();
};

#endif