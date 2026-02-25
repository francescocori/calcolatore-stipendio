// Sources:
// - INPS Circolare n. 6/2026 (30 gennaio 2026)
// - Legge di Bilancio 2026 (L. 199/2025)
// - L. 207/2024 (confirmed for 2026)
// - Art. 13 TUIR
// - DL 3/2020

export const CONSTANTS_2026 = {
  // Step 1 — INPS contributions (dipendente share)
  INPS_RATE: 0.0919,                // 9.19% IVS standard private sector
  INPS_ADDITIONAL_RATE: 0.01,       // +1% on earnings above threshold
  INPS_ADDITIONAL_THRESHOLD: 56224, // INPS circ. 6/2026: first fascia pensionabile
  INPS_MAX: 122295,                 // massimale annuo (not reached in V1 test cases)

  // Step 3 — IRPEF brackets (L. 199/2025 — 2nd bracket reduced 35%→33%)
  IRPEF_BRACKET_1_LIMIT: 28000,
  IRPEF_BRACKET_2_LIMIT: 50000,
  IRPEF_RATE_1: 0.23,
  IRPEF_RATE_2: 0.33,
  IRPEF_RATE_3: 0.43,

  // Step 4 — Detrazioni lavoro dipendente (art.13 TUIR)
  DET_LIMIT_1: 15000,
  DET_LIMIT_2: 28000,
  DET_LIMIT_3: 50000,
  DET_AMOUNT_1: 1955,        // full detraction for income ≤ 15000
  DET_BASE_2: 1910,          // base at top of fascia 2 (= bottom of fascia 3)
  DET_RANGE_2: 1190,         // variation across fascia 2
  DET_WIDTH_2: 13000,        // fascia 2 width (28000 - 15000)
  DET_WIDTH_3: 22000,        // fascia 3 width (50000 - 28000)
  DET_MAGGIORAZIONE: 65,     // bonus if income between 25001 and 35000
  DET_MAGGIORAZIONE_MIN: 25001,
  DET_MAGGIORAZIONE_MAX: 35000,

  // Step 5a — Cuneo fiscale Binario A: bonus for income ≤ 20000
  // Base = RAL lorda. Added directly to net pay. NOT an IRPEF deduction.
  CUNEO_A_MAX: 20000,
  CUNEO_A_THRESHOLD_1: 8500,
  CUNEO_A_THRESHOLD_2: 15000,
  CUNEO_A_RATE_1: 0.071,    // ≤ 8500
  CUNEO_A_RATE_2: 0.053,    // 8501 – 15000
  CUNEO_A_RATE_3: 0.048,    // 15001 – 20000

  // Step 5b — Cuneo fiscale Binario B: deduction for income 20001–40000
  // Applied on imponibile fiscale. Reduces IRPEF.
  CUNEO_B_MIN: 20001,
  CUNEO_B_FLAT_LIMIT: 32000,
  CUNEO_B_MAX: 40000,
  CUNEO_B_AMOUNT: 1000,
  CUNEO_B_TAPER_WIDTH: 8000, // 40000 - 32000

  // Step 6 — Trattamento Integrativo (DL 3/2020)
  TI_MAX_INCOME: 28000,
  TI_THRESHOLD: 15000,
  TI_AMOUNT: 1200,

  // Step 8 — Addizionali (applied on imponibile fiscale)
  ADD_REGIONALE: 0.0173,    // Lombardia — simplified average rate (V1)
  ADD_COMUNALE: 0.008,      // Comune di Milano 2026

  // General
  MENSILITA: 13,
} as const;
