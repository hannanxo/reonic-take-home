import type { SimulationResults } from "../types";
import ChargepointValues from "./ChargePointSummary";
import KeyMetrics from "./KeyMetrics";

const ResultsDashboard = ({ results }: { results: SimulationResults }) => {
  return (
    <div className="space-y-6">
      <KeyMetrics results={results} />
      <ChargepointValues data={results.chargepointPower} />
    </div>
  );
};

export default ResultsDashboard;
