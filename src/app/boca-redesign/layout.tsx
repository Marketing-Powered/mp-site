import type { Metadata } from "next";
import { Playfair_Display, Figtree } from "next/font/google";
import "./boca.css";

// Boca's real brand pairing: Playfair Display (serif headings) + Figtree (body)
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Boca Recovery Center | Quality Addiction Treatment Built Around You",
  description:
    "Compassionate, evidence-based alcohol & drug rehab across Florida, New Jersey, Indiana & Massachusetts. 80% of patients complete treatment. Confidential & free — call (800) 516-4357.",
};

export default function BocaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`boca-root ${playfair.variable} ${figtree.variable}`}>
      {children}
    </div>
  );
}
