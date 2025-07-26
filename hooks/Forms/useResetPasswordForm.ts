'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@/lib/api/auth';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useCallback, useEffect, useState } from 'react';
import * as z from 'zod';

const schema = z.object({
    email: z.string().email('invalid_email'),
    code: z.string().min(1, 'required_code'),
    password: z.string().min(6, 'required_password'),
    confirm: z.string().min(6, 'required_confirm'),
}).refine((data) => data.password === data.confirm, {
    message: 'mismatch_password',
    path: ['confirm'],
});

export type ResetFormData = z.infer<typeof schema>;

export function useResetPasswordForm() {
    const t = useTranslations('resetpass');
    const router = useRouter();

    const storedEmail = typeof window !== 'undefined' ? localStorage.getItem('reset_email') || '' : '';

    const [timer, setTimer] = useState(120);
    const [codeVisible, setCodeVisible] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm<ResetFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: storedEmail,
        },
    });

    useEffect(() => {
        if (storedEmail) setValue('email', storedEmail);
        setCodeVisible(true);
        setTimer(120);
    }, [setValue, storedEmail]);

    useEffect(() => {
        if (!codeVisible || timer <= 0) return;
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [codeVisible, timer]);

    const mutation = useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            toast.success(t('success'));
            setTimeout(() => router.push('/login'), 2000);
        },
        onError: (error: unknown) => {
            let msg = t('error');
            if (error instanceof AxiosError && error.response?.data?.msg) {
                msg = t(error.response.data.msg);
            }
            toast.error(msg);
        },
    });

    const onSubmit: SubmitHandler<ResetFormData> = useCallback(
        (data) => {
            mutation.mutate(data);
        },
        [mutation]
    );

    return {
        t,
        register,
        handleSubmit,
        errors,
        isSubmitting: isSubmitting || mutation.isPending,
        onSubmit,
        codeVisible,
        timer,
    };
}
