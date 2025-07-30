'use client';

import { useProtected } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function DashboardPage() {
    const router = useRouter();
    const { data, isLoading, isError } = useProtected();

    useEffect(() => {
        if (!isLoading && (isError || !data)) {
            router.push('/login');
        }
    }, [isLoading, isError, data, router]);

    if (isLoading) {
        return <p className="pt-[150px] px-6">⏳ Loading...</p>;
    }

    if (isError || !data) {
        return null; // Wait for useEffect to redirect
    }

    return (
        <div className="p-6 pt-[150px] dark:bg-darkBg">
            <h1 className="text-2xl font-bold mb-4">🎉 Welcome to your Dashboard</h1>

            <div className="space-y-2 text-gray-800 dark:text-gray-200">
                <p>👤 Your Role: <strong>{data.role}</strong></p>
                <p>🆔 Your ID: <strong>{data.user_id}</strong></p>
                <p>👨‍💼 Main User ID: <strong>{data.main_user_id}</strong></p>
                <p>🔐 Permissions: <strong>{data.permissions.join(', ') || 'None'}</strong></p>
            </div>
        </div>
    );
}
