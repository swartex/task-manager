import { ModalProvider, ToasterProvider } from '@/components/Providers';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'Manage your tasks easily and efficiently with Task Manager!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ModalProvider />
      <body className={inter.className}>
        {children}
        <ToasterProvider />
      </body>
    </html>
  );
}
