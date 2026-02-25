// Trattamento Integrativo — DL 3/2020 (Step 6)
// Up to 1.200 €/year for low incomes where deductions exceed IRPEF lorda
// Added to net pay — not a deduction
import { CONSTANTS_2026 } from "./constants";

export function calcolaTI(
  imponibile: number,
  irpefLorda: number,
  detrazione: number,
  detrazioneCuneo: number
): number {
  const { TI_MAX_INCOME, TI_THRESHOLD, TI_AMOUNT } = CONSTANTS_2026;

  if (imponibile > TI_MAX_INCOME) return 0;

  if (imponibile <= TI_THRESHOLD) {
    return irpefLorda > detrazione ? TI_AMOUNT : 0;
  }

  // 15001 ≤ imponibile ≤ 28000
  const totalDetrazioni = detrazione + detrazioneCuneo;
  return totalDetrazioni > irpefLorda
    ? Math.min(TI_AMOUNT, totalDetrazioni - irpefLorda)
    : 0;
}
