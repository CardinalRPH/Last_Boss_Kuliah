#ifndef CONNECTIONSTATE_H
#define CONNECTIONSTATE_H
#include <Arduino.h>

class connectionState
{
private:
    int httpResponseCode;
    String httpPayload;
    bool wsConnected;

public:
    void setHttpPayload(String value);
    String getHttpPayload();
    void setHttpResponseCode(int value);
    int getHttpResponseCode();
    void setWSConnected(bool value);
    bool getWSConnected();
};

#endif