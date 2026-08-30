import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KaChing — Know the card before the tap",
  description: "An interaction-first concept for KaChing's exact-rupee credit-card decision experience.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
