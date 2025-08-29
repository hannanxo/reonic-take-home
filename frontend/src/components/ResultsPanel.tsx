import type { SimulationResults } from "../types";
import ChargepointValues from "./ChargePointSummary";
import KeyMetrics from "./KeyMetrics";

const ResultsDashboard = ({
  results,
  simulating,
}: {
  results: SimulationResults;
  simulating: boolean;
}) => {
  return (
    <div className="space-y-6">
      <KeyMetrics results={results} simulating={simulating} />
      <ChargepointValues
        data={results.chargepointPower}
        simulating={simulating}
      />
    </div>
  );
};

export default ResultsDashboard;
