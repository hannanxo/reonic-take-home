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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSimulate={() => {
          setResults(getRandomMockResults(parameters));
        }}
      />
      <Dashboard
        results={results}
        parameters={parameters}
        onParametersChange={setParameters}
      />
    </div>
  );
}

export default App;
