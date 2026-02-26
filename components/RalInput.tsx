"use client";

import { useState } from "react";
import { CONSTANTS_2026 } from "@/lib/calculator/constants";

const {
  DET_LIMIT_1,
  CUNEO_A_MAX,
  IRPEF_BRACKET_1_LIMIT,
  CUNEO_B_FLAT_LIMIT,
  CUNEO_B_MAX,
  IRPEF_BRACKET_2_LIMIT,
} = CONSTANTS_2026;

const INPUT_MIN = 0;
const INPUT_MAX = 500_000;

function getTierLabel(ral: number): string {
  if (ral <= DET_LIMIT_1) return "No-tax area · Trattamento integrativo attivo";
  if (ral <= CUNEO_A_MAX)
    return "Cuneo fiscale A · bonus esente da IRPEF attivo";
  if (ral <= IRPEF_BRACKET_1_LIMIT) return "Scaglione IRPEF 23%";
  if (ral <= CUNEO_B_FLAT_LIMIT)
    return "Scaglione IRPEF 23%–33% · cuneo B 1.000 €";
  if (ral <= CUNEO_B_MAX) return "Scaglione IRPEF 33% · cuneo B in riduzione";
  if (ral <= IRPEF_BRACKET_2_LIMIT) return "Scaglione IRPEF 33%";
  return "Scaglione IRPEF 43%";
}

interface RalInputProps {
  value: number;
  onChange: (val: number) => void;
  onConfirm: () => void;
}

export default function RalInput({
  value,
  onChange,
  onConfirm,
}: RalInputProps) {
  // null = show formatted; string = user is actively typing
  const [rawText, setRawText] = useState<string | null>(null);

  const displayValue =
    rawText !== null ? rawText : value.toLocaleString("it-IT");

  function handleFocus() {
    setRawText(String(value));
  }

  function handleBlur() {
    setRawText(null);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, "");
    setRawText(digits);
    const n = Number(digits);
    if (!isNaN(n)) {
      onChange(Math.min(Math.max(n, INPUT_MIN), INPUT_MAX));
    }
  }

  return (
    <div className="bg-surface border border-border rounded-xl px-5 py-4 flex flex-col gap-4">
      {/* Label + value input */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label
          htmlFor="ral-input"
          className="text-[10px] font-semibold text-text-secondary uppercase tracking-widest"
        >
          Stipendio (RAL)
        </label>
        <div className="flex items-baseline gap-1 border border-border rounded-md px-3 py-1.5 focus-within:border-accent transition-colors">
          <span className="text-text-tertiary text-base">€</span>
          <input
            id="ral-input"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={displayValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter" && onConfirm()}
            className="text-right text-3xl sm:text-4xl font-semibold text-text-primary bg-transparent outline-none tabular-nums w-40 sm:w-52"
          />
        </div>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={onConfirm}
        className="w-full bg-[#111111] text-white rounded-md py-3 text-xs font-semibold hover:bg-[#333333] transition-colors tracking-widest uppercase"
      >
        Calcola
      </button>

      {/* Info strip */}
      <div className="flex items-center gap-2 text-xs text-text-tertiary border-t border-border pt-3">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-light border border-accent shrink-0" />
        {getTierLabel(value)}
      </div>
    </div>
  );
}
