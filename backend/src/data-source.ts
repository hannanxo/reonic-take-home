import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.DB_PATH ?? "./ev.db",
  entities: [],
  synchronize: true,
  logging: false,
});
