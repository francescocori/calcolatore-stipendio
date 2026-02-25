"use client";

import { useEffect, useRef, useState } from "react";
import type { CalcoloResult } from "@/lib/calculator";

interface ResultsPanelProps {
  result: CalcoloResult;
}

// ── Utilities ────────────────────────────────────────────────────────────────

function fmt(value: number) {
  return Math.round(value).toLocaleString("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}

function pct(part: number, total: number) {
  return ((part / total) * 100).toFixed(1);
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// ── Hooks ─────────────────────────────────────────────────────────────────────

// Animates a number from its last value to the new target over `duration` ms.
function useCountUp(target: number, duration = 400): number {
  const [display, setDisplay] = useState(target);
  const currentRef = useRef(target);

  useEffect(() => {
    const from = currentRef.current;
    if (from === target) return;

    let rafId: number;
    const startTime = performance.now();

    function tick() {
      const t = Math.min((performance.now() - startTime) / duration, 1);
      const value = from + (target - from) * easeOutCubic(t);
      currentRef.current = value;
      setDisplay(value);
      if (t < 1) rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration]);

  return display;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function InfoIcon({ title }: { title: string }) {
  return (
    <span
      className="ml-1 text-text-tertiary cursor-help select-none"
      title={title}
      aria-label={title}
    >
      ⓘ
    </span>
  );
}

function Row({
  label,
  value,
  indent = false,
  bold = false,
  sign,
  colorClass,
  tooltip,
  index = 0,
}: {
  label: string;
  value: number;
  indent?: boolean;
  bold?: boolean;
  sign: "+" | "−";
  colorClass?: string;
  tooltip?: string;
  index?: number;
}) {
  return (
    <div
      className={`row-item flex justify-between items-start gap-2 ${indent ? "pl-5" : ""} ${bold ? "mt-1" : ""}`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <span
        className={`text-sm flex-1 min-w-0 ${bold ? "font-medium text-text-primary" : "text-text-secondary"}`}
      >
        {label}
        {tooltip && <InfoIcon title={tooltip} />}
      </span>
      <span
        className={`text-sm text-right tabular-nums shrink-0 ${colorClass ?? "text-text-primary"} ${bold ? "font-semibold" : ""}`}
      >
        {sign}
        {fmt(value)}
      </span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ResultsPanel({ result }: ResultsPanelProps) {
  const {
    ral,
    nettoAnnuo,
    nettoMensile,
    aliquotaEffettiva,
    contributiINPS,
    irpefLorda,
    irpefNetta,
    detrazioneArt13,
    detrazioneCuneoB,
    bonusCuneoA,
    trattamentoIntegrativo,
    addizionaleRegionale,
    addizionaleComunale,
    addizionaliTotali,
  } = result;

  // ── Animated hero numbers ──────────────────────────────────────────────────
  const displayMensile = useCountUp(nettoMensile);
  const displayAnnuo = useCountUp(nettoAnnuo);

  // ── Stacked bar animation (0 → final on mount/change) ─────────────────────
  const [barReady, setBarReady] = useState(false);
  useEffect(() => {
    setBarReady(false);
    const t = setTimeout(() => setBarReady(true), 50);
    return () => clearTimeout(t);
  }, [result]);

  const netPct  = barReady ? pct(nettoAnnuo, ral)                      : "0";
  const taxPct  = barReady ? pct(irpefNetta + addizionaliTotali, ral)   : "0";
  const inpsPct = barReady ? pct(contributiINPS, ral)                   : "0";

  const showIntegrazioni = bonusCuneoA > 0 || trattamentoIntegrativo > 0;

  // Use ral as key for the breakdown section so rows re-animate on each change
  const breakdownKey = result.ral;

  return (
    <div className="flex flex-col gap-4">

      {/* ── Section 1: Hero summary ── */}
      <div className="bg-surface rounded-xl shadow-md px-5 py-5 sm:px-8 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">

          {/* Monthly net — primary */}
          <div>
            <p className="text-xs sm:text-sm text-text-secondary uppercase tracking-wide">
              Netto mensile
            </p>
            <p className="font-display text-4xl sm:text-5xl font-semibold text-positive mt-1 tabular-nums">
              {fmt(displayMensile)}
            </p>
            <p className="text-xs text-text-tertiary mt-1">
              al mese · ÷ 13 mensilità
            </p>
          </div>

          {/* Annual + effective rate */}
          <div className="sm:text-right">
            <p className="text-sm text-text-secondary">Netto annuo</p>
            <p className="text-2xl font-semibold text-positive mt-0.5 tabular-nums">
              {fmt(displayAnnuo)}
            </p>
            <p className="text-sm text-text-secondary mt-3">
              Aliquota effettiva
            </p>
            <p className="text-xl font-medium text-text-primary mt-0.5">
              {aliquotaEffettiva.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* ── Section 2: Stacked bar ── */}
      <div className="bg-surface rounded-xl px-5 py-5 sm:px-6">
        <p className="text-sm font-medium text-text-secondary mb-3">
          Come si distribuisce la tua RAL
        </p>

        <div className="h-7 sm:h-8 rounded-full overflow-hidden flex w-full bg-border">
          <div
            className="bg-positive transition-all duration-500 ease-out"
            style={{ width: `${netPct}%` }}
          />
          <div
            className="bg-accent transition-all duration-500 ease-out"
            style={{ width: `${taxPct}%` }}
          />
          <div
            className="bg-warning transition-all duration-500 ease-out"
            style={{ width: `${inpsPct}%` }}
          />
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-xs text-text-secondary">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-positive shrink-0" />
            Netto: {pct(nettoAnnuo, ral)}%
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-accent shrink-0" />
            Tasse: {pct(irpefNetta + addizionaliTotali, ral)}%
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-warning shrink-0" />
            Contributi INPS: {pct(contributiINPS, ral)}%
          </span>
        </div>
      </div>

      {/* ── Section 3: Detailed breakdown ── */}
      <div className="bg-surface rounded-xl shadow-sm px-5 py-5 sm:px-6">
        <p className="text-sm font-medium text-text-secondary mb-4">
          Dettaglio trattenute e integrazioni
        </p>

        {/* Re-key on ral change to replay stagger animation */}
        <div key={breakdownKey} className="flex flex-col gap-0">

          {/* Group A — Deductions */}
          <div className="border-l-2 border-warning pl-3 sm:pl-4 flex flex-col gap-2">
            <Row index={0} label="Contributi INPS (9,19%)"                    value={contributiINPS}       sign="−" colorClass="text-warning" />
            <Row index={1} label="IRPEF lorda"                                value={irpefLorda}           sign="−" colorClass="text-warning" />
            <Row index={2} label="↳ Detrazione lav. dip. (art.13)"            value={detrazioneArt13}      sign="+" indent colorClass="text-positive" />
            {detrazioneCuneoB > 0 && (
              <Row index={3} label="↳ Detrazione cuneo fiscale"               value={detrazioneCuneoB}     sign="+" indent colorClass="text-positive" />
            )}
            <Row index={detrazioneCuneoB > 0 ? 4 : 3}
                 label="= IRPEF netta"                                         value={irpefNetta}           sign="−" bold colorClass="text-warning" />
            <Row index={detrazioneCuneoB > 0 ? 5 : 4}
                 label="Addizionale regionale (Lombardia 1,73%)"               value={addizionaleRegionale} sign="−" colorClass="text-warning" />
            <Row index={detrazioneCuneoB > 0 ? 6 : 5}
                 label="Addizionale comunale (Milano 0,80%)"                   value={addizionaleComunale}  sign="−" colorClass="text-warning" />
          </div>

          <hr className="border-separator my-4" />

          {/* Group B — Integrazioni (conditional) */}
          {showIntegrazioni && (
            <>
              <div className="border-l-2 border-positive pl-3 sm:pl-4 flex flex-col gap-2">
                {bonusCuneoA > 0 && (
                  <Row
                    index={0}
                    label="Bonus cuneo fiscale"
                    value={bonusCuneoA}
                    sign="+"
                    colorClass="text-positive"
                    tooltip="Somma esente da IRPEF e contributi per redditi ≤ 20.000 €"
                  />
                )}
                {trattamentoIntegrativo > 0 && (
                  <Row
                    index={bonusCuneoA > 0 ? 1 : 0}
                    label="Trattamento integrativo (DL 3/2020)"
                    value={trattamentoIntegrativo}
                    sign="+"
                    colorClass="text-positive"
                    tooltip="Spetta quando le detrazioni superano l'IRPEF lorda"
                  />
                )}
              </div>
              <hr className="border-separator my-4" />
            </>
          )}

          {/* Final totals */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-baseline gap-2">
              <span className="font-medium text-base text-text-primary">Netto annuo</span>
              <span className="text-positive font-semibold text-lg tabular-nums shrink-0">
                {fmt(nettoAnnuo)}
              </span>
            </div>
            <div className="flex justify-between items-baseline gap-2">
              <span className="font-medium text-base text-text-primary">Netto mensile (÷13)</span>
              <span className="text-positive font-semibold text-xl tabular-nums shrink-0">
                {fmt(nettoMensile)}
              </span>
            </div>
          </div>

          {/* Footnote */}
          <p className="text-xs text-text-tertiary italic mt-4 pt-4 border-t border-separator">
            * Il cuneo fiscale (Binario A) non si applica alla tredicesima. Il
            netto mensile è una media su 13 mensilità — la tredicesima effettiva
            risulterà leggermente inferiore. Profilo: CDI · Milano · Anno fiscale
            2026.
          </p>
        </div>
      </div>
    </div>
  );
}
