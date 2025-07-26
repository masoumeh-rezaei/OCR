'use client';

import { useState, useRef, useEffect } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { useLocaleContext } from '@/lib/localeContext';
import clsx from 'clsx';

type LanguageDropdownProps = {
    direction?: 'up' | 'down'; // جهت باز شدن
};

const languages = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' }
];

export default function LanguageDropdown({ direction = 'down' }: LanguageDropdownProps) {
    const { locale, setLocale } = useLocaleContext();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = () => setOpen((prev) => !prev);

    const handleSelect = (lang: string) => {
        setLocale(lang);
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!dropdownRef.current?.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative ml-3" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="flex items-center gap-1 px-3 py-1 rounded-md bg-white dark:bg-gray-800 text-sm font-medium dark:text-white hover:shadow transition-all"
            >
                {locale.toUpperCase()}
                <HiChevronDown
                    className={clsx(
                        'transition-transform duration-300',
                        open && 'rotate-180'
                    )}
                />
            </button>

            <div
                className={clsx(
                    // محل قرارگیری بر اساس جهت
                    direction === 'up'
                        ? 'absolute right-0 bottom-full mb-2 origin-bottom'
                        : 'absolute right-0 top-full mt-2 origin-top',
                    // ظاهر عمومی
                    'w-32 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 overflow-hidden transform transition-all',
                    open ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
                )}
            >
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => handleSelect(lang.code)}
                        className={clsx(
                            'w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition dark:text-gray-100',
                            lang.code === locale && 'bg-gray-100 dark:bg-gray-700 font-semibold dark:hover:bg-gray-800'
                        )}
                    >
                        {lang.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
