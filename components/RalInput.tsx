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

const QUICK_PILLS = [20_000, 25_000, 30_000, 35_000, 40_000, 50_000, 60_000, 80_000];
const SLIDER_MIN = 10_000;
const SLIDER_MAX = 200_000;
const INPUT_MIN = 0;
const INPUT_MAX = 500_000;

function getTierLabel(ral: number): string {
  if (ral <= DET_LIMIT_1)         return "No-tax area · Trattamento integrativo attivo";
  if (ral <= CUNEO_A_MAX)         return "Cuneo fiscale A · bonus esente da IRPEF attivo";
  if (ral <= IRPEF_BRACKET_1_LIMIT) return "Scaglione IRPEF 23%";
  if (ral <= CUNEO_B_FLAT_LIMIT)  return "Scaglione IRPEF 23%–33% · cuneo B 1.000 €";
  if (ral <= CUNEO_B_MAX)         return "Scaglione IRPEF 33% · cuneo B in riduzione";
  if (ral <= IRPEF_BRACKET_2_LIMIT) return "Scaglione IRPEF 33%";
  return "Scaglione IRPEF 43%";
}

interface RalInputProps {
  value: number;
  onChange: (val: number) => void;
}

export default function RalInput({ value, onChange }: RalInputProps) {
  // null = show formatted; string = user is actively typing
  const [rawText, setRawText] = useState<string | null>(null);

  const displayValue =
    rawText !== null
      ? rawText
      : value.toLocaleString("it-IT");

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

  function handleSlider(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(Number(e.target.value));
    setRawText(null);
  }

  function handlePill(v: number) {
    onChange(v);
    setRawText(null);
  }

  const sliderValue = Math.min(Math.max(value, SLIDER_MIN), SLIDER_MAX);

  return (
    <div className="bg-surface border border-border rounded-xl px-5 py-4 flex flex-col gap-4">
      {/* Label + value input */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label
          htmlFor="ral-input"
          className="text-sm font-medium text-text-secondary"
        >
          RAL lorda annua
        </label>
        <div className="flex items-baseline gap-1">
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
            className="text-right text-3xl sm:text-4xl font-semibold text-text-primary bg-transparent outline-none tabular-nums w-40 sm:w-52"
          />
        </div>
      </div>

      {/* Slider */}
      <div className="px-1">
        <input
          type="range"
          min={SLIDER_MIN}
          max={SLIDER_MAX}
          step={500}
          value={sliderValue}
          onChange={handleSlider}
          aria-label="RAL lorda — slider"
        />
        <div className="flex justify-between text-xs text-text-tertiary mt-1 px-0.5">
          <span>10k</span>
          <span>200k</span>
        </div>
      </div>

      {/* Quick pills */}
      <div className="flex flex-wrap gap-2">
        {QUICK_PILLS.map((v) => {
          const isActive = value === v;
          return (
            <button
              key={v}
              type="button"
              onClick={() => handlePill(v)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors
                ${
                  isActive
                    ? "bg-accent text-white border-accent"
                    : "bg-surface-alt text-text-secondary border-border hover:border-accent hover:text-accent"
                }`}
            >
              {v / 1_000}k
            </button>
          );
        })}
      </div>

      {/* Info strip */}
      <div className="flex items-center gap-2 text-xs text-text-tertiary border-t border-border pt-3">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-light border border-accent shrink-0" />
        {getTierLabel(value)}
      </div>
    </div>
  );
}
