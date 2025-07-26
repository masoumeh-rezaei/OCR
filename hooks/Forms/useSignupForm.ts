// hooks/useSignupForm.ts
'use client';

import { useReducer, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { signupUser } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

export type SignupCredentials = {
    username: string;
    password: string;
    confirm_password: string;
};

type State = {
    showPassword: boolean;
    showConfirm: boolean;
    errorMessage: string;
    successMessage: string;
};

const initialState: State = {
    showPassword: false,
    showConfirm: false,
    errorMessage: '',
    successMessage: '',
};

type Action =
    | { type: 'TOGGLE_PASSWORD' }
    | { type: 'TOGGLE_CONFIRM' }
    | { type: 'SET_ERROR'; payload: string }
    | { type: 'SET_SUCCESS'; payload: string }
    | { type: 'RESET_MESSAGES' };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'TOGGLE_PASSWORD':
            return { ...state, showPassword: !state.showPassword };
        case 'TOGGLE_CONFIRM':
            return { ...state, showConfirm: !state.showConfirm };
        case 'SET_ERROR':
            return { ...state, errorMessage: action.payload, successMessage: '' };
        case 'SET_SUCCESS':
            return { ...state, successMessage: action.payload, errorMessage: '' };
        case 'RESET_MESSAGES':
            return { ...state, errorMessage: '', successMessage: '' };
        default:
            return state;
    }
}

export function useSignupForm() {
    const t = useTranslations('signup');
    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, initialState);

    // ✅ ایجاد اسکیما ترجمه‌پذیر
    const SignupSchema = useMemo(() => {
        return z
            .object({
                username: z
                    .string()
                    .nonempty(t('required_username'))
                    .email(t('invalid_email')),
                password: z
                    .string()
                    .nonempty(t('required_password'))
                    .min(6, t('min_password')),
                confirm_password: z
                    .string()
                    .nonempty(t('required_confirm_password'))
                    .min(6, t('min_confirm_password')),
            })
            .refine((data) => data.password === data.confirm_password, {
                message: t('confirm_password_mismatch'),
                path: ['confirm_password'],
            });
    }, [t]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupCredentials>({
        resolver: zodResolver(SignupSchema),
        mode: 'onSubmit',
    });

    const mutation = useMutation({
        mutationFn: signupUser,
        onSuccess: () => {
            dispatch({ type: 'SET_SUCCESS', payload: t('success') });
            toast.success(t('toast_success'));
            setTimeout(() => router.push('/verify-email'), 2000);
        },
        onError: (error: AxiosError<{ msg: string }>) => {
            const message = error?.response?.data?.msg || t('toast_error');
            dispatch({ type: 'SET_ERROR', payload: message });
            toast.error(message);
        },
    });

    const onSubmit = useCallback((data: SignupCredentials) => {
        dispatch({ type: 'RESET_MESSAGES' });
        mutation.mutate(data);
    }, [mutation]);

    return {
        t,
        state,
        dispatch,
        register,
        handleSubmit,
        errors,
        onSubmit,
        isPending: mutation.isPending,
    };
}
