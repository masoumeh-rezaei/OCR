'use client';

import React, { useState, useCallback, useMemo } from 'react';
import clsx from 'clsx';

type FloatingInputProps = {
    id: string;
    name: string;
    label: string;
    value: string | undefined | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    error?: string;
};

const FloatingInput: React.FC<FloatingInputProps> = React.memo(
    ({
         id,
         name,
         label,
         value,
         onChange,
         type = 'text',
         icon,
         disabled = false,
         error,
     }) => {
        const [focused, setFocused] = useState(false);

        const isFloating = useMemo(() => {
            return focused || String(value || '').trim().length > 0;
        }, [focused, value]);

        const handleFocus = useCallback(() => setFocused(true), []);
        const handleBlur = useCallback(() => setFocused(false), []);

        return (
            <div className="relative w-full pt-6">
                {icon && (
                    <div className="absolute left-0 top-6 text-gray-800 dark:text-gray-300">
                        {icon}
                    </div>
                )}
                <input
                    id={id}
                    name={name}
                    type={type}
                    value={value ?? ''}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={disabled}
                    className={clsx(
                        'peer w-full text-gray-800 dark:text-gray-300 border-b-2 bg-transparent outline-none py-2 transition-all duration-300',
                        {
                            'pl-8': icon,
                            'cursor-not-allowed text-blue bg-gray-100 dark:bg-zinc-800': disabled,
                            'border-blue focus:border-blue': !error && !disabled,
                            'border-red-500 focus:border-red-600': error,
                        }
                    )}
                />
                <label
                    htmlFor={id}
                    className={clsx(
                        'absolute left-0 transition-all duration-300 pointer-events-none',
                        {
                            'top-0 text-sm text-blue dark:text-blue-300': isFloating && !error,
                            'top-0 text-sm text-red-500': isFloating && error,
                            'top-6 text-base text-gray-800 dark:text-gray-300': !isFloating,
                            'left-8': icon,
                        }
                    )}
                >
                    {label}
                </label>
            </div>
        );
    }
);

FloatingInput.displayName = 'FloatingInput';
export default FloatingInput;
