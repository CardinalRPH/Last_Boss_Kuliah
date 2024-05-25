#include "sensorReader.h"
#include "noBlockDelay.h"

float durationUltra;
float distanceUltra;
float readValSoil1;
float readValSoil2;
int readValLight;


bool sensorReader::isRaining()
{
    int rainState = digitalRead(rainPin);

    if (rainState == HIGH)
    {
        return true;
    }
    return false;
}

float sensorReader::readSoil1()
{
    // delay(100);
    nonBlockingDelay(100);
    digitalWrite(lightPin, LOW);
    digitalWrite(soilPin2, LOW);
    digitalWrite(soilPin1, HIGH);
    nonBlockingDelay(100);
    // return in percentage
    readValSoil1 = 100.00 - ((analogRead(analogPin) / 1023.00) * 100.00);
    digitalWrite(soilPin1, LOW);
    return readValSoil1;
}

float sensorReader::readSoil2()
{
    // delay(100);
    nonBlockingDelay(100);
    digitalWrite(lightPin, LOW);
    digitalWrite(soilPin1, LOW);
    digitalWrite(soilPin2, HIGH);
    nonBlockingDelay(100);
    // return in percentage
    readValSoil2 = 100.00 - ((analogRead(analogPin) / 1023.00) * 100.00);
    digitalWrite(soilPin2, LOW);
    return readValSoil2;
}

int sensorReader::readTankValue()
{
    digitalWrite(trigPin, LOW);
    nonBlockingDelay(2);
    digitalWrite(trigPin, HIGH);
    nonBlockingDelay(20);
    digitalWrite(trigPin, LOW);

    durationUltra = pulseIn(echoPin, HIGH);
    // read in cm
    distanceUltra = ((durationUltra / 2) * 0.343) / 10;
    // read in percentage
    int percentage = (1 - (distanceUltra / emptyTankCm)) * 100;
    return percentage;
}

float sensorReader::readLightValue()
{
    nonBlockingDelay(100);
    digitalWrite(soilPin1, LOW);
    digitalWrite(soilPin2, LOW);
    digitalWrite(lightPin, HIGH);
    nonBlockingDelay(500);
    readValLight = analogRead(analogPin);
    digitalWrite(lightPin, LOW);
    return readValLight;
}

void sensorReader::setupSensorPin(byte rain_pin, byte soil_pin_1, byte soil_pin_2, byte trig_pin, byte echo_pin, byte light_pin, byte analog_pin)
{
    rainPin = rain_pin;
    soilPin1 = soil_pin_1;
    soilPin2 = soil_pin_2;
    trigPin = trig_pin;
    echoPin = echo_pin;
    lightPin = light_pin;
    analogPin = analog_pin;

    pinMode(rainPin, INPUT);
    pinMode(soilPin1, OUTPUT);
    pinMode(soilPin2, OUTPUT);
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);
    pinMode(lightPin, OUTPUT);
}

void sensorReader::setupTankValue(int empty_tank_cm, int full_tank_cm)
{
    emptyTankCm = empty_tank_cm;
    fullTankCm = full_tank_cm;
}