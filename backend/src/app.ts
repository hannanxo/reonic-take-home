import express from "express";
import dotenv from "dotenv";

dotenv.config();

export function buildApp() {
  const app = express();
  app.use(express.json());

  app.get("/health", (_req, res) => res.json({ ok: true }));

  return app;
}
