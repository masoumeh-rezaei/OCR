'use client';

import { useEffect, useState } from 'react';
import axiosClient from '@/lib/axiosClient';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import type { AxiosError } from 'axios';

interface ErrorResponse {
    msg?: string;
}

export function useSubUserCount() {
    const t = useTranslations('users');

    const [count, setCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const res = await axiosClient.get('/api/user/subuser-count');
                setCount(res.data.subuser_count);
            } catch (err) {
                const error = err as AxiosError<ErrorResponse>;
                const msg = error.response?.data?.msg || t('fetch_count_error');
                toast.error(msg);
                setError(msg);
            } finally {
                setLoading(false);
            }
        };

        void fetchCount();
    }, [t]);

    return { count, loading, error };
}
