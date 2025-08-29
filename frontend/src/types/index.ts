export interface ChargingStation {
  id: number;
  power: number; // in kW
  count: number;
}

export interface SimulationParameters {
  chargePoints: number;
  arrivalMultiplier: number; // 20-200%, default 100%
  carConsumption: number; // kWh per 100km, default 18
  chargingPower: number; // kW per chargepoint, default 11
  customStations: ChargingStation[];
}

export interface SimulationResults {
  totalEnergyCharged: number; // kWh
  chargingEvents: {
    year: number;
    month: number;
    week: number;
    day: number;
  };
  concurrencyFactor: number; // percentage
  peakPower: number; // kW
  exemplaryDay: HourlyData[];
  chargepointPower: ChargepointPowerData[];
}

export interface HourlyData {
  hour: number;
  power: number; // kW
  activeStations: number;
}

export interface ChargepointPowerData {
  stationId: number;
  averagePower: number; // kW
  peakPower: number; // kW
  utilization: number; // percentage
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
  }[];
}
