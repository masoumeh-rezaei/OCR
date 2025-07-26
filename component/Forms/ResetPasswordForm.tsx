'use client';

import InputWithIcon from '@/component/InputWithIcon';
import { FaLock, FaKey } from 'react-icons/fa';
import { useResetPasswordForm } from '@/hooks/Forms/useResetPasswordForm';

export default function ResetPasswordForm() {
    const {
        t,
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
        codeVisible,
        timer,
    } = useResetPasswordForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <input type="hidden" {...register('email')} />

            <InputWithIcon
                label={t('code_label')}
                icon={<FaKey />}
                inputProps={{
                    ...register('code'),
                    placeholder: t('code_placeholder'),
                }}
                error={errors.code?.message && t(errors.code.message)}
            />

            <InputWithIcon
                label={t('password_label')}
                icon={<FaLock />}
                inputProps={{
                    ...register('password'),
                    type: 'password',
                    placeholder: t('password_placeholder'),
                }}
                error={errors.password?.message && t(errors.password.message)}
            />

            <InputWithIcon
                label={t('confirm_label')}
                icon={<FaLock />}
                inputProps={{
                    ...register('confirm'),
                    type: 'password',
                    placeholder: t('confirm_placeholder'),
                }}
                error={errors.confirm?.message && t(errors.confirm.message)}
            />

            {codeVisible && timer > 0 && (
                <div className="text-center text-sm text-gray-500">
                    {t('resend_code_in')} {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 dark:bg-yellowTitle/90 dark:hover:bg-yellowTitle text-white font-semibold text-xl py-3 rounded-lg hover:bg-blue-900 transition disabled:opacity-50 dark:text-darkblue"
            >
                {isSubmitting ? t('loading') : t('submit')}
            </button>
        </form>
    );
}
