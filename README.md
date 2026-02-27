# Calcolatore Stipendio Netto 2026 — Jet HR

Prototipo di calcolatore **RAL → Netto** per dipendenti italiani. Inserisci la Retribuzione Annua Lorda e ottieni il netto annuale e mensile con il dettaglio completo di tutte le trattenute fiscali e contributive.

---

## Caratteristiche

- **Calcolo RAL → Netto** con breakdown completo voce per voce
- **Fiscalità 2026 aggiornata** — IRPEF 3 scaglioni (23% / 33% / 43%), Cuneo Fiscale Binario A e B, Trattamento Integrativo DL 3/2020
- **Contributi INPS corretti** — aliquota aggiuntiva 1% sulla quota eccedente 56.224 € (INPS Circ. 6/2026)
- **Addizionali regionali Lombardia** — 4 scaglioni progressivi (1,23% / 1,58% / 1,72% / 1,73%)
- **Addizionale comunale Milano** — 0,80% con soglia di esenzione a 23.000 €
- **Architettura modulare** — ogni step del calcolo è un file TypeScript separato e testato

## Profilo supportato (V1)

Il calcolatore copre il caso base standard:

| Parametro | Valore |
|---|---|
| Contratto | Tempo indeterminato (CDI), anno intero |
| Residenza | Milano, Lombardia |
| Carichi familiari | Nessuno |
| Agevolazioni | Nessuna |
| Mensilità | 13 (tredicesima inclusa) |

## Stack

- [Next.js 14](https://nextjs.org) — App Router
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)

## Come avviare il progetto

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.

```bash
# Esegui i test
npm test
```

## Struttura del progetto

```
lib/calculator/
├── constants.ts              # Tutte le soglie e aliquote fiscali 2026
├── inps.ts                   # Contributi INPS dipendente
├── imponibile.ts             # Base imponibile IRPEF
├── irpef.ts                  # IRPEF lorda (scaglioni)
├── detrazioni.ts             # Detrazioni lavoro dipendente art.13 TUIR
├── cuneo.ts                  # Cuneo fiscale Binario A e B
├── trattamentoIntegrativo.ts # Trattamento Integrativo DL 3/2020
├── addizionali.ts            # Addizionali regionali e comunali
└── index.ts                  # Orchestratore + tipo CalcoloResult

components/
├── RalInput.tsx              # Input RAL
├── ResultsPanel.tsx          # Breakdown risultati
└── AssunzioniBox.tsx         # Assunzioni e semplificazioni adottate
```
