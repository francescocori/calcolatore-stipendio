// IRPEF lorda — progressive tax on imponibile fiscale (Step 3)
// L. 199/2025: brackets 23% / 33% / 43%
import { CONSTANTS_2026 } from "./constants";

export function calcolaIRPEFLorda(imponibile: number): number {
  const {
    IRPEF_BRACKET_1_LIMIT,
    IRPEF_BRACKET_2_LIMIT,
    IRPEF_RATE_1,
    IRPEF_RATE_2,
    IRPEF_RATE_3,
  } = CONSTANTS_2026;

  const bracket1 = Math.min(imponibile, IRPEF_BRACKET_1_LIMIT) * IRPEF_RATE_1;
  const bracket2 =
    Math.max(0, Math.min(imponibile, IRPEF_BRACKET_2_LIMIT) - IRPEF_BRACKET_1_LIMIT) *
    IRPEF_RATE_2;
  const bracket3 =
    Math.max(0, imponibile - IRPEF_BRACKET_2_LIMIT) * IRPEF_RATE_3;

  return bracket1 + bracket2 + bracket3;
}
