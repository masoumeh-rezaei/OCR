// app/forget-password/page.tsx
'use client';
import Foorgetpass from '@/component/ForgetPass/forgetpass'
import AuthLayout from '@/component/layout/AuthLayout';
import { FaEnvelope } from 'react-icons/fa';
import BackgroundCircles from '@/component/BackgroundCircles';
import ForgetPassForm from '@/component/Forms/ForgetPassForm';
import { useTranslations } from 'next-intl';

export default function ForgetPasswordPage() {
    const t = useTranslations('forgetpass');

    return (
        // <AuthLayout
        //     title={t('title')}
        //     icon={<FaEnvelope className="w-10 h-10 text-[#1e4e78]" />}
        //     backgroundCircles={<BackgroundCircles />}
        // >
        //     <ForgetPassForm />
        // </AuthLayout>
        <>
            <Foorgetpass/>
        </>
    );
}
