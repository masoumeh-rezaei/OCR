'use client';

import { Eye, EyeOff, Lock } from 'lucide-react';
import { FaUserAlt } from 'react-icons/fa';
import InputWithIcon from '../InputWithIcon';
import Link from 'next/link';
import { useLoginForm } from '@/hooks/Forms/useLoginForm';

export default function LoginForm() {
    const {
        t,
        state,
        dispatch,
        register,
        handleSubmit,
        errors,
        onSubmit,
        isPending,
    } = useLoginForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <InputWithIcon
                label={t('username')}
                icon={<FaUserAlt />}
                inputProps={{
                    ...register('username'),
                    placeholder: t('username_placeholder'),
                    type: 'email',
                }}
                error={errors.username?.message}
            />

            <InputWithIcon
                label={t('password')}
                icon={<Lock />}
                inputProps={{
                    ...register('password'),
                    type: state.showPassword ? 'text' : 'password',
                    placeholder: t('password_placeholder'),
                }}
                error={errors.password?.message}
            >
                <button
                    type="button"
                    onClick={() => dispatch({ type: 'TOGGLE_PASSWORD' })}
                    className="ml-2 text-gray-400"
                >
                    {state.showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </InputWithIcon>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 dark:bg-yellowTitle/90 dark:hover:bg-yellowTitle text-white font-semibold py-3 rounded-lg hover:bg-blue-900 transition disabled:opacity-50 dark:text-darkblue"
            >
                {isPending ? t('loading') : t('submit')}
            </button>

            <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-200">
                <Link href="/forget-password" className="text-blue-600 hover:underline dark:text-blue-200">
                    {t('forgot_password')}
                </Link>
            </p>

            <p className="text-center text-sm text-gray-600 mt-6 dark:text-gray-200">
                {t('signup_prompt')}{' '}
                <Link href="/signup" className="text-[#1e4e78] font-medium hover:underline dark:text-lightTitle">
                    {t('signup_link')}
                </Link>
            </p>
        </form>
    );
}
