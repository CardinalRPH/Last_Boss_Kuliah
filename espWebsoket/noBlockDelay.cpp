#include "noBlockDelay.h"

void nonBlockingDelay(unsigned long delayMillis)
{
    unsigned long startMillis = millis();
    while (millis() - startMillis < delayMillis)
    {
    }
}