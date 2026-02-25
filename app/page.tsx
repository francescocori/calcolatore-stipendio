"use client";

import { useState } from "react";
import RalInput from "@/components/RalInput";
import AssunzioniBox from "@/components/AssunzioniBox";
import ResultsPanel from "@/components/ResultsPanel";
import { calcolaStipendio, type CalcoloResult } from "@/lib/calculator";

const DEFAULT_RAL = 30_000;

export default function Home() {
  const [ral, setRal] = useState(DEFAULT_RAL);
  const [result, setResult] = useState<CalcoloResult>(
    calcolaStipendio(DEFAULT_RAL)
  );

  function handleRalChange(val: number) {
    setRal(val);
    if (val >= 1_000) setResult(calcolaStipendio(val));
  }

  return (
    <main className="min-h-screen bg-bg py-10 sm:py-14 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-5 sm:gap-6">

        {/* Header */}
        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-text-primary leading-tight">
            Calcolatore RAL → Netto
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Stima del netto annuo e mensile · Anno fiscale 2026
          </p>
        </div>

        {/* Input */}
        <RalInput value={ral} onChange={handleRalChange} />

        {/* Assumptions */}
        <AssunzioniBox />

        {/* Results */}
        <ResultsPanel result={result} />

      </div>
    </main>
  );
}
