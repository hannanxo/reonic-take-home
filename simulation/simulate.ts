export type inputs = {
  chargePoints: number;
  powerKW: number; // max charging power per charge point
  consumptionKWhPer100km: number;
};

export type outputs = {
  totalEnergyKWh: number;
  theoreticalMaxKW: number; // chargePoints × powerKW
  actualMaxKW: number; // max observed power in any 15 mins tick
  concurrencyFactor: number; // actualMaxKW / theoreticalMaxKW
};

// T1: hourly arrival
const ARRIVAL_PROB_BY_HOUR = [
  0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 2.83, 2.83, 5.66, 5.66, 5.66,
  7.55, 7.55, 7.55, 10.38, 10.38, 10.38, 4.72, 4.72, 4.72, 0.94, 0.94,
];

// T2: demand distribution ~ round up to 1
const DEMAND_DIST: { p: number; km: number | null }[] = [
  { p: 34.31, km: null },
  { p: 4.9, km: 5 },
  { p: 9.8, km: 10 },
  { p: 11.76, km: 20 },
  { p: 8.82, km: 30 },
  { p: 11.76, km: 50 },
  { p: 10.78, km: 100 },
  { p: 4.9, km: 200 },
  { p: 2.94, km: 300 },
];

// Time constants
const TICKS_PER_HOUR = 4; // 15-min ticks
const HOURS_PER_DAY = 24;
const TICKS_PER_DAY = TICKS_PER_HOUR * HOURS_PER_DAY;
const DAYS_PER_YEAR = 365;
const TICKS_PER_YEAR = DAYS_PER_YEAR * TICKS_PER_DAY;
const HOURS_PER_TICK = 0.25;

function getDemandProbability(): number | null {
  // helper function to sample demand
  const r = Math.random();
  let acc = 0;
  for (const { p, km } of DEMAND_DIST) {
    acc += p / 100;
    if (r <= acc) return km;
  }
  return null;
}

function simulate(inp: inputs): outputs {
  const energyPerKm = inp.consumptionKWhPer100km / 100;
  const remaining: number[] = Array.from({ length: inp.chargePoints }, () => 0);

  let totalEnergy = 0; // kWh
  let actualMaxKW = 0;

  for (let tick = 0; tick < TICKS_PER_YEAR; tick++) {
    const hourOfDay = Math.floor(tick / TICKS_PER_HOUR) % 24; // how many hours into the day
    const arrivalProb = ARRIVAL_PROB_BY_HOUR[hourOfDay]! / 100;

    let totalKWThisTick = 0;

    for (let i = 0; i < inp.chargePoints; i++) {
      if (remaining[i]! <= 1e-12 && Math.random() < arrivalProb) {
        // If idle and arrival
        const km = getDemandProbability();
        if (km !== null) {
          remaining[i] = km * energyPerKm;
        }
      }

      if (remaining[i]! > 1e-12) {
        const deliver = Math.min(remaining[i]!, inp.powerKW * HOURS_PER_TICK);
        remaining[i] = remaining[i]! - deliver;
        totalEnergy += deliver;
        totalKWThisTick += deliver / HOURS_PER_TICK;
      }
    }

    if (totalKWThisTick > actualMaxKW) actualMaxKW = totalKWThisTick;
  }

  const theoreticalMaxKW = inp.chargePoints * inp.powerKW;
  const concurrencyFactor = actualMaxKW / theoreticalMaxKW;

  return {
    totalEnergyKWh: +totalEnergy.toFixed(1),
    theoreticalMaxKW,
    actualMaxKW: +actualMaxKW.toFixed(1),
    concurrencyFactor: +concurrencyFactor.toFixed(4),
  };
}

// CLI code
const out = simulate({
  chargePoints: 20,
  powerKW: 11,
  consumptionKWhPer100km: 18,
});
console.log(JSON.stringify(out, null, 2));
