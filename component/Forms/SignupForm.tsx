// components/forms/SignupForm.tsx
'use client';

import { Eye, EyeOff, Lock } from 'lucide-react';
import { FaUserAlt } from 'react-icons/fa';
import InputWithIcon from '../InputWithIcon';
import { useSignupForm } from '@/hooks/Forms/useSignupForm';

export default function SignupForm() {
    const {
        t,
        state,
        dispatch,
        register,
        handleSubmit,
        errors,
        onSubmit,
        isPending,
    } = useSignupForm();

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

            <InputWithIcon
                label={t('confirm_password')}
                icon={<Lock />}
                inputProps={{
                    ...register('confirm_password'),
                    type: state.showConfirm ? 'text' : 'password',
                    placeholder: t('confirm_password_placeholder'),
                }}
                error={errors.confirm_password?.message}
            >
                <button
                    type="button"
                    onClick={() => dispatch({ type: 'TOGGLE_CONFIRM' })}
                    className="ml-2 text-gray-400"
                >
                    {state.showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </InputWithIcon>

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
