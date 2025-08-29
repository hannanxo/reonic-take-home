import ParameterPanel from "../components/ParametersPanel";
import type { SimulationParameters, SimulationResults } from "../types";
import ResultsDashboard from "../components/ResultsPanel";

interface DashboardProps {
  results: SimulationResults;
  parameters: SimulationParameters;
  onParametersChange: (p: SimulationParameters) => void;
}

const Dashboard = ({
  results,
  parameters,
  onParametersChange,
}: DashboardProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ParameterPanel
            parameters={parameters}
            onParametersChange={onParametersChange}
          />
        </div>

        <div className="lg:col-span-2">
          <ResultsDashboard results={results} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
