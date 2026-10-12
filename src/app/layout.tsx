import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Google AI Pro — Official Student Subsidy (Bangladesh) | 18 Months for ৳349",
  description:
    "Unlock Gemini 1.5 Pro (2M context), NotebookLM Research, Veo & Imagen 3 visual creation, and 2TB Cloud Storage for 18 months at ৳349 BDT. Verified academic program for university students across Bangladesh.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  keywords: [
    "Google AI Pro",
    "Gemini Pro student offer",
    "Bangladesh student AI subscription",
    "NotebookLM student",
    "bKash AI payment",
    "Nagad AI payment",
    "BUET student discount",
    "DU student AI",
    "18 month Google AI Pro",
  ],
  authors: [{ name: "SubsCrypto Student AI Desk" }],
  openGraph: {
    title: "Google AI Pro Student Offer — 18-Month Plan for ৳349 BDT",
    description:
      "Exclusive academic grant pricing for Bangladeshi university students. Instant bKash, Nagad, and Rocket checkout.",
    type: "website",
    locale: "en_BD",
    siteName: "SubsCrypto — Google AI Pro Student Offer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Google AI Pro Student Offer — 18 Months for ৳349",
    description: "Gemini 1.5 Pro, NotebookLM, and 2TB Google One storage for Bangladeshi students.",
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
