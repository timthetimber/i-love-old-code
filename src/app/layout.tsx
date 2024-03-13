import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { DataProvider } from '@/lib/data.context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'I Love Old Code',
  description: 'Just a place to store my old code snippets.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system'>
          <DataProvider>{children}</DataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
