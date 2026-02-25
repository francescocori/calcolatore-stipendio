// Regional and municipal surcharges (Step 8)
// Applied on imponibile fiscale
// V1 simplification: Lombardia uses average rate 1.73% (actual uses brackets)
import { CONSTANTS_2026 } from "./constants";

export function calcolaAddizionali(imponibile: number): {
  regionale: number;
  comunale: number;
  totale: number;
} {
  const { ADD_REGIONALE, ADD_COMUNALE } = CONSTANTS_2026;

  const regionale = imponibile * ADD_REGIONALE;
  const comunale = imponibile * ADD_COMUNALE;

  return {
    regionale,
    comunale,
    totale: regionale + comunale,
  };
}
