'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { forgetPassword } from '@/lib/api/auth';
import toast from 'react-hot-toast';
import { useCallback } from 'react';
import * as z from 'zod';

const schema = z.object({
    email: z.string().min(1, 'required_email').email('invalid_email'),
});

type FormData = z.infer<typeof schema>;

export function useForgetPassForm() {
    const t = useTranslations('forgetpass');
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const mutation = useMutation({
        mutationFn: forgetPassword,
        onSuccess: (_, email) => {
            toast.success(t('success'));
            localStorage.setItem('reset_email', email);
            setTimeout(() => router.push('/forget-password/reset-password'), 1500);
        },
        onError: (error: unknown) => {
            const msg = error instanceof Error ? error.message : t('error');
            toast.error(msg);
        },
    });

    const onSubmit: SubmitHandler<FormData> = useCallback(
        (formData) => {
            mutation.reset();
            mutation.mutate(formData.email);
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
        isPending: mutation.isPending,
    };
}
