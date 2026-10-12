import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Gemini 3 Pro + 5TB Storage — Official Student Subsidy (Bangladesh) | 18 Months for ৳349",
  description:
    "Unlock Gemini 3 Pro, 5TB Google One Cloud Storage, NotebookLM Research, and Veo for 18 months at only ৳349 BDT. Save approx ৳35,000 with the student allocation grant. Limited slots remaining!",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  keywords: [
    "Gemini 3 Pro",
    "Gemini 3 Pro student offer",
    "5TB Google storage",
    "Google AI Pro student Bangladesh",
    "NotebookLM student",
    "bKash AI payment",
    "Nagad AI payment",
    "BUET student discount",
    "DU student AI",
    "18 month Gemini 3 Pro pass",
  ],
  authors: [{ name: "SubsCrypto Student AI Desk" }],
  openGraph: {
    title: "Gemini 3 Pro + 5TB Cloud Storage — 18 Months for ৳349 (Save ৳35,000)",
    description:
      "Exclusive academic grant pricing for Bangladeshi university students. Gemini 3 Pro & 5 TB storage for only ৳349 BDT. Instant bKash/Nagad/Rocket checkout.",
    type: "website",
    locale: "en_BD",
    siteName: "SubsCrypto — Gemini 3 Pro 5TB Student Offer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gemini 3 Pro + 5TB Storage — 18 Months for ৳349 (Save ৳35,000)",
    description: "Gemini 3 Pro, 5TB Cloud Storage, and NotebookLM for Bangladeshi students. Limited slots left!",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased min-h-screen selection:bg-indigo-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
