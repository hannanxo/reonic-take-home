import type { SimulationParameters, SimulationResults } from ".";

export interface ResultsDashboardProps {
  results: SimulationResults;
  parameters: SimulationParameters;
  onParametersChange: (p: SimulationParameters) => void;
}
