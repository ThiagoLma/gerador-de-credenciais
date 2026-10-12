import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sistema de Onboarding e Gerador de Credenciais de Acesso',
  description:
    'Aplicação moderna e minimalista para gerar documentos de boas-vindas e credenciais de acesso para novos consultores.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-background text-slate-100 min-h-screen antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
