import ChartIcon from "../assets/ChartIcon";
import ClockIcon from "../assets/ClockIcon";
import HandIcon from "../assets/HandIcon";
import LightningIcon from "../assets/LightningIcon";
import { formatNumber, getPillColor } from "../helpers/utils";
import type { SimulationResults } from "../types";

interface KeyMetricsProps {
  results: SimulationResults;
}

const KeyMetrics = ({ results }: KeyMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Total Energy Charged */}
      <div className="card">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <LightningIcon className="w-8 h-8 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Energy</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatNumber(results.totalEnergyCharged, 0)} kWh
            </p>
          </div>
        </div>
      </div>

      {/* Peak Power */}
      <div className="card">
        <div className="flex items-center">
          <div className="p-2 bg-orange-100 rounded-lg">
            <HandIcon className="w-8 h-8 text-orange-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Peak Power</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatNumber(results.peakPower, 1)} kW
            </p>
          </div>
        </div>
      </div>

      {/* Concurrency Factor */}
      <div className="card">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <ChartIcon className="w-8 h-8 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 ">
              Concurrency Factor
            </p>
            <p
              className={`text-2xl font-bold ${getPillColor(
                results.concurrencyFactor
              )} px-2 py-1 rounded-lg`}
            >
              {formatNumber(results.concurrencyFactor, 1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Total Events */}
      <div className="card">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 rounded-lg">
            <ClockIcon className="w-8 h-8 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Events</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatNumber(results.chargingEvents.year, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;
