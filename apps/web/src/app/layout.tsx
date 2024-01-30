import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import '@streamzio/ui/build/style.css';

import RecoilProvider from '@/components/providers/RecoilProvider';
import ToasterProvider from '@/components/providers/ToasterProvider';
import SocketProvider from '@/components/providers/SocketProvider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Streamzio',
    description: 'Stream to the world from here.'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} dark`}>
                <ToasterProvider>
                    <ClerkProvider>
                        <RecoilProvider>
                            <SocketProvider>{children}</SocketProvider>
                        </RecoilProvider>
                    </ClerkProvider>
                </ToasterProvider>
            </body>
        </html>
    );
}
