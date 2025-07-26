'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

type BillingPeriod = 'monthly' | 'yearly';

type Props = {
    value: BillingPeriod;
    onChangeAction: (value: BillingPeriod) => void;
};

export default function AnimatedBillingPeriodSelector({ value, onChangeAction }: Props) {
    const t = useTranslations('planModal');

    const options: { id: BillingPeriod; label: string }[] = [
        { id: 'monthly', label: t('monthly') },
        { id: 'yearly', label: t('yearly') },
    ];

    return (
        <div className="w-full max-w-xs mx-auto mt-5 ">
            <p className="text-center text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {t('select_billing')}
            </p>
            <div className="relative bg-gray-100 dark:bg-darkSlider rounded-full flex p-1 shadow-inner">
                {options.map((option) => {
                    const isSelected = option.id === value;
                    return (
                        <button
                            key={option.id}
                            onClick={() => onChangeAction(option.id)}
                            className={cn(
                                'relative bg-transparent flex-1 text-sm font-medium px-4 py-2 transition ',
                                isSelected
                                    ? ''
                                    : 'text-gray-700 hover:text-black dark:text-gray-300  dark:hover:text-white'
                            )}
                        >
                            {option.label}
                            {isSelected && (
                                <motion.div
                                    layoutId="billingToggle"
                                    className="absolute inset-0 z-0 text-white dark:text-white dark:bg-darkBg/40    rounded-full bg-blue/40"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
