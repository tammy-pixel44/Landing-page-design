import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./cardeify-theme.css";
import "./editorial-v4.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  themeColor: "#171717",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  applicationName: "Cardeify",
  title: "Cardeify — One wallet. One decision.",
  description: "Cardeify helps a multi-card wallet resolve reward rules into one clear card recommendation in rupees before payment.",
  keywords: ["Cardeify", "credit card rewards", "cashback", "credit card optimizer", "India credit cards", "card recommendation"],
  authors: [{ name: "Cardeify" }],
  creator: "Cardeify",
  publisher: "Cardeify",
  category: "finance",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    title: "Cardeify — One wallet. One decision.",
    description: "A wallet-aware card recommendation in rupees, before payment.",
    siteName: "Cardeify",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cardeify — One wallet. One decision.",
    description: "A wallet-aware card recommendation in rupees, before payment.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body className={`${geist.variable} ${geistMono.variable} ${display.variable}`}>{children}</body>
    </html>
  );
}
