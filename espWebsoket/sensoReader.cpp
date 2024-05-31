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
        return false;
    }
    return true;
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
    readValSoil1 = analogRead(analogPin);
    digitalWrite(soilPin1, LOW);
    // Serial.println(readValSoil1);
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
    readValSoil2 = analogRead(analogPin);
    digitalWrite(soilPin2, LOW);
    // Serial.println(readValSoil2);
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
    int percentage = 100 - ((distanceUltra - fullTankCm) / (emptyTankCm - fullTankCm)) * 100;
    // Serial.println(percentage);
    if (percentage < 0)
    {
        percentage = 0;
    }
    else if (percentage > 100)
    {
        percentage = 100;
    }
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
    // Serial.println(readValLight);
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