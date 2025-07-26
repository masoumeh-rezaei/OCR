'use client';

import React, { useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

function buildLocalePath(locale: string, pathname: string) {
    const segments = pathname.split('/').filter(Boolean);

    if (segments.length > 0 && ['en', 'de'].includes(segments[0])) {
        segments[0] = locale;
    } else {
        segments.unshift(locale);
    }

    return '/' + segments.join('/');
}

const LocaleSwitcherButton: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';
    const [isPending, startTransition] = useTransition();

    const toggleLocale = () => {
        const nextLocale = locale === 'en' ? 'de' : 'en';
        const nextPath = buildLocalePath(nextLocale, pathname);

        startTransition(() => {
            router.replace(nextPath);
        });
    };

    return (
        <button
            onClick={toggleLocale}
            disabled={isPending}
            aria-label="Toggle Language"
            className={clsx(
                "w-8 h-8 ml-4 p-2 rounded-full bg-white text-black dark:bg-gray-800 dark:text-white transition flex items-center justify-center font-semibold select-none",
                isPending && "opacity-50 cursor-not-allowed"
            )}
        >
            {locale === 'en' ? 'DE' : 'EN'}
        </button>
    );
};

export default LocaleSwitcherButton;
