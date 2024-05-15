#ifndef CONNECTIONSTATE_H
#define CONNECTIONSTATE_H
#include <Arduino.h>

class connectionState
{
private:
    int httpResponseCode;
    String httpPayload;

public:
    void setHttpPayload(String value);
    String getHttpPayload();
    void setHttpResponseCode(int value);
    int getHttpResponseCode();
};

#endif