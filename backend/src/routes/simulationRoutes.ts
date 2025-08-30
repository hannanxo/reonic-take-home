import { Router } from "express";
import { AppDataSource } from "../data-source";
import { SimulationParameters } from "../entities/SimulationParameters";
import {
  generateChargepointPower,
  generateExemplaryDay,
} from "../lib/mockData";
import { SimulationResults } from "../entities/SimulationResults";

const router = Router();

// Create new simulation parameters
router.post("/parameters", async (req, res) => {
  const { chargePoints, arrivalMultiplier, carConsumption, chargingPower } =
    req.body;

  const simulationParameters = new SimulationParameters();
  simulationParameters.chargePoints = chargePoints;
  simulationParameters.arrivalMultiplier = arrivalMultiplier;
  simulationParameters.carConsumption = carConsumption;
  simulationParameters.chargingPower = chargingPower;

  const savedParams = await AppDataSource.manager.save(simulationParameters);
  res.json(savedParams);
});

// Get simulation parameters
router.get("/parameters/:id", async (req, res) => {
  const { id } = req.params;
  const numericId = Number(id);
  const params = await AppDataSource.manager.findOne(SimulationParameters, {
    where: { id: numericId },
  });
  res.json(params);
});

// Create simulation results (run mock simulation)
router.post("/simulate", async (req, res) => {
  const { parametersId } = req.body as { parametersId: number };
  const paramsRepo = AppDataSource.getRepository(SimulationParameters);
  const resultsRepo = AppDataSource.getRepository(SimulationResults);

  const parameters = await paramsRepo.findOne({ where: { id: parametersId } });
  if (!parameters)
    return res.status(404).json({ error: "Parameters not found" });

  const exemplaryDay = generateExemplaryDay(parameters);
  const chargepointPower = generateChargepointPower(parameters);

  const totalPower = exemplaryDay.reduce((s, r) => s + r.power, 0);
  const dailyEnergyKWh = totalPower * 0.25; // 15-min buckets assumption
  const peakPower = exemplaryDay.reduce((m, r) => Math.max(m, r.power), 0);
  const avgActive =
    exemplaryDay.reduce((s, r) => s + r.activeStations, 0) /
    exemplaryDay.length;
  const concurrencyFactor = +(
    (avgActive / Math.max(1, parameters.chargePoints)) *
    100
  ).toFixed(1);

  const result = resultsRepo.create({
    parameters: parameters,
    totalEnergyCharged: +(dailyEnergyKWh * (280 + Math.random() * 120)).toFixed(
      2
    ),
    peakPower,
    concurrencyFactor,
    exemplaryDay,
    chargepointPower,
    chargingEventsYear: Math.round(700 + Math.random() * 400),
    chargingEventsMonth: Math.round(40 + Math.random() * 70),
    chargingEventsWeek: Math.round(20 + Math.random() * 40),
    chargingEventsDay: Math.round(3 + Math.random() * 30),
  });

  const saved = await resultsRepo.save(result);
  res.json(saved);
});

export default router;
