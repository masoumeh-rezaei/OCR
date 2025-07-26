'use client';

import { Mail } from 'lucide-react';
import InputWithIcon from '../InputWithIcon';
import { useForgetPassForm } from '@/hooks/Forms/useForgetPassForm';

export default function ForgetPassForm() {
    const {
        t,
        register,
        handleSubmit,
        errors,
        onSubmit,
        isPending,
    } = useForgetPassForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <InputWithIcon
                label={t('email_label')}
                icon={<Mail />}
                inputProps={{
                    ...register('email'),
                    type: 'email',
                    placeholder: t('email_placeholder'),
                }}
                error={errors.email?.message}
            />

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 dark:bg-yellowTitle/90 dark:hover:bg-yellowTitle text-white font-semibold py-3 rounded-lg hover:bg-blue-900 transition disabled:opacity-50 dark:text-darkblue"
            >
                {isPending ? t('loading') : t('submit')}
            </button>
        </form>
    );
}
