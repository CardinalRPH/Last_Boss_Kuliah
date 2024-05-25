#include "fuzzyLogic.h"

void fuzzyLogic::initFuzzy()
{
    // init Fuzzy Input Soil
    FuzzyInput *soil = new FuzzyInput(1);
    soil->addFuzzySet(wetSoil);
    soil->addFuzzySet(mediumSoil);
    soil->addFuzzySet(drySoil);
    fuzzy->addFuzzyInput(soil);

    // init Fuzzy Input LDR
    FuzzyInput *ldr = new FuzzyInput(2);
    ldr->addFuzzySet(lowLight);
    ldr->addFuzzySet(mediumLight);
    ldr->addFuzzySet(highLight);
    fuzzy->addFuzzyInput(ldr);

    // init Fuzzy Output Pump
    FuzzyOutput *pumpOut = new FuzzyOutput(1);
    pumpOut->addFuzzySet(pumpOff);
    pumpOut->addFuzzySet(minPump);
    pumpOut->addFuzzySet(maxPump);
    fuzzy->addFuzzyOutput(pumpOut);
}

void fuzzyLogic::implementFuzzyRules()
{
    // input 1
  FuzzyRuleAntecedent *if_wet_low = new FuzzyRuleAntecedent();
  if_wet_low->joinWithAND(wetSoil, lowLight);

  // output 1
  FuzzyRuleConsequent *then_off1 = new FuzzyRuleConsequent();
  then_off1->addOutput(pumpOff);

  // init rule 1
  FuzzyRule *fuzzyRule1 = new FuzzyRule(1, if_wet_low, then_off1);
  fuzzy->addFuzzyRule(fuzzyRule1);
  // end 1
  // input 2
  FuzzyRuleAntecedent *if_wet_medium = new FuzzyRuleAntecedent();
  if_wet_medium->joinWithAND(wetSoil, mediumLight);

  // output 2
  FuzzyRuleConsequent *then_off2 = new FuzzyRuleConsequent();
  then_off2->addOutput(pumpOff);

  // init rule 2
  FuzzyRule *fuzzyRule2 = new FuzzyRule(2, if_wet_medium, then_off2);
  fuzzy->addFuzzyRule(fuzzyRule2);
  // end 2
  // input 3
  FuzzyRuleAntecedent *if_wet_high = new FuzzyRuleAntecedent();
  if_wet_high->joinWithAND(wetSoil, highLight);

  // output 3
  FuzzyRuleConsequent *then_off3 = new FuzzyRuleConsequent();
  then_off3->addOutput(pumpOff);

  // init rule 3
  FuzzyRule *fuzzyRule3 = new FuzzyRule(3, if_wet_high, then_off3);
  fuzzy->addFuzzyRule(fuzzyRule3);
  // end 3
  // input 4
  FuzzyRuleAntecedent *if_medium_low = new FuzzyRuleAntecedent();
  if_medium_low->joinWithAND(mediumSoil, lowLight);

  // output 4
  FuzzyRuleConsequent *then_min4 = new FuzzyRuleConsequent();
  then_min4->addOutput(minPump);

  // init rule 4
  FuzzyRule *fuzzyRule4 = new FuzzyRule(4, if_medium_low, then_min4);
  fuzzy->addFuzzyRule(fuzzyRule4);
  // end 4
  // input 5
  FuzzyRuleAntecedent *if_medium_medium = new FuzzyRuleAntecedent();
  if_medium_medium->joinWithAND(mediumSoil, mediumLight);

  // output 5
  FuzzyRuleConsequent *then_min5 = new FuzzyRuleConsequent();
  then_min4->addOutput(minPump);

  // init rule 5
  FuzzyRule *fuzzyRule5 = new FuzzyRule(5, if_medium_medium, then_min5);
  fuzzy->addFuzzyRule(fuzzyRule5);
  // end 5
  // input 6
  FuzzyRuleAntecedent *if_medium_high = new FuzzyRuleAntecedent();
  if_medium_high->joinWithAND(mediumSoil, highLight);

  // output 6
  FuzzyRuleConsequent *then_off6 = new FuzzyRuleConsequent();
  then_off6->addOutput(pumpOff);

  // init rule 6
  FuzzyRule *fuzzyRule6 = new FuzzyRule(6, if_medium_high, then_off6);
  fuzzy->addFuzzyRule(fuzzyRule6);
  // end 6
  // input 7
  FuzzyRuleAntecedent *if_dry_low = new FuzzyRuleAntecedent();
  if_dry_low->joinWithAND(drySoil, lowLight);

  // output 7
  FuzzyRuleConsequent *then_max7 = new FuzzyRuleConsequent();
  then_max7->addOutput(maxPump);

  // init rule 7
  FuzzyRule *fuzzyRule7 = new FuzzyRule(7, if_dry_low, then_max7);
  fuzzy->addFuzzyRule(fuzzyRule7);
  // end 7
  // input 8
  FuzzyRuleAntecedent *if_dry_medium = new FuzzyRuleAntecedent();
  if_dry_medium->joinWithAND(drySoil, mediumLight);

  // output 8
  FuzzyRuleConsequent *then_max8 = new FuzzyRuleConsequent();
  then_max8->addOutput(maxPump);

  // init rule 8
  FuzzyRule *fuzzyRule8 = new FuzzyRule(8, if_dry_medium, then_max8);
  fuzzy->addFuzzyRule(fuzzyRule8);
  // end 8
  // input 9
  FuzzyRuleAntecedent *if_dry_high = new FuzzyRuleAntecedent();
  if_dry_high->joinWithAND(drySoil, highLight);

  // output 9
  FuzzyRuleConsequent *then_min9 = new FuzzyRuleConsequent();
  then_min9->addOutput(minPump);

  // init rule 9
  FuzzyRule *fuzzyRule9 = new FuzzyRule(9, if_dry_high, then_min9);
  fuzzy->addFuzzyRule(fuzzyRule9);
}

int fuzzyLogic::getResult(float soilInput, float ldrInput)
{
    fuzzy->setInput(1, soilInput);
    fuzzy->setInput(2, ldrInput);

    fuzzy->fuzzify();

    float resultFuzzy = fuzzy->defuzzify(1);
    int roundedRes = round(resultFuzzy);
    return roundedRes;
}