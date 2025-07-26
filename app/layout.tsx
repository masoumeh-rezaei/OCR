import './globals.css';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { LocaleProvider } from '@/lib/localeContext';
import ReactQueryProvider from '@/app/providers/react-query-provider';
import { UserProvider } from '@/context/UserContext';
import ClientSection from '@/component/ClientSection';
import { Toaster } from 'react-hot-toast';
import React from 'react';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body>
        <LocaleProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <ReactQueryProvider>
                    <UserProvider>

                        <main>{children}</main>
                        <Toaster
                            position="top-center"
                            toastOptions={{
                                duration: 3000,
                                style: {
                                    background: '#1e4e78',
                                    color: '#fff',
                                },
                            }}
                        />
                        <ClientSection />
                    </UserProvider>
                </ReactQueryProvider>
            </NextIntlClientProvider>
        </LocaleProvider>
        </body>
        </html>
    );
}
