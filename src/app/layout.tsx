'use client'
import ErrorBoundary from '@/errors';
import './globals.css';
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ErrorBoundary>
        <Providers>{children}</Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
