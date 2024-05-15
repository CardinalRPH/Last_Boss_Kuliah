#include "connectionState.h"

void connectionState::setHttpPayload(String value) {
    httpPayload = value;
}

void connectionState::setHttpResponseCode(int value) {
    httpResponseCode = value;
}

int connectionState::getHttpResponseCode() {
    return httpResponseCode;
}

String connectionState::getHttpPayload() {
    return httpPayload;
}