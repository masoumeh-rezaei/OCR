// app/login/page.tsx
'use client';

import AuthLayout from '@/component/layout/AuthLayout';
import LoginForm from '@/component/Forms/LoginForm';
import BackgroundCircles from '@/component/BackgroundCircles';
import { Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
    const t = useTranslations('login');

    return (
        <AuthLayout
            title={t('title')}
            icon={<Lock className="w-10 h-10 text-[#1e4e78]" />}
            backgroundCircles={<BackgroundCircles />}
        >
            <LoginForm />
        </AuthLayout>
    );
}
