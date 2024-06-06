#ifndef FUZZYLOGIC_H
#define FUZZYLOGIC_H
#include <Fuzzy.h>
#include <Arduino.h>
class fuzzyLogic
{
private:
    Fuzzy *fuzzy = new Fuzzy();

    // set Soil
    FuzzySet *wetSoil = new FuzzySet(0, 0, 400, 550);
    FuzzySet *mediumSoil = new FuzzySet(400, 550, 550, 700);
    FuzzySet *drySoil = new FuzzySet(550, 700, 1024, 1024);

    // set LDR
    FuzzySet *lowLight = new FuzzySet(0, 0, 600, 755);
    FuzzySet *mediumLight = new FuzzySet(600, 755, 755, 910);
    FuzzySet *highLight = new FuzzySet(755, 910, 1024, 1024);

    // set Output Pump
    FuzzySet *pumpOff = new FuzzySet(0, 0, 0, 0);
    FuzzySet *minPump = new FuzzySet(0, 1, 37, 74);
    FuzzySet *maxPump = new FuzzySet(37, 74, 74, 74);

public:
    void initFuzzy();
    void implementFuzzyRules();
    int getResult(float soilInput, float ldrInput);
};

#endif