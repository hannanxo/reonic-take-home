import "reflect-metadata";
import { DataSource } from "typeorm";
import { SimulationParameters } from "./entities/SimulationParameters";
import { SimulationResults } from "./entities/SimulationResults";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./database.sqlite",
  synchronize: true,
  logging: true,
  entities: [SimulationParameters, SimulationResults],
});
