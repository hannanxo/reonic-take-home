import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import simulationRoutes from "./routes/simulationRoutes";

const PORT = Number(process.env.PORT) || 4000;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
].filter(Boolean) as string[];

async function start() {
  try {
    await AppDataSource.initialize();
    const dbPath = (AppDataSource.options as any).database;
    console.log(`DB connected (SQLite): ${dbPath}`);

    const app = express();

    app.use(
      cors({
        origin(origin, cb) {
          if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
          return cb(new Error("Not allowed by CORS"));
        },
        credentials: false,
      })
    );
    app.use(express.json());

    // API routes
    app.use("/api", simulationRoutes);

    // 404
    app.use((_req, res) => res.status(404).json({ error: "Not found" }));

    // Error handler
    app.use(
      (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
        console.error(err);
        res.status(500).json({ error: "Server error" });
      }
    );

    app.listen(PORT, () => console.log(`API http://localhost:${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
