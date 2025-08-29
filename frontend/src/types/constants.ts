import type { SimulationResults } from ".";

export const defaultParameters = {
  chargePoints: 20,
  arrivalMultiplier: 100,
  carConsumption: 18,
  chargingPower: 11,
  customStations: [],
};

export const initialResults: SimulationResults = {
  totalEnergyCharged: 0,
  chargingEvents: {
    year: 0,
    month: 0,
    week: 0,
    day: 0,
  },
  concurrencyFactor: 0,
  peakPower: 0,
  exemplaryDay: [],
  chargepointPower: [],
};
