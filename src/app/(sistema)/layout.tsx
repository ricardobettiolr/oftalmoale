import type { Metadata } from "next";
import "./sistema.css";

export const metadata: Metadata = {
  title: "Oftalmoale · Gestión del consultorio",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
