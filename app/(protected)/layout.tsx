'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SidebarNav from '@/component/Header/SlidernavResponsive';
import NavWithSlider from '@/component/Header/NavWithSlider'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            router.replace('/login');
        } else {
            setIsReady(true);
        }
    }, [router]);

    if (!isReady) return null;

    return (
        <>

            <div className="flex h-screen overflow-hidden">
                <div>
                    <NavWithSlider/>
                    <SidebarNav />
                </div>
                <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-darkBg  lg:ml-64 md:ml-20">
                    {children}
                </main>
            </div>
        </>
    );
}
