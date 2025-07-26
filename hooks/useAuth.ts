// hooks/useAuth.ts
import { useQuery } from '@tanstack/react-query';
import { fetchMe, fetchProtectedContent } from '@/lib/api/auth';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuth = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const {
        data,
        isLoading: isFetching,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['me'],
        queryFn: fetchMe,
        retry: false,
        enabled: isClient,
    });


    useEffect(() => {
        if (
            isError &&
            axios.isAxiosError(error) &&
            error.response?.status === 401
        ) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        }
    }, [isError, error]);

    const isLoading = !isClient || isFetching;
    const isAuthenticated = !isError && !!data;

    return {
        user: data,
        isAuthenticated,
        isLoading,
        isError,
        error,
        refetch,
    };
};

export const useProtected = () => {
    return useQuery({
        queryKey: ['protected'],
        queryFn: fetchProtectedContent,
        retry: false,
    });
};
