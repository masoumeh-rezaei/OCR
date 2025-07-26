'use client';

import { FaCheckCircle, FaRedo } from 'react-icons/fa';
import InputWithIcon from '../InputWithIcon';
import { useVerifyEmailForm } from '@/hooks/Forms/useVerifyEmailForm';
import { useMemo } from 'react';

export default function VerifyEmailForm() {
    const {
        t,
        register,
        handleSubmit,
        errors,
        onSubmit,
        formatTime,
        resendCooldown,
        isVerifying,
        resend,
    } = useVerifyEmailForm();

    const resendSection = useMemo(() => {
        if (resendCooldown > 0) {
            return (
                <p className="text-sm text-center text-gray-500 dark:text-gray-300 mt-2">
                    {t('resend_wait')}:{' '}
                    <span className="font-mono">{formatTime(resendCooldown)}</span>
                </p>
            );
        }

        return (
            <button
                type="button"
                onClick={() => resend()}
                className="w-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white font-semibold text-sm py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 mt-2 flex items-center justify-center gap-2"
            >
                <FaRedo className="w-4 h-4" /> {t('resend')}
            </button>
        );
    }, [resendCooldown, t, formatTime, resend]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <InputWithIcon
                label={t('code_label')}
                icon={<FaCheckCircle />}
                inputProps={{
                    ...register('code', { required: true }),
                    placeholder: t('code_placeholder'),
                }}
                error={errors.code && t('required_code')}
            />

            <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-blue-600 dark:bg-yellowTitle/90 dark:hover:bg-yellowTitle text-white font-semibold text-xl py-3 rounded-lg hover:bg-blue-900 transition disabled:opacity-50 dark:text-darkblue"
            >
                {isVerifying ? t('loading') : t('verify_button')}
            </button>

            {resendSection}
        </form>
    );
}
