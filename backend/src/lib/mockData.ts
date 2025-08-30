import { SimulationParameters } from "../entities/SimulationParameters";
import type { HourlyRow, CpRow } from "../entities/SimulationResults";

const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));

export function generateExemplaryDay(p: SimulationParameters): HourlyRow[] {
  const intensity = p.arrivalMultiplier / 100;
  const rows: HourlyRow[] = [];
  for (let h = 0; h < 24; h++) {
    // rough daily pattern
    const rushAM = h >= 6 && h <= 9 ? 1.0 : 0;
    const rushPM = h >= 17 && h <= 20 ? 1.1 : 0;
    const daytime = h >= 10 && h <= 16 ? 0.5 : 0.2;
    const pattern = rushAM + rushPM + daytime;

    const active = clamp(
      Math.round(
        pattern * p.chargePoints * 0.6 * intensity + (Math.random() * 2 - 1)
      ),
      0,
      p.chargePoints
    );

    const perStationKW =
      0.35 * p.chargingPower + Math.random() * 0.45 * p.chargingPower;
    const power = +(active * perStationKW * 0.8).toFixed(1); // site losses factor

    rows.push({ hour: h, power, activeStations: active });
  }
  return rows;
}

export function generateChargepointPower(p: SimulationParameters): CpRow[] {
  const intensity = p.arrivalMultiplier / 100;
  const arr: CpRow[] = [];
  for (let i = 1; i <= p.chargePoints; i++) {
    const avg = +(p.chargingPower * (0.45 + Math.random() * 0.35)).toFixed(1);
    const peak = +(avg * (1.15 + Math.random() * 0.25)).toFixed(1);
    const util = clamp(Math.round(40 + Math.random() * 50 * intensity), 5, 95);
    arr.push({
      stationId: i,
      averagePower: avg,
      peakPower: peak,
      utilization: util,
    });
  }
  return arr;
}
