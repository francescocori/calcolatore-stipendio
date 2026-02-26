import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calcolatore Stipendio Netto 2026 — Jet HR",
  description:
    "Calcola il tuo stipendio netto annuale e mensile partendo dalla RAL. Anno fiscale 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-text-primary font-sans min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
