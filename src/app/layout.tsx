import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MathMaster 20 - Edición Oficial',
  description: 'Supera las 20 preguntas antes de que se agote el tiempo.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-slate-50 min-h-screen flex items-center justify-center p-4 selection:bg-indigo-100">
          {children}
      </body>
    </html>
  );
}
