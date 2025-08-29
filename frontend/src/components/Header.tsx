import LightningIcon from "../assets/LightningIcon";

interface HeaderProps {
  simulating: boolean;
  onSimulate: () => void | Promise<void>;
}
const Header = ({ simulating, onSimulate }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <LightningIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="md:text-2xl font-bold text-gray-900">Reonic </h1>
              <p className="text-sm text-gray-600">EV Charging Simulation</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  !simulating && "bg-green-500"
                }`}
              ></div>
              <span className="text-sm font-medium text-gray-700">
                {!simulating && "Ready"}
              </span>
            </div>

            <button
              onClick={onSimulate}
              disabled={simulating}
              className={`px-4 py-1.5 rounded-md text-sm font-medium text-white transition-colors duration-200 ${
                simulating
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {simulating ? "Running..." : "Simulate"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
