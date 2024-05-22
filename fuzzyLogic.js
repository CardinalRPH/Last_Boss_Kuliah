const LDR = 0
const soil = 0
const water = 100
const isRain = 0

//input memberFunc
const soilBasah = (v) => {
    if (v <= 400) return 1;
    if (v > 400 && v <= 550) return (550 - v) / (550 - 400)
    return 0
}

const soilLembap = (v) => {
    if (v > 400 && v < 550) return (550 - v) / (550 - 400)
    if (v > 550 && v <= 700) return (700 - v) / (700 - 550)
    return 0
}

const soilKering = (v) => {
    if (v > 550 && v < 700) return (700 - v) / (700 - 550)
    if (v >= 700) return 1
    return 0
}

const isRainTrue = (v) => {
    if (v <= 1) return 1 * v
    return 0
}

const isRainFalse = (v) => {
    if (v <= 1) return 1 * v
    return 0
}

const tankBad = (v) => {
    if(v<=10) return 1
    if (v > 10 && v <= 30) return (30 - v) / (30 - 10)
    return 0;
}

const tankOk = (v) => {
    if (v > 10 && v < 30) return (30 - v) / (30 - 10)
    if (v => 30) return 1
    return 0
}

const LDRMalam = (v) => {
    if (v <= 110) return 1
    if (v > 110 && v <= 255) return (255 - v) / (255 - 110)
    return 0
}

const LDRPagi = (v) => {
    if (v > 110 && v < 255) return (255 - v) / (255 - 110)
    if (v > 255 && v <= 305) return (305 - v) / (305 - 255)
    return 0
}

const LDRSore = (v) => {
    if (v > 255 && v < 305) return (305 - v) / (305 - 255)
    if (v > 305 && v <= 500) return (500 - v) / (500 - 305)
    return 0
}

const LDRSiang = (v) => {
    if (v > 305 && v < 500) return (500 - v) / (500 - 305)
    if (v >= 500) return 1
    return 0
}


//output memberFunc
const pumpOff = (v) => {
    if (v <1) return 1 * v
    return 0
}

const pumpMinimal = (v) => {
    if (v > 37 && v <= 74 && v>=1) return (74 - v) / (74 - 37)
    return 0
}

const pumpMaksimal = (v) => {
    if (v > 37 && v < 74 && v >= 1) return (74 - v) / (74 - 37)
    return 0
}

//init
const soilB = soilBasah(soil)
const soilL = soilLembap(soil)
const soilK = soilKering(soil)

const rainT = isRainTrue(isRain)
const rainF = isRainFalse(isRain)

const t_bad = tankBad(water)
const t_ok = tankBad(water)

const ldr_p = LDRPagi(LDR)
const ldr_sg = LDRSiang(LDR)
const ldr_sr = LDRSore(LDR)
const ldr_m = LDRMalam(LDR)

const clipping_pumpOff = (sr, pumpOffVal) => {
   return Math.min(sr, pumpOff(pumpOffVal))
}

const clipping_pumpMinimal = (sr, pumpMinVal) => {
    return Math.min(sr, pumpOff(pumpMinVal))
}

const clipping_pumpMaksimal = (sr, pumpMaksVal) => {
    return Math.min(sr, pumpOff(pumpMaksVal))
}

//rules

