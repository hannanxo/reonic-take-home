import { useState } from "react";
import Header from "./components/Header";
// import { getRandomMockResults } from "./data/mockData";
import Dashboard from "./pages/Dashboard";
import type { SimulationParameters, SimulationResults } from "./types";
import {
  defaultParameters,
  initialResults,
  MIN_CAR_CONS,
  MIN_CP_POWER,
} from "./types/constants";
import { createParameters, normalizeResults, simulate } from "./lib/api";

function App() {
  const [results, setResults] = useState<SimulationResults>(initialResults);
  const [parameters, setParameters] =
    useState<SimulationParameters>(defaultParameters);
  const [simulating, setSimulating] = useState(false);

  const handleSimulate = async () => {
    if (simulating) return;
    setSimulating(true);
    try {
      // 1) persist current inputs
      const saved = await createParameters(parameters);
      // 2) run (mock) simulation on the backend
      const apiRes = await simulate(saved.id);
      // 3) map backend shape → frontend shape
      setResults(normalizeResults(apiRes));
    } catch (err) {
      console.error(err);
      // optional: toast error
    } finally {
      setSimulating(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        simulating={simulating}
        onSimulate={handleSimulate}
        hasInputError={
          parameters.carConsumption < MIN_CAR_CONS ||
          parameters.chargingPower < MIN_CP_POWER
        }
      />

      <Dashboard
        results={results}
        parameters={parameters}
        onParametersChange={setParameters}
        simulating={simulating}
      />
    </div>
  );
}

export default App;
