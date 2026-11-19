import type { Metadata } from "next";
import { Fraunces, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import TawkChat from "@/components/TawkChat";
import { LeadModalProvider } from "@/components/site/LeadModal";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site";
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';

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

/* Branded share image (1200×630): wordmark, the homepage headline, and the
   domain on the Midnight Atelier canvas. The headline it carries is repeated
   in real page text, so no claim lives only in the image. */
const SHARE_IMAGE = {
  url: "/images/pages/home/og-share.jpg",
  width: 1200,
  height: 630,
  alt: SITE_TITLE,
};

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
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SHARE_IMAGE.url],
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
        <LeadModalProvider>{children}</LeadModalProvider>
        <Analytics />
        <VercelAnalytics />
        <TawkChat />
      </body>
    </html>
  );
}
