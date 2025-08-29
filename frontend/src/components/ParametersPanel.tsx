import { useState } from "react";
import type { SimulationParameters } from "../types";

interface ParameterPanelProps {
  parameters: SimulationParameters;
  onParametersChange: (params: SimulationParameters) => void;
}

const ParameterPanel = ({
  parameters,
  onParametersChange,
}: ParameterPanelProps) => {
  const [localParameters, setLocalParameters] =
    useState<SimulationParameters>(parameters);

  const handleInputChange = (
    field: keyof SimulationParameters,
    value: number
  ) => {
    const updated = { ...localParameters, [field]: value };
    setLocalParameters(updated);
    onParametersChange(updated);
  };

  // const handleCustomStationChange = (
  //   index: number,
  //   field: keyof ChargingStation,
  //   value: number
  // ) => {
  //   const updatedStations = [...localParameters.customStations];
  //   updatedStations[index] = { ...updatedStations[index], [field]: value };
  //   const updated = { ...localParameters, customStations: updatedStations };
  //   setLocalParameters(updated);
  //   onParametersChange(updated);
  // };

  // const addCustomStation = () => {
  //   const newStation: ChargingStation = {
  //     id: Date.now(),
  //     power: 11,
  //     count: 1,
  //   };
  //   const updated = {
  //     ...localParameters,
  //     customStations: [...localParameters.customStations, newStation],
  //   };
  //   setLocalParameters(updated);
  //   onParametersChange(updated);
  // };

  // const removeCustomStation = (index: number) => {
  //   const updatedStations = localParameters.customStations.filter(
  //     (_, i) => i !== index
  //   );
  //   const updated = { ...localParameters, customStations: updatedStations };
  //   setLocalParameters(updated);
  //   onParametersChange(updated);
  // };

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Simulation Parameters
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Charge Points
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={localParameters.chargePoints}
              onChange={(e) =>
                handleInputChange("chargePoints", parseInt(e.target.value) || 1)
              }
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Arrival Probability Multiplier
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="20"
                max="200"
                value={localParameters.arrivalMultiplier}
                onChange={(e) =>
                  handleInputChange(
                    "arrivalMultiplier",
                    parseInt(e.target.value)
                  )
                }
                className="flex-1"
              />
              <span className="text-sm font-medium text-gray-900 min-w-[3rem]">
                {localParameters.arrivalMultiplier}%
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              20% - 200% (default: 100%)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Car Consumption (kWh per 100km)
            </label>
            <input
              type="number"
              min="10"
              max="30"
              step="0.1"
              value={localParameters.carConsumption}
              onChange={(e) =>
                handleInputChange(
                  "carConsumption",
                  parseFloat(e.target.value) || 18
                )
              }
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Charging Power per Chargepoint (kW)
            </label>
            <input
              type="number"
              min="3"
              max="350"
              step="0.1"
              value={localParameters.chargingPower}
              onChange={(e) =>
                handleInputChange(
                  "chargingPower",
                  parseFloat(e.target.value) || 11
                )
              }
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Custom Charging Stations */}
      {/* <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Custom Charging Stations
          </h2>
          <button
            onClick={addCustomStation}
            className="btn-primary text-sm px-3 py-1"
          >
            Add
          </button>
        </div>

        <div className="space-y-3">
          {localParameters.customStations.map((station, index) => (
            <div
              key={station.id}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Power (kW)
                </label>
                <input
                  type="number"
                  min="3"
                  max="350"
                  value={station.power}
                  onChange={(e) =>
                    handleCustomStationChange(
                      index,
                      "power",
                      parseFloat(e.target.value) || 11
                    )
                  }
                  className="input-field text-sm py-1"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Count
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={station.count}
                  onChange={(e) =>
                    handleCustomStationChange(
                      index,
                      "count",
                      parseInt(e.target.value) || 1
                    )
                  }
                  className="input-field text-sm py-1"
                />
              </div>
              <button
                onClick={() => removeCustomStation(index)}
                className="text-red-600 hover:text-red-800 p-1"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}

          {localParameters.customStations.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              No custom stations configured. Use default settings or add custom
              stations above.
            </p>
          )}
        </div>
      </div> */}

      {/* Summary */}
      {/* <div className="card bg-primary-50 border-primary-200">
        <h3 className="text-md font-semibold text-primary-900 mb-3">
          Configuration Summary
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-primary-700">Total Charge Points:</span>
            <span className="font-medium text-primary-900">
              {localParameters.customStations.reduce(
                (sum, station) => sum + station.count,
                0
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-primary-700">Max Power:</span>
            <span className="font-medium text-primary-900">
              {localParameters.customStations.reduce(
                (sum, station) => sum + station.power * station.count,
                0
              )}{" "}
              kW
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-primary-700">Arrival Rate:</span>
            <span className="font-medium text-primary-900">
              {localParameters.arrivalMultiplier}%
            </span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ParameterPanel;
