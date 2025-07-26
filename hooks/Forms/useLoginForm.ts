import { useTranslations } from 'next-intl';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useReducer } from 'react';
import { loginUser, LoginCredentials,getMySubscription  } from '@/lib/api/auth';
import toast from 'react-hot-toast';

type State = {
    showPassword: boolean;
    errorMessage: string;
};

type Action =
    | { type: 'TOGGLE_PASSWORD' }
    | { type: 'SET_ERROR'; payload: string }
    | { type: 'RESET_ERROR' };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'TOGGLE_PASSWORD':
            return { ...state, showPassword: !state.showPassword };
        case 'SET_ERROR':
            return { ...state, errorMessage: action.payload };
        case 'RESET_ERROR':
            return { ...state, errorMessage: '' };
        default:
            return state;
    }
}

export function useLoginForm() {
    const t = useTranslations('login');
    const router = useRouter();
    const queryClient = useQueryClient();

    const [state, dispatch] = useReducer(reducer, {
        showPassword: false,
        errorMessage: '',
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginCredentials>();

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: async (data) => {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);

            await queryClient.invalidateQueries({ queryKey: ['me'] });

            toast.success(t('toast_success'));

            try {
                const subscription = await getMySubscription();
                if (subscription) {
                    router.push('/dashboard');
                }
            } catch (e) {
                router.push('/pricing');
            }
        },
        onError: () => {
            dispatch({ type: 'SET_ERROR', payload: t('toast_error') });
            toast.error(t('toast_error'));
        },
    });

    const onSubmit: SubmitHandler<LoginCredentials> = useCallback((data) => {
        dispatch({ type: 'RESET_ERROR' });
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