const fuzzyRules = [
    { soil: soilKering, isRain: isRainFalse, tank: tankOk, waktu: LDRPagi, pump: clipping_pumpMaksimal },
    { soil: soilKering, isRain: isRainFalse, tank: tankOk, waktu: LDRSiang, pump: clipping_pumpMinimal },
    { soil: soilKering, isRain: isRainFalse, tank: tankOk, waktu: LDRSore, pump: clipping_pumpMaksimal },
    { soil: soilKering, isRain: isRainFalse, tank: tankOk, waktu: LDRMalam, pump: clipping_pumpOff },
    { soil: soilKering, isRain: isRainFalse, tank: tankBad, waktu: LDRPagi, pump: clipping_pumpOff },
    { soil: soilKering, isRain: isRainFalse, tank: tankBad, waktu: LDRSiang, pump: clipping_pumpOff },
    { soil: soilKering, isRain: isRainFalse, tank: tankBad, waktu: LDRSore, pump: clipping_pumpOff },
    { soil: soilKering, isRain: isRainFalse, tank: tankBad, waktu: LDRMalam, pump: clipping_pumpOff },
    { soil: soilKering, isRain: isRainTrue, tank: tankOk, waktu: LDRPagi, pump: clipping_pumpOff },
    { soil: soilKering, isRain: isRainTrue, tank: tankOk, waktu: LDRSiang, pump: clipping_pumpOff },
    { soil: soilKering, isRain: isRainTrue, tank: tankOk, waktu: LDRSore, pump: clipping_pumpOff },
    { soil: soilKering, isRain: isRainTrue, tank: tankOk, waktu: LDRMalam, pump: clipping_pumpOff },
    { soil: soilKering, isRain: isRainTrue, tank: tankBad, waktu: LDRPagi, pump: clipping_pumpOff },
    { soil: soilKering, isRain: isRainTrue, tank: tankBad, waktu: LDRSiang, pump: clipping_pumpOff },
    { soil: soilKering, isRain: isRainTrue, tank: tankBad, waktu: LDRSore, pump: clipping_pumpOff },
    { soil: soilKering, isRain: isRainTrue, tank: tankBad, waktu: LDRMalam, pump: clipping_pumpOff },
    { soil: soilLembap, isRain: isRainFalse, tank: tankOk, waktu: LDRPagi, pump: clipping_pumpMinimal },
    { soil: soilLembap, isRain: isRainFalse, tank: tankOk, waktu: LDRSiang, pump: clipping_pumpMinimal },
    { soil: soilLembap, isRain: isRainFalse, tank: tankOk, waktu: LDRSore, pump: clipping_pumpMinimal },
    { soil: soilLembap, isRain: isRainFalse, tank: tankOk, waktu: LDRMalam, pump: clipping_pumpOff },
    { soil: soilLembap, isRain: isRainFalse, tank: tankBad, waktu: LDRPagi, pump: clipping_pumpOff },
    { soil: soilLembap, isRain: isRainFalse, tank: tankBad, waktu: LDRSiang, pump: clipping_pumpOff },
    { soil: soilLembap, isRain: isRainFalse, tank: tankBad, waktu: LDRSore, pump: clipping_pumpOff },
    { soil: soilLembap, isRain: isRainFalse, tank: tankBad, waktu: LDRMalam, pump: clipping_pumpOff },
    { soil: soilLembap, isRain: isRainTrue, tank: tankOk, waktu: LDRPagi, pump: clipping_pumpOff },
    { soil: soilLembap, isRain: isRainTrue, tank: tankOk, waktu: LDRSiang, pump: clipping_pumpOff },
    { soil: soilLembap, isRain: isRainTrue, tank: tankOk, waktu: LDRSore, pump: clipping_pumpOff },
    { soil: soilLembap, isRain: isRainTrue, tank: tankOk, waktu: LDRMalam, pump: clipping_pumpOff },
    { soil: soilLembap, isRain: isRainTrue, tank: tankBad, waktu: LDRPagi, pump: clipping_pumpOff },
    { soil: soilLembap, isRain: isRainTrue, tank: tankBad, waktu: LDRSiang, pump: clipping_pumpOff },
    { soil: soilLembap, isRain: isRainTrue, tank: tankBad, waktu: LDRSore, pump: clipping_pumpOff },
    { soil: soilLembap, isRain: isRainTrue, tank: tankBad, waktu: LDRMalam, pump: clipping_pumpOff },
    { soil: soilBasah, isRain: isRainFalse, tank: tankOk, waktu: LDRPagi, pump: clipping_pumpOff },
    { soil: soilBasah, isRain: isRainFalse, tank: tankOk, waktu: LDRSiang, pump: clipping_pumpOff },
    { soil: soilBasah, isRain: isRainFalse, tank: tankOk, waktu: LDRSore, pump: clipping_pumpOff },
    { soil: soilBasah, isRain: isRainFalse, tank: tankOk, waktu: LDRMalam, pump: clipping_pumpOff },
    { soil: soilBasah, isRain: isRainFalse, tank: tankBad, waktu: LDRPagi, pump: clipping_pumpOff },
    { soil: soilBasah, isRain: isRainFalse, tank: tankBad, waktu: LDRSiang, pump: clipping_pumpOff },
    { soil: soilBasah, isRain: isRainFalse, tank: tankBad, waktu: LDRSore, pump: clipping_pumpOff },
    { soil: soilBasah, isRain: isRainFalse, tank: tankBad, waktu: LDRMalam, pump: clipping_pumpOff },
    { soil: soilBasah, isRain: isRainTrue, tank: tankOk, waktu: LDRPagi, pump: clipping_pumpOff },
    { soil: soilBasah, isRain: isRainTrue, tank: tankOk, waktu: LDRSiang, pump: clipping_pumpOff },
    { soil: soilBasah, isRain: isRainTrue, tank: tankOk, waktu: LDRSore, pump: clipping_pumpOff },
    { soil: soilBasah, isRain: isRainTrue, tank: tankOk, waktu: LDRMalam, pump: clipping_pumpOff },
    { soil: soilBasah, isRain: isRainTrue, tank: tankBad, waktu: LDRPagi, pump: clipping_pumpOff },
    { soil: soilBasah, isRain: isRainTrue, tank: tankBad, waktu: LDRSiang, pump: clipping_pumpOff },
    { soil: soilBasah, isRain: isRainTrue, tank: tankBad, waktu: LDRSore, pump: clipping_pumpOff },
    { soil: soilBasah, isRain: isRainTrue, tank: tankBad, waktu: LDRMalam, pump: clipping_pumpOff }
];

const SR = fuzzyRules.map((key, index) => {
    const SRn = Math.min(key.soil(soil), key.isRain(isRain), key.tank(water), key.waktu(LDR))
    return SRn
})

const pump_result = (pumpVal) => {
    const clipping = fuzzyRules.map((data, index) => data.pump(SR[index], pumpVal))
    return Math.max(...clipping)
}

let sumA = 0;
let sumB = 0;
for (let xSecond = 0; xSecond <= 74; xSecond += 1) {
    const resultMember = pump_result(xSecond)
    sumA += xSecond * resultMember
    sumB += resultMember
    console.log(`Xs: ${xSecond} | resM: ${resultMember}`)
}

console.log(`A: ${sumA} B: ${sumB}`)
console.log(sumA/sumB);






