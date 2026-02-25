// Cuneo fiscale (Step 5)
// Source: Legge di Bilancio 2026 (L. 199/2025) — Binario A + B
import { CONSTANTS_2026 } from "./constants";

// Binario A: tax-free bonus for incomes ≤ 20.000 € (Step 5a)
// CRITICAL: base is RAL lorda, NOT imponibile
// This amount is added directly to net pay — it does NOT reduce IRPEF
export function calcolaBonusCuneoA(ral: number): number {
  const {
    CUNEO_A_THRESHOLD_1,
    CUNEO_A_THRESHOLD_2,
    CUNEO_A_MAX,
    CUNEO_A_RATE_1,
    CUNEO_A_RATE_2,
    CUNEO_A_RATE_3,
  } = CONSTANTS_2026;

  if (ral <= CUNEO_A_THRESHOLD_1) return ral * CUNEO_A_RATE_1;
  if (ral <= CUNEO_A_THRESHOLD_2) return ral * CUNEO_A_RATE_2;
  if (ral <= CUNEO_A_MAX) return ral * CUNEO_A_RATE_3;
  return 0;
}

// Binario B: IRPEF deduction for incomes 20.001–40.000 € (Step 5b)
// Applied on imponibile fiscale — reduces IRPEF lorda
export function calcolaDetrazioneCuneoB(imponibile: number): number {
  const {
    CUNEO_B_MIN,
    CUNEO_B_FLAT_LIMIT,
    CUNEO_B_MAX,
    CUNEO_B_AMOUNT,
    CUNEO_B_TAPER_WIDTH,
  } = CONSTANTS_2026;

  if (imponibile < CUNEO_B_MIN) return 0;
  if (imponibile <= CUNEO_B_FLAT_LIMIT) return CUNEO_B_AMOUNT;
  if (imponibile <= CUNEO_B_MAX)
    return CUNEO_B_AMOUNT * ((CUNEO_B_MAX - imponibile) / CUNEO_B_TAPER_WIDTH);
  return 0;
}
