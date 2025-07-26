'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type LocaleContextType = {
    locale: string;
    setLocale: (lang: string) => void;
};

const LocaleContext = createContext<LocaleContextType>({
    locale: 'en',
    setLocale: () => {},
});

export const useLocaleContext = () => useContext(LocaleContext);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState('en');
    const router = useRouter();

    useEffect(() => {
        const match = document.cookie.match(/(?:^|; )MYNEXTAPP_LOCALE=([^;]*)/);
        if (match) setLocaleState(decodeURIComponent(match[1]));
    }, []);

    const setLocale = (lang: string) => {
        document.cookie = `MYNEXTAPP_LOCALE=${lang}; path=/; max-age=31536000`;
        setLocaleState(lang);
        router.refresh();
    };

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            {children}
        </LocaleContext.Provider>
    );
}
