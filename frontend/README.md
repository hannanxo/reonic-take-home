# EV Charging Simulation Frontend

The frontend is made in React with Typescript, TailwindCSS and ChartJS.

## How it works

User can adjust the simulation (input) parameters which are:

- Number of Charge Points
- Arrival Probability Multiplier
- Car Consumption (kWh per 100km)
- Charging Power per Chargepoint (kW)

By default everything is empty. Clicking on the simulate button in the header generates mock data. The inputs have validation for Car Consumption and Charging Power per Chargepoint. When the value goes below a threshold an error message is displayed and the simulate button is disabled.

Clicking on the simulate button generates the mock data and shows skeletons/spinners.

## How mock data is generated

Since the task didn't mention connecting the frontend with the task1 I used functional mockups and created the data randomly. But I utilized the **Number of Charge Points** & **Arrival Probability Multiplier** by utilizing their values as weights in data generation.

## Expanding the current code
