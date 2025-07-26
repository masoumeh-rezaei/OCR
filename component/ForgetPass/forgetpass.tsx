'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { FaEnvelope } from 'react-icons/fa';
import InputWithIcon from '@/component/InputWithIcon';
import BackgroundCircles from '@/component/BackgroundCircles';
import { forgetPassword, showResetCode } from '@/lib/api/auth';
import toast from 'react-hot-toast';

interface FormData {
    email: string;
}

export default function ForgetPasswordDesktopAndTablet() {
    const t = useTranslations('forgetpass');
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

    const forgetMutation = useMutation({
        mutationFn: forgetPassword,
        onSuccess: (_, email) => {
            showCodeMutation.mutate(email);
        },
        onError: (error: unknown) => {
            const msg = error instanceof Error ? error.message : t('error');
            toast.error(msg);
        },
    });

    const showCodeMutation = useMutation({
        mutationFn: showResetCode,
        onSuccess: (receivedCode, email) => {
            toast.success(t('success'));
            localStorage.setItem('reset_email', email);
            localStorage.setItem('reset_code', receivedCode);
            setTimeout(() => router.push('/forget-password/reset-password'), 1500);
        },
        onError: (error: unknown) => {
            const msg = error instanceof Error ? error.message : t('error');
            toast.error(msg);
        },
    });

    const onSubmit: SubmitHandler<FormData> = (formData) => {
        forgetMutation.reset();
        showCodeMutation.reset();
        forgetMutation.mutate(formData.email);
    };

    return (
        <div className="hidden sm:flex h-screen w-full bg-gradient-to-b from-blue-950 to-darkblue dark:from-[#0a2540] dark:via-[#0b2e53] dark:to-[#020c1b]">
            <div className="flex w-[80%] bg-white dark:bg-transparent m-auto h-[80%] rounded-lg">
                <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden rounded-lg">
                    <BackgroundCircles />
                </div>

                <div className="w-full lg:w-1/2 flex items-center justify-center px-10">
                    <div className="w-full max-w-md p-10 rounded-xl">
                        <h2 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-white">
                            {t('title') || 'Reset Password'}
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <InputWithIcon
                                label={t('email_label') || 'Email'}
                                icon={<FaEnvelope />}
                                inputProps={{
                                    ...register('email', { required: true }),
                                    type: 'text',
                                    placeholder: t('email_placeholder') || 'Enter your email',
                                }}
                                error={errors.email && t('required_email')}
                            />

                            <button
                                type="submit"
                                disabled={isSubmitting || forgetMutation.isPending || showCodeMutation.isPending}
                                className="w-full bg-blue-600 dark:bg-yellowTitle/90 dark:hover:bg-yellowTitle text-white font-semibold text-xl py-3 rounded-lg hover:bg-blue-900 transition disabled:opacity-50 dark:text-darkblue"
                            >
                                {(isSubmitting || forgetMutation.isPending || showCodeMutation.isPending)
                                    ? t('loading')
                                    : t('submit')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}