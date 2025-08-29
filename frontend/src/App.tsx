import { useState } from "react";
import Header from "./components/Header";
import { getRandomMockResults } from "./data/mockData";
import Dashboard from "./pages/Dashboard";
import type { SimulationParameters, SimulationResults } from "./types";
import { defaultParameters, initialResults } from "./types/constants";

function App() {
  const [results, setResults] = useState<SimulationResults>(initialResults);
  const [parameters, setParameters] =
    useState<SimulationParameters>(defaultParameters);
  const [simulating, setSimulating] = useState(false);

  const handleSimulate = async () => {
    if (simulating) return;
    setSimulating(true);
    await new Promise((r) => setTimeout(r, 1000));
    setResults(getRandomMockResults(parameters));
    setSimulating(false);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Header simulating={simulating} onSimulate={handleSimulate} />

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
