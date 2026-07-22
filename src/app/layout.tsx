import type { Metadata } from "next";
import { Fraunces, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import { LeadModalProvider } from "@/components/site/LeadModal";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: "/images/01-hero-banner.jpg",
        width: 1376,
        height: 768,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/01-hero-banner.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${manrope.variable} ${fraunces.variable} ${spaceMono.variable}`}
    >
      <body className={`${manrope.className} min-h-full flex flex-col`}>
        {/* Ahrefs analytics — React hoists async scripts into <head>. */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="h2dt32crqjKsOqLU81hisg"
          async
        />
        <LeadModalProvider>{children}</LeadModalProvider>
        <Analytics />
      </body>
    </html>
  );
}
