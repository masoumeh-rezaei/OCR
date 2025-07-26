'use client';

import { useQuery } from '@tanstack/react-query';
import { getSubUsers } from '@/lib/api/auth';
import SubUserCard from './SubUserCard';
import { useTranslations } from 'next-intl';
import type { AxiosError } from 'axios';

interface SubUser {
    id: string;
    name: string;
    last_name: string;
    email: string;
    role: string;
    position?: string;
    is_email_verified: boolean;
    created_at?: string;
}

type APIError = {
    msg: string;
};

export default function SubUsersList() {
    const { data, isLoading, isError, error } = useQuery<SubUser[], AxiosError<APIError>>({
        queryKey: ['subusers'],
        queryFn: getSubUsers,
    });

    const t = useTranslations('subusers');

    if (isLoading) return <p>{t('loading')}</p>;
    if (isError) return <p>{t('error')}: {error.response?.data?.msg || t('unknown_error')}</p>;
    if (!data || !Array.isArray(data)) return <p>{t('no_data')}</p>;

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {data.map((user) => (
                <SubUserCard key={user.id} user={user} />
            ))}
        </div>
    );
}
