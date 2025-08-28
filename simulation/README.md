# Task 1 – Simulator

## How it works

- The year is split into **15-minute ticks** (35,040 in total).
- Each chargepoint can be **idle** or **busy**.
- If idle, once per tick we roll against the **hourly probability distribution (T1)** to decide if a new EV arrives.
- If an EV arrives, its demand (in km) is sampled from **distribution T2**, then converted into kWh.
- If busy, the chargepoint delivers up to `powerKW × 0.25h` each tick until the session is complete.
- No queuing: if a new EV arrives at a busy charger, it is ignored.

The simulator reports four KPIs:

1. **Total energy delivered (kWh)**
2. **Theoretical maximum demand (kW)**
3. **Actual observed maximum demand (kW)**
4. **Concurrency factor** (actual ÷ theoretical)

---

## Prerequisites

- Node.js (>=16) and npm installed.

---

## Setup

From inside the `simulation` folder:

```bash
# initialize dependencies
npm install

# run the file
npm start
```
