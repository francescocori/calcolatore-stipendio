"use client";

import { useState } from "react";
import RalInput from "@/components/RalInput";
import ResultsPanel from "@/components/ResultsPanel";
import { calcolaStipendio, type CalcoloResult } from "@/lib/calculator";

export default function Home() {
  const [ral, setRal] = useState(0);
  const [result, setResult] = useState<CalcoloResult>(() =>
    calcolaStipendio(0),
  );

  function handleRalChange(val: number) {
    setRal(val);
  }

  function handleConfirm() {
    setResult(calcolaStipendio(ral));
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 bg-bg/90 backdrop-blur border-b border-border px-5 sm:px-8 py-3 flex items-center justify-between">
        <span className="font-display text-xl text-text-primary">JET HR</span>
        <span className="text-[10px] font-medium text-text-secondary border border-border rounded px-2 py-0.5 uppercase tracking-widest">
          Anno fiscale 2026
        </span>
      </header>

      {/* Main content */}
      <main className="flex-1 py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <div className="mb-8 sm:mb-10 flex flex-col text-center">
            <h1 className="font-display text-3xl sm:text-5xl text-text-primary leading-tight">
              Calcola il tuo stipendio netto
            </h1>
            <p className="text-sm text-text-secondary mt-2">
              Inserisci la tua RAL e scopri quanto porterai a casa ogni mese ·
              Anno fiscale 2026
            </p>
            <p className="text-xs text-text-secondary mt-2">
              CDI · Milano · Lombardia · 13 mensilità · Nessun carico familiare
              · Nessuna agevolazione.{" "}
              <span className="italic">TFR non incluso.</span>
            </p>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-1  gap-6 max-w-[500px] mx-auto">
            {/* Left column — input */}
            <div className="flex flex-col gap-4">
              <RalInput
                value={ral}
                onChange={handleRalChange}
                onConfirm={handleConfirm}
              />
              {/* <AssunzioniBox /> */}
            </div>

            {/* Right column — results */}
            <div>
              <ResultsPanel result={result} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
