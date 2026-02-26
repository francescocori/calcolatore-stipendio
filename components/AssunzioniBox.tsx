const ASSUNZIONI = [
  { voce: "Contratto", assunzione: "Tempo indeterminato (CDI), anno intero" },
  { voce: "Residenza", assunzione: "Milano, Lombardia" },
  { voce: "Carichi familiari", assunzione: "Nessuno" },
  {
    voce: "Agevolazioni",
    assunzione: "Nessuna (no Under 36, no Bonus Mamme, ecc.)",
  },
  { voce: "Mensilità", assunzione: "13 (tredicesima inclusa)" },
  { voce: "Add. regionale", assunzione: "Lombardia — 4 scaglioni: 1,23% / 1,58% / 1,72% / 1,73%" },
  { voce: "Add. comunale", assunzione: "Milano 0,80% · esente se imponibile ≤ 23.000 €" },
  { voce: "TFR", assunzione: "Non incluso (accantonamento, non trattenuta)" },
];

export default function AssunzioniBox() {
  return (
    <div className="bg-surface-alt border border-border rounded-md px-4 py-3">
      <p className="text-sm font-medium text-text-secondary mb-3">
        ℹ️ Assunzioni e semplificazioni adottate
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5">
        {ASSUNZIONI.map(({ voce, assunzione }) => (
          <div key={voce} className="flex gap-2 text-sm">
            <span className="text-text-tertiary shrink-0 w-36">{voce}</span>
            <span className="text-text-primary">{assunzione}</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-text-tertiary italic mt-3">
        Il calcolatore copre il caso base standard. Casi particolari (part-time,
        agevolazioni contributive, detrazioni familiari) saranno supportati nelle
        versioni successive.
      </p>
    </div>
  );
}
