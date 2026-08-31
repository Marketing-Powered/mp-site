import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MAIOS — Marketing Powered AI Operating System',
  description:
    'Canonical CRM, attribution ledger, call intelligence, and agent runtime for Marketing Powered.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
