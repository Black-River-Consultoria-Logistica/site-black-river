import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Black River Consultoria",
  description:
    "Consultoria em logística com a bagagem de quem esteve à frente de grandes operações do varejo.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
