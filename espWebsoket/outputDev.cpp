#include "outputDev.h"
#include "noBlockDelay.h"

void outputDev::setupOutputPin(byte buzzer_pin, byte relay_pin)
{
    buzzerPin = buzzer_pin;
    relayPin = relay_pin;
    pinMode(buzzerPin, OUTPUT);
    pinMode(relayPin, OUTPUT);
}

void outputDev::buzzerRinger(int ringTimes)
{
    for (int i = 0; i < ringTimes; i++)
    {
        digitalWrite(buzzerPin, HIGH);
        nonBlockingDelay(500);
        digitalWrite(buzzerPin, LOW);
        nonBlockingDelay(200);
    }
}

void outputDev::relaySwitch(int millisecond)
{
    digitalWrite(relayPin, HIGH);
    nonBlockingDelay(millisecond);
    digitalWrite(relayPin, LOW);
}