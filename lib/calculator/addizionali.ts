import { CONSTANTS_2026 } from "./constants";

/**
 * Addizionale Regionale Lombardia (Step 8)
 * Source: Regione Lombardia — art. 72 L.R. 10/2003, aggiornato 2022, confermato 2026
 *
 * Progressive brackets applied on imponibile fiscale.
 * Each bracket rate applies to the portion of income within that bracket.
 */
function calcolaAddizionaleRegionale(imponibile: number): number {
  const {
    ADD_REG_BRACKET_1_LIMIT,
    ADD_REG_BRACKET_2_LIMIT,
    ADD_REG_BRACKET_3_LIMIT,
    ADD_REG_RATE_1,
    ADD_REG_RATE_2,
    ADD_REG_RATE_3,
    ADD_REG_RATE_4,
  } = CONSTANTS_2026;

  let regionale = 0;

  // Bracket 1: 0 – 15.000
  regionale += Math.min(imponibile, ADD_REG_BRACKET_1_LIMIT) * ADD_REG_RATE_1;

  // Bracket 2: 15.001 – 28.000
  if (imponibile > ADD_REG_BRACKET_1_LIMIT) {
    regionale +=
      (Math.min(imponibile, ADD_REG_BRACKET_2_LIMIT) - ADD_REG_BRACKET_1_LIMIT) *
      ADD_REG_RATE_2;
  }

  // Bracket 3: 28.001 – 50.000
  if (imponibile > ADD_REG_BRACKET_2_LIMIT) {
    regionale +=
      (Math.min(imponibile, ADD_REG_BRACKET_3_LIMIT) - ADD_REG_BRACKET_2_LIMIT) *
      ADD_REG_RATE_3;
  }

  // Bracket 4: oltre 50.000
  if (imponibile > ADD_REG_BRACKET_3_LIMIT) {
    regionale += (imponibile - ADD_REG_BRACKET_3_LIMIT) * ADD_REG_RATE_4;
  }

  return regionale;
}

/**
 * Addizionale Comunale Milano (Step 8)
 * Source: Comune di Milano — delibera 2026
 *
 * Flat rate 0,80% on imponibile fiscale.
 * Exemption: imponibile ≤ 23.000 € → 0 €
 */
function calcolaAddizionaleComunale(imponibile: number): number {
  const { ADD_COMUNALE_RATE, ADD_COMUNALE_EXEMPTION } = CONSTANTS_2026;
  if (imponibile <= ADD_COMUNALE_EXEMPTION) return 0;
  return imponibile * ADD_COMUNALE_RATE;
}

/**
 * Combined addizionali (Step 8)
 */
export function calcolaAddizionali(imponibile: number): {
  regionale: number;
  comunale: number;
  totale: number;
} {
  const regionale = calcolaAddizionaleRegionale(imponibile);
  const comunale = calcolaAddizionaleComunale(imponibile);
  return {
    regionale,
    comunale,
    totale: regionale + comunale,
  };
}
