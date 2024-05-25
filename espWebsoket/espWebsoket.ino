#include "sensorReader.h"
#include "wsManager.h"
#include "sentMsgHandler.h"
#include "connectionSet.h"
#include "outputDev.h"
#include "time.h"
#include "fuzzyLogic.h"
#include "wateringHandler.h"

// Wifi Setup
const char *ssid = "PARZ!VAL X";
const char *wifiPassword = "batusarino1";

// User Account
const String email = "example@mail.com";
const String password = "secret";

// insert Host and port
const String host = "192.168.1.12";
const int port = 5000;

// setup pin use GPIO
#define LIGHT_PIN 5    // D1
#define ULTRA_TRIG 0   // D3
#define ULTRA_ECHO 2   // D4
#define RELAY_PIN 14   // D5
#define RAIN_PIN_DO 12 // D6
#define SOIL_PIN_1 13  // D7
#define SOIL_PIN_2 15  // D8

#define ANALOG_PIN A0 // Analog
#define BUZZ_PIN 16   // D0

// setup Time
int timeZone = 7 * 3600;
int dst = 0;

// Setup ultrasonic tank distance in cm
int emptyTankDistance = 70;
int fullTankDistance = 30;

unsigned long lastFuzzyTime = 0;
const unsigned long fuzzyInterval = 5400000;
unsigned long lastMsgTime = 0;
const unsigned long interval = 2000; // interval for sending message
fuzzyLogic fyLogic;
sensorReader snReader;
outputDev outDev;
wateringHandler waterHandler;
void setup()
{
  // put your setup code here, to run once:
  Serial.begin(9600);
  // setup Connection
  initConnection(ssid, wifiPassword, email, password, host, port);
  if (connState.getHttpResponseCode() > 0)
  {
    configTime(timeZone, dst, "pool.ntp.org", "time.nist.gov");
  }

  // pinMode(BUILTIN_LED, OUTPUT);
  // setup pin and value
  snReader.setupSensorPin(RAIN_PIN_DO, SOIL_PIN_1, SOIL_PIN_2, ULTRA_TRIG, ULTRA_ECHO, LIGHT_PIN, ANALOG_PIN);
  snReader.setupTankValue(emptyTankDistance, fullTankDistance);
  outDev.setupOutputPin(BUZZ_PIN, RELAY_PIN);
  // fuzzy declaration
  fyLogic.initFuzzy();
  fyLogic.implementFuzzyRules();

  // digitalWrite(LED_BUILTIN, LOW);
}

void loop()
{
  // put your main code here, to run repeatedly:
  if (connState.getHttpResponseCode() > 0)
  {
    wsLoop();
  }
  unsigned long currentMillis = millis();
  if (currentMillis - lastFuzzyTime >= fuzzyInterval)
  {
    // get current tiime
    time_t now = time(nullptr);
    struct tm *p_tm = localtime(&now);
    // get current hour
    int hours = p_tm->tm_hour || 0;
    bool isRain = snReader.isRaining();
    int waterTankVl = snReader.readTankValue();
    float soilTop = snReader.readSoil1();
    float soilBot = snReader.readSoil2();
    float lightVal = snReader.readLightValue();
    float soilMean = (soilTop + soilBot) / 2;

    if (hours >= 5 && hours <= 19 && !isRain && waterTankVl >= 30)
    {
      // handle fuzzy logic
      int pumpSecond = fyLogic.getResult(soilMean, lightVal);
      if (pumpSecond > 0)
      {
        int pumpMiliSecond = pumpSecond * 1000;
        waterHandler.setWatering(true, pumpMiliSecond);
      }
      // end of fuzzy
    }
    lastFuzzyTime = currentMillis;
  }
  if (currentMillis - lastMsgTime >= interval)
  {
    if (connState.getHttpResponseCode() > 0)
    {
      handleSentMsgActivity(); // Panggil fungsi untuk mengirim pesan
    }
    lastMsgTime = currentMillis; // Perbarui waktu terakhir pesan dikirim
  }
}
