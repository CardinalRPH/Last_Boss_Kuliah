#ifndef SENSORREADER_H
#define SENSORREADER_H
#include <Arduino.h>

class sensorReader
{
private:
    byte rainPin;
    byte soilPin1;
    byte soilPin2;
    byte trigPin;
    byte echoPin;
    byte lightPin;
    byte analogPin;
    int emptyTankCm;
    int fullTankCm;

public:
    bool isRaining();
    float readSoil1();
    float readSoil2();
    int readTankValue();
    float readLightValue();
    void setupSensorPin(byte rain_pin, byte soil_pin_1, byte soil_pin_2, byte trig_pin, byte echo_pin, byte light_pin, byte analog_pin);
    void setupTankValue(int empty_tank_cm, int full_tank_cm);
};

#endif