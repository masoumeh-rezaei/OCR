// app/signup/page.tsx
import AuthLayout from '@/component/layout/AuthLayout';
import SignupForm from '@/component/Forms/SignupForm';
import BackgroundCircles from '@/component/BackgroundCircles';
import { FaUserAlt } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export default function SignupPage() {
    const t = useTranslations('signup');

    return (
        <AuthLayout
            title={t('title')}
            icon={<FaUserAlt className="w-10 h-10 text-[#1e4e78]" />}
            backgroundCircles={<BackgroundCircles />}
        >
            <SignupForm />
        </AuthLayout>
    );
}
