import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oftalmoale | Dra. María Alejandra Rojas",
  description:
    "Clínica oftalmológica de Dra. María Alejandra Rojas. Especialista en segmento anterior, cirugía de catarata y córnea. Solicite su cita.",
  openGraph: {
    title: "Oftalmoale | Dra. María Alejandra Rojas",
    description:
      "Cuidado oftalmológico preciso. Especialista en segmento anterior, cirugía de catarata y córnea.",
    locale: "es",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${figtree.variable} ${fraunces.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
