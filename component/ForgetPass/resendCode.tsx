'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FaLock, FaKey } from 'react-icons/fa';
import InputWithIcon from '@/component/InputWithIcon';
import BackgroundCircles from '@/component/BackgroundCircles';
import { resetPassword, showResetCode } from '@/lib/api/auth';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface ResetFormData {
    email: string;
    code: string;
    password: string;
    confirm: string;
}

interface ApiResponse {
    msg: string;
}

const useResetPasswordForm = () => {
    const t = useTranslations('resetpass');
    const router = useRouter();

    const storedEmailRef = useRef('');
    const storedCodeRef = useRef('');

    if (typeof window !== 'undefined') {
        storedEmailRef.current = localStorage.getItem('reset_email') || '';
        storedCodeRef.current = localStorage.getItem('reset_code') || '';
    }

    const [timer, setTimer] = useState(120);
    const [codeVisible, setCodeVisible] = useState(true);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ResetFormData>({
        defaultValues: {
            email: storedEmailRef.current,
            code: storedCodeRef.current,
        },
    });

    useEffect(() => {
        setTimer(120);
        setCodeVisible(true);
    }, []);

    useEffect(() => {
        if (!codeVisible || timer <= 0) return;
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [codeVisible, timer]);

    const mutation = useMutation<ApiResponse, unknown, ResetFormData>({
        mutationFn: resetPassword,
        onSuccess: (data) => {
            toast.success(data.msg);
            setTimeout(() => router.push('/login'), 2000);
        },
        onError: (error) => {
            let msg = t('error');
            if (error instanceof AxiosError && error.response?.data?.msg) {
                msg = error.response.data.msg;
            }
            toast.error(msg);
        },
    });

    const onSubmit: SubmitHandler<ResetFormData> = (formData) => {
        if (formData.password !== formData.confirm) {
            toast.error(t('mismatch_password'));
            return;
        }
        mutation.mutate(formData);
    };

    const handleResendCode = async () => {
        await toast.promise(
            showResetCode(storedEmailRef.current).then((newCode) => {
                localStorage.setItem('reset_code', newCode);
                setValue('code', newCode);
                setTimer(120);
            }),
            {
                loading: t('loading'),
                success: t('code_resent_success'),
                error: t('error'),
            }
        );
    };

    return {
        t,
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting,
        codeVisible,
        timer,
        handleResendCode,
        isResetting: mutation.isPending,
    };
};

const FormContent = ({
                         t,
                         register,
                         handleSubmit,
                         onSubmit,
                         errors,
                         isSubmitting,
                         codeVisible,
                         timer,
                         handleResendCode,
                         isResetting,
                     }: ReturnType<typeof useResetPasswordForm>) => (
    <div className="w-full max-w-md rounded-xl p-8">
        <h2 className="text-center text-3xl mb-8 font-semibold text-gray-800 dark:text-white">
            {t('title')}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <input type="hidden" {...register('email')} />

            <InputWithIcon
                label={t('code_label')}
                icon={<FaKey />}
                inputProps={{
                    ...register('code', { required: true }),
                    placeholder: t('code_placeholder'),
                }}
                error={errors.code && t('required_code')}
            />
            <InputWithIcon
                label={t('password_label')}
                icon={<FaLock />}
                inputProps={{
                    ...register('password', { required: true }),
                    placeholder: t('password_placeholder'),
                    type: 'password',
                }}
                error={errors.password && t('required_password')}
            />
            <InputWithIcon
                label={t('confirm_label')}
                icon={<FaLock />}
                inputProps={{
                    ...register('confirm', { required: true }),
                    placeholder: t('confirm_placeholder'),
                    type: 'password',
                }}
                error={errors.confirm && t('required_confirm')}
            />

            {codeVisible && timer > 0 && (
                <div className="text-center text-sm text-gray-500">
                    {t('resend_code_in')} {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
                </div>
            )}

            {codeVisible && timer <= 0 && (
                <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-blue-600 hover:underline text-sm mt-2 block text-center"
                >
                    {t('resend_code')}
                </button>
            )}

            <button
                type="submit"
                disabled={isSubmitting || isResetting}
                className="w-full bg-blue-600 dark:bg-yellowTitle/90 dark:hover:bg-yellowTitle text-white font-semibold text-xl py-3 rounded-lg hover:bg-blue-900 transition disabled:opacity-50 dark:text-darkblue"
            >
                {isSubmitting || isResetting ? t('loading') : t('submit')}
            </button>
        </form>
    </div>
);

export function ResetPasswordDesktop() {
    const props = useResetPasswordForm();
    return (
        <div className="hidden lg:flex h-screen w-full bg-gradient-to-b from-blue-950 to-darkblue dark:from-[#0a2540] dark:via-[#0b2e53] dark:to-[#020c1b]">
            <div className="flex w-[75%] bg-white dark:bg-transparent m-auto h-[80%] rounded-lg">
                <div className="w-1/2 relative flex items-center justify-center overflow-hidden rounded-lg">
                    <BackgroundCircles />
                </div>
                <div className="w-1/2 flex items-center justify-center px-10">
                    <FormContent {...props} />
                </div>
            </div>
        </div>
    );
}

export function ResetPasswordTablet() {
    const props = useResetPasswordForm();
    return (
        <div className="hidden sm:flex lg:hidden h-screen w-full bg-gradient-to-b from-blue-950 to-darkblue dark:from-[#0a2540] dark:via-[#0b2e53] dark:to-[#020c1b] items-center justify-center">
            <div className="w-[90%] bg-white dark:bg-transparent h-[80%] rounded-lg flex items-center justify-center px-6">
                <FormContent {...props} />
            </div>
        </div>
    );
}
