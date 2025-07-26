
import AuthLayout from "@/component/layout/AuthLayout";
import {FaCheckCircle} from "react-icons/fa";
import BackgroundCircles from "@/component/BackgroundCircles";
import VerifyEmailForm from "@/component/Forms/VerifyEmailForm";
import { useTranslations } from 'next-intl';

export default function verifyPage() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const t = useTranslations('verify');
    return (
        <AuthLayout
            title={t('title')}
            icon={<FaCheckCircle className="w-10 h-10 text-[#1e4e78]" />}
            backgroundCircles={<BackgroundCircles />}
        >
            <VerifyEmailForm />
        </AuthLayout>

    );
}
