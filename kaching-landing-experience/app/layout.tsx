import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./cardeify-theme.css";

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

export const viewport: Viewport = {
  themeColor: "#1A1A1A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  applicationName: "Cardeify",
  title: "Cardeify — Know which card to use before you pay",
  description: "Cardeify turns a multi-card wallet into one exact-rupee decision before payment, with a transparent rule and data path behind the recommendation.",
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
    title: "Cardeify — Know which card to use before you pay",
    description: "One wallet-aware recommendation in rupees, before payment.",
    siteName: "Cardeify",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cardeify — Know which card to use before you pay",
    description: "One wallet-aware recommendation in rupees, before payment.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body className={`${geist.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
