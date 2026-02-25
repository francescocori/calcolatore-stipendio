// Detrazione lavoro dipendente art.13 TUIR (Step 4)
// Calculated on imponibile fiscale (NOT on RAL)
// Decreasing function: higher income = lower deduction
import { CONSTANTS_2026 } from "./constants";

export function calcolaDetrazione(imponibile: number): number {
  const {
    DET_LIMIT_1,
    DET_LIMIT_2,
    DET_LIMIT_3,
    DET_AMOUNT_1,
    DET_BASE_2,
    DET_RANGE_2,
    DET_WIDTH_2,
    DET_WIDTH_3,
    DET_MAGGIORAZIONE,
    DET_MAGGIORAZIONE_MIN,
    DET_MAGGIORAZIONE_MAX,
  } = CONSTANTS_2026;

  let base: number;

  if (imponibile <= DET_LIMIT_1) {
    base = DET_AMOUNT_1;
  } else if (imponibile <= DET_LIMIT_2) {
    base = DET_BASE_2 + DET_RANGE_2 * ((DET_LIMIT_2 - imponibile) / DET_WIDTH_2);
  } else if (imponibile <= DET_LIMIT_3) {
    base = DET_BASE_2 * ((DET_LIMIT_3 - imponibile) / DET_WIDTH_3);
  } else {
    base = 0;
  }

  if (imponibile >= DET_MAGGIORAZIONE_MIN && imponibile <= DET_MAGGIORAZIONE_MAX) {
    base += DET_MAGGIORAZIONE;
  }

  return Math.max(0, base);
}
