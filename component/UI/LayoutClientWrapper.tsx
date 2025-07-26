'use client';

import { usePathname } from 'next/navigation';
import Header from '@/component/Header/header';
import Footer from '@/component/footer';
import ClientSection from '@/component/ClientSection';
import { Toaster } from 'react-hot-toast';
import React from "react";

export default function LayoutClientWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // مسیرهایی که نباید Navbar/Footer داشته باشن (بعد از login)
    const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/file-browser') || pathname.startsWith('/upload-page') || pathname.startsWith('/calculate');

    if (isProtectedRoute) {
        return (
            <>
                {children}
                <Toaster
                    position="top-center"
                    toastOptions={{
                        duration: 3000,
                        style: { background: '#1e4e78', color: '#fff' },
                    }}
                />
            </>
        );
    }

    return (
        <>
            <Header />
            {children}
            <Footer />
            <ClientSection />
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000,
                    style: { background: '#1e4e78', color: '#fff' },
                }}
            />
        </>
    );
}
