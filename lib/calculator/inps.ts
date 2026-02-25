// Calculates the employee's INPS contribution (Step 1)
// Source: INPS Circolare n. 6/2026
// Standard rate 9.19% up to threshold; +1% on the portion above 56.224 €
import { CONSTANTS_2026 } from "./constants";

export function calcolaContributiINPS(ral: number): number {
  const { INPS_RATE, INPS_ADDITIONAL_RATE, INPS_ADDITIONAL_THRESHOLD } =
    CONSTANTS_2026;

  if (ral <= INPS_ADDITIONAL_THRESHOLD) {
    return ral * INPS_RATE;
  }

  return (
    INPS_ADDITIONAL_THRESHOLD * INPS_RATE +
    (ral - INPS_ADDITIONAL_THRESHOLD) * (INPS_RATE + INPS_ADDITIONAL_RATE)
  );
}
