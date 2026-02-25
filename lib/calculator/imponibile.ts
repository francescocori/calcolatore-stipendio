// Imponibile fiscale = taxable base for IRPEF and addizionali (Step 2)
export function calcolaImponibile(
  ral: number,
  contributiINPS: number
): number {
  return ral - contributiINPS;
}
