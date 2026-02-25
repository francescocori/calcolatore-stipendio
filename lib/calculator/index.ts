import { CONSTANTS_2026 } from "./constants";
import { calcolaContributiINPS } from "./inps";
import { calcolaImponibile } from "./imponibile";
import { calcolaIRPEFLorda } from "./irpef";
import { calcolaDetrazione } from "./detrazioni";
import { calcolaBonusCuneoA, calcolaDetrazioneCuneoB } from "./cuneo";
import { calcolaTI } from "./trattamentoIntegrativo";
import { calcolaAddizionali } from "./addizionali";

export interface CalcoloResult {
  ral: number;
  contributiINPS: number;
  imponibile: number;
  irpefLorda: number;
  detrazioneArt13: number;
  bonusCuneoA: number;         // added to net, not an IRPEF reduction
  detrazioneCuneoB: number;    // reduces IRPEF
  trattamentoIntegrativo: number;
  irpefNetta: number;
  addizionaleRegionale: number;
  addizionaleComunale: number;
  addizionaliTotali: number;
  nettoAnnuo: number;
  nettoMensile: number;
  totaleTrattenuto: number;    // contributiINPS + irpefNetta + addizionaliTotali
  aliquotaEffettiva: number;   // (totaleTrattenuto / ral) * 100
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function calcolaStipendio(ral: number): CalcoloResult {
  // Step 1
  const contributiINPS = calcolaContributiINPS(ral);

  // Step 2
  const imponibile = calcolaImponibile(ral, contributiINPS);

  // Step 3
  const irpefLorda = calcolaIRPEFLorda(imponibile);

  // Step 4
  const detrazioneArt13 = calcolaDetrazione(imponibile);

  // Step 5
  const bonusCuneoA = calcolaBonusCuneoA(ral);
  const detrazioneCuneoB = calcolaDetrazioneCuneoB(imponibile);

  // Step 6
  const trattamentoIntegrativo = calcolaTI(
    imponibile,
    irpefLorda,
    detrazioneArt13,
    detrazioneCuneoB
  );

  // Step 7
  const irpefNetta = Math.max(
    0,
    irpefLorda - detrazioneArt13 - detrazioneCuneoB
  );

  // Step 8
  const { regionale, comunale, totale: addizionaliTotali } =
    calcolaAddizionali(imponibile);

  // Step 9
  const nettoAnnuo =
    ral -
    contributiINPS -
    irpefNetta -
    addizionaliTotali +
    trattamentoIntegrativo +
    bonusCuneoA;

  // Step 10
  const nettoMensile = nettoAnnuo / CONSTANTS_2026.MENSILITA;

  const totaleTrattenuto = contributiINPS + irpefNetta + addizionaliTotali;
  const aliquotaEffettiva = (totaleTrattenuto / ral) * 100;

  return {
    ral: round2(ral),
    contributiINPS: round2(contributiINPS),
    imponibile: round2(imponibile),
    irpefLorda: round2(irpefLorda),
    detrazioneArt13: round2(detrazioneArt13),
    bonusCuneoA: round2(bonusCuneoA),
    detrazioneCuneoB: round2(detrazioneCuneoB),
    trattamentoIntegrativo: round2(trattamentoIntegrativo),
    irpefNetta: round2(irpefNetta),
    addizionaleRegionale: round2(regionale),
    addizionaleComunale: round2(comunale),
    addizionaliTotali: round2(addizionaliTotali),
    nettoAnnuo: round2(nettoAnnuo),
    nettoMensile: round2(nettoMensile),
    totaleTrattenuto: round2(totaleTrattenuto),
    aliquotaEffettiva: round2(aliquotaEffettiva),
  };
}
