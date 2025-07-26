'use client';

// import AuthLayout from '@/component/layout/AuthLayout';
// import { FaKey } from 'react-icons/fa';
// import BackgroundCircles from '@/component/BackgroundCircles';
// import ResetPasswordForm from '@/component/Forms/ResetPasswordForm';
import {ResetPasswordDesktop} from '@/component/ForgetPass/resendCode'
// import { useTranslations } from 'next-intl';

export default function ResetPasswordPage() {
    //const t = useTranslations('resetpass');

    return (
        // <AuthLayout
        //     title={t('title')}
        //     icon={<FaKey className="w-10 h-10 text-[#1e4e78]" />}
        //     backgroundCircles={<BackgroundCircles />}
        // >
        //     <ResetPasswordForm />
        // </AuthLayout>
        <>
        <ResetPasswordDesktop/>
        </>
    );
}
