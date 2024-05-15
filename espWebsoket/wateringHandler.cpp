#include "wateringHandler.h"

bool isWatering = false;
unsigned long previousMillis = 0;
const unsigned long interval = 1000;

bool handleWatering(bool manual)
{
    if (manual)
    {
        // Jalankan penyiraman manual di sini, seperti menyalakan relay atau yang serupa
        unsigned long currentMillis = millis();
        Serial.println("Manual watering started");
        isWatering = true;
        digitalWrite(BUILTIN_LED, HIGH);
        previousMillis = currentMillis; // Tetapkan previousMillis saat ini
    }

    // Periksa apakah masih dalam proses penyiraman
    if (isWatering)
    {
        unsigned long currentMillis = millis();
        // Periksa apakah sudah mencapai interval penyiraman yang diinginkan
        if (currentMillis - previousMillis >= interval)
        {
            Serial.println("Watering finished");
            digitalWrite(BUILTIN_LED, LOW);
            isWatering = false;
        }
        return true;
    }

    // Periksa kondisi tanah dan lakukan penyiraman jika diperlukan
    // Lakukan pengecekan dan pengiriman ke server di sini
    return false;
}