'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { fetchMe } from '@/lib/api/auth';
import { setLogoutCallback } from '@/lib/axiosClient';
import { useRouter } from 'next/navigation';

type User = {
    username: string;
    role: string;
    user_id: string;
    main_user_id: number;
    permissions: string[];
    is_email_verified?: boolean;
};

type UserContextType = {
    user: User | null;
    isLoggedIn: boolean;
    loading: boolean;
    logout: () => void;
    setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType>({
    user: null,
    isLoggedIn: false,
    loading: true,
    logout: () => {},
    setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
        router.push('/login');
    };

    useEffect(() => {
        setLogoutCallback(logout);

        const loadUser = async () => {
            try {
                const userData = await fetchMe();
                setUser(userData);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, isLoggedIn: !!user, loading, logout, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
