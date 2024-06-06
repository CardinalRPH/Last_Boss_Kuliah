#include "sensorReader.h"
#include "wsManager.h"
#include "sentMsgHandler.h"
#include "connectionSet.h"
#include "time.h"
#include "fuzzyLogic.h"
// #include "wateringHandler.h"

// Wifi Setup
const char *ssid = "PARZ!VAL X";
const char *wifiPassword = "batusarino1";

// User Account
const String email = "koneksigagal63@gmail.com";
const String password = "koneksigagal63";

// insert Host and port
const String host = "192.168.1.11";
const int port = 5000;

// setup pin use GPIO
#define LIGHT_PIN 5    // D1
#define ULTRA_TRIG 0   // D3
#define ULTRA_ECHO 2   // D4
#define RELAY_PIN 12   // D6
#define RAIN_PIN_DO 14 // D5
#define SOIL_PIN_1 13  // D7
#define SOIL_PIN_2 15  // D8

#define ANALOG_PIN A0 // Analog
#define BUZZ_PIN 16   // D0

// setup Time
int timeZone = 7 * 3600;
int dst = 0;

// Setup ultrasonic tank distance in cm
int emptyTankDistance = 23;
int fullTankDistance = 5;

unsigned long lastFuzzyTime = 0;
const unsigned long fuzzyInterval = 5400000;
unsigned long lastMsgTime = 0;
const unsigned long interval = 5000; // interval for sending message
int hours = 0;
fuzzyLogic fyLogic;
sensorReader snReader;
// wateringHandler waterHandler;
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

  pinMode(BUILTIN_LED, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);

  // setup pin and value
  snReader.setupSensorPin(RAIN_PIN_DO, SOIL_PIN_1, SOIL_PIN_2, ULTRA_TRIG, ULTRA_ECHO, LIGHT_PIN, ANALOG_PIN);
  snReader.setupTankValue(emptyTankDistance, fullTankDistance);
  outDevConn.setupOutputPin(BUZZ_PIN, RELAY_PIN);
  // fuzzy declaration
  fyLogic.initFuzzy();
  fyLogic.implementFuzzyRules();
}

void loop()
{

  if (connState.getHttpResponseCode() > 0)
  {
    wsLoop();
    // get current tiime
    time_t now = time(nullptr);
    struct tm *p_tm = localtime(&now);
    // get current hour
    hours = p_tm->tm_hour;
  }

  unsigned long currentMillis = millis();
  // Serial.println(hours);
  if (hours >= 5 && hours <= 19 && snReader.isRaining() ==false && snReader.readTankValue() >= 30)
  {
    if (currentMillis - lastFuzzyTime >= fuzzyInterval)
    {
      float soilMean = (snReader.readSoil1() + snReader.readSoil2()) / 2;
      // handle fuzzy logic
      int pumpSecond = fyLogic.getResult(soilMean, snReader.readLightValue());
      if (pumpSecond > 0)
      {
        int pumpMiliSecond = pumpSecond * 1000;
        Serial.println(pumpMiliSecond);
        waterHandler.setWatering(true, pumpMiliSecond);
      }
      // end of fuzzy
      lastFuzzyTime = currentMillis;
    }
  }
  if (currentMillis - lastMsgTime >= interval)
  {
    if (connState.getWSConnected() == true)
    {
      // Serial.println(snReader.readSoil1());
      handleSentMsgActivity(waterHandler.getWatering(), snReader.readSoil1(), snReader.readSoil2(), snReader.readTankValue(), snReader.readLightValue(), snReader.isRaining()); // Panggil fungsi untuk mengirim pesan
    }
    lastMsgTime = currentMillis; // Perbarui waktu terakhir pesan dikirim
  }
}
