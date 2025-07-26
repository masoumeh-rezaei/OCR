'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { verifyEmailCode, resendVerificationCode } from '@/lib/api/auth';
import { AxiosError } from 'axios';

interface FormData {
    code: string;
}

export function useVerifyEmailForm() {
    const t = useTranslations('verify');
    const router = useRouter();
    const [resendCooldown, setResendCooldown] = useState(120);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const formatTime = useCallback((seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }, []);

    useEffect(() => {
        if (resendCooldown === 0) return;
        intervalRef.current = setInterval(() => {
            setResendCooldown((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current!);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(intervalRef.current!);
    }, [resendCooldown]);

    const verifyMutation = useMutation({
        mutationFn: (data: FormData) => verifyEmailCode(data.code),
        onSuccess: () => {
            toast.success(t('success'));
            setTimeout(() => router.push('/pricing'), 1500);
        },
        onError: (err: AxiosError<{ msg: string }>) => {
            toast.error(t(err.response?.data?.msg || 'invalid_or_expired'));
        },
    });

    const resendMutation = useMutation({
        mutationFn: resendVerificationCode,
        onSuccess: () => {
            toast.success(t('resend_success'));
            setResendCooldown(120);
        },
        onError: (err: AxiosError<{ msg: string }>) => {
            toast.error(t(err.response?.data?.msg || 'error'));
        },
    });

    const onSubmit: SubmitHandler<FormData> = useCallback(
        (data) => verifyMutation.mutate(data),
        [verifyMutation]
    );

    return {
        t,
        register,
        handleSubmit,
        errors,
        onSubmit,
        formatTime,
        resendCooldown,
        isVerifying: verifyMutation.isPending,
        resend: resendMutation.mutate,
    };
}
