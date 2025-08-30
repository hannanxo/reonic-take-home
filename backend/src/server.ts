import { AppDataSource } from "./data-source.js";
import { buildApp } from "./app.js";

const PORT = Number(process.env.PORT ?? 4000);

AppDataSource.initialize()
  .then(() => {
    const app = buildApp();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB init failed:", err);
    process.exit(1);
  });
