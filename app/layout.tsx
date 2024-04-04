import { ModalProvider, ToasterProvider } from '@/components/Providers';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/libs/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'Manage your tasks easily and efficiently with Task Manager!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ModalProvider />
      <body className={cn(inter.className, 'bg-[#faf9f8]')}>
        {children}
        <ToasterProvider />
      </body>
    </html>
  );
}
