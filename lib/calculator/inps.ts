// Calculates the employee's INPS contribution (Step 1)
// Source: INPS Circolare n. 6/2026
// Standard rate 9.19% up to threshold; +1% on the portion above 56.224 €
// Contributions capped at massimale annuo 122.295 € (INPS Circ. 6/2026)
import { CONSTANTS_2026 } from "./constants";

export function calcolaContributiINPS(ral: number): number {
  const { INPS_RATE, INPS_ADDITIONAL_RATE, INPS_ADDITIONAL_THRESHOLD, INPS_MAX } =
    CONSTANTS_2026;

  const imponibileINPS = Math.min(ral, INPS_MAX);

  if (imponibileINPS <= INPS_ADDITIONAL_THRESHOLD) {
    return imponibileINPS * INPS_RATE;
  }

  return (
    INPS_ADDITIONAL_THRESHOLD * INPS_RATE +
    (imponibileINPS - INPS_ADDITIONAL_THRESHOLD) * (INPS_RATE + INPS_ADDITIONAL_RATE)
  );
}
