import type {
  SimulationResults,
  HourlyData,
  ChargepointPowerData,
  SimulationParameters,
} from "../types";

export const mockSimulationResults: SimulationResults = {
  totalEnergyCharged: 100000.99,
  chargingEvents: {
    year: 1000,
    month: 100,
    week: 10,
    day: 31,
  },
  concurrencyFactor: 55,
  peakPower: 220,
  exemplaryDay: generateExemplaryDay(),
  chargepointPower: generateChargepointPowerData(),
};

function generateExemplaryDay(): HourlyData[] {
  const data: HourlyData[] = [];
  for (let hour = 0; hour < 24; hour++) {
    let power = 0;
    let activeStations = 0;

    // Simulate daily pattern
    if (hour >= 6 && hour <= 9) {
      // Morning
      power = 45 + Math.random() * 30;
      activeStations = 8 + Math.floor(Math.random() * 5);
    } else if (hour >= 17 && hour <= 20) {
      // Evening
      power = 60 + Math.random() * 35;
      activeStations = 10 + Math.floor(Math.random() * 6);
    } else if (hour >= 10 && hour <= 16) {
      // Daytime
      power = 25 + Math.random() * 20;
      activeStations = 4 + Math.floor(Math.random() * 4);
    } else {
      // Night time
      power = 5 + Math.random() * 15;
      activeStations = 1 + Math.floor(Math.random() * 3);
    }

    data.push({
      hour,
      power: Math.round(power * 10) / 10,
      activeStations,
    });
  }
  return data;
}

function generateChargepointPowerData(cpSize?: number): ChargepointPowerData[] {
  const data: ChargepointPowerData[] = [];
  for (let i = 0; i < (cpSize || 20); i++) {
    data.push({
      stationId: i + 1,
      averagePower: Math.round((8 + Math.random() * 6) * 10) / 10,
      peakPower: Math.round((10 + Math.random() * 5) * 10) / 10,
      utilization: Math.round((35 + Math.random() * 45) * 10) / 10,
    });
  }
  return data;
}

export function getRandomMockResults(
  params: SimulationParameters
): SimulationResults {
  const cp = params?.chargePoints ?? 20;
  const arrival = (params?.arrivalMultiplier ?? 100) / 100;

  const cpScale = Math.max(0.5, Math.min(2, cp / 20));
  const arrScale = Math.max(0.5, Math.min(2, arrival));
  const scale = cpScale * arrScale;

  const rand = (f = 0.2) => 0.9 + Math.random() * f;
  return {
    ...mockSimulationResults,
    totalEnergyCharged:
      mockSimulationResults.totalEnergyCharged * scale * rand(0.2),
    peakPower: mockSimulationResults.peakPower * cpScale * rand(0.15),
    concurrencyFactor: mockSimulationResults.concurrencyFactor * rand(0.15),

    chargingEvents: {
      year: Math.round(
        mockSimulationResults.chargingEvents.year * scale * rand(0.2)
      ),
      month: Math.round(
        mockSimulationResults.chargingEvents.month * scale * rand(0.2)
      ),
      week: Math.round(
        mockSimulationResults.chargingEvents.week * scale * rand(0.2)
      ),
      day: Math.round(
        mockSimulationResults.chargingEvents.day * scale * rand(0.2)
      ),
    },

    exemplaryDay: generateExemplaryDay(),
    chargepointPower: generateChargepointPowerData(params.chargePoints),
  };
}
