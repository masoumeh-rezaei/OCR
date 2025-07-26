'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { logoutUser } from '@/lib/api/auth';

export default function LogoutButton() {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const router = useRouter();
    const queryClient = useQueryClient();

    const handleLogout = useCallback(async () => {
        if (isLoggingOut) return; // جلوگیری از کلیک پشت‌سرهم
        setIsLoggingOut(true);
        try {
            await logoutUser(); // API call
            await queryClient.clear(); // پاک‌سازی کش
            router.push('/login');
        } catch (error) {
            console.error('❌ Error during logout:', error);
        } finally {
            setIsLoggingOut(false);
        }
    }, [isLoggingOut, queryClient, router]);

    return (
        <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`text-sm underline transition-colors duration-200 ${
                isLoggingOut
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-red-500 hover:text-red-700'
            }`}
        >
            {isLoggingOut ? 'در حال خروج...' : 'خروج'}
        </button>
    );
}
