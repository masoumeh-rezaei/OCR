'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
    children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            router.replace('/login');
        } else {
            setIsChecking(false); // فقط وقتی توکن هست، رندر کن
        }
    }, [router]);

    if (isChecking) return null;

    return <>{children}</>;
}
