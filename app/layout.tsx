import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dieta Calculada - Controle sua alimentação de forma inteligente',
  description: 'Contabilize e consulte os macronutrientes de suas refeições em segundos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
