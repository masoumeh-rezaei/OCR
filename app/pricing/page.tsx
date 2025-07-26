'use client';

import { useState,useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import PlanModal from '@/component/Plans/PlanDetailsModal';

import {
    usePublicPlans,
    usePlanById,
    useMySubscription
} from '@/hooks/usePlans';

export default function PricingPage() {
    const t = useTranslations('pricing');
    const router = useRouter();
    const { data: subscription } = useMySubscription();

    useEffect(() => {
        if (subscription) {
            router.replace('/dashboard');
        }
    }, [subscription, router]);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

    const {
        data: plans,
        isLoading,
        error,
    } = usePublicPlans();

    const {
        data: selectedPlan,
        isLoading: planLoading,
        error: planError,
    } = usePlanById(selectedPlanId, !!selectedPlanId);

    const handleGetStarted = (planId: number) => {
        setSelectedPlanId(planId);
        setModalOpen(true);
    };

    return (
        <div className="relative min-h-screen bg-white text-gray-900 px-4 py-12 sm:px-6 lg:px-8 dark:bg-darkBg">
            {/* Close button */}
            <div className="absolute top-5 right-5">
                <button
                    onClick={() => router.push('/dashboard')}
                    className="text-gray-400 hover:text-black text-3xl "
                    aria-label="Close"
                >
                    ×
                </button>
            </div>

            {/* Header */}
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold tracking-tight dark:text-white">{t('title')}</h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{t('subtitle')}</p>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="text-center mt-10">{t('loading')}</div>
            ) : error ? (
                <div className="text-center mt-10 text-red-600 font-semibold">
                    {t('fetch_error')}
                </div>
            ) : (
                <div className="gap-y-5 mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto px-4">
                    {plans?.map((plan, index) => {
                        const isMiddle = plans.length === 3 && index === 1;

                        return (
                            <div
                                key={plan.id}
                                className={` md:shadow-sm shadow-2xl md:border dark:border-gray-700 border-gray-200 rounded-2xl first:border-r-0 last:border-l-0 gap-y-7 p-8 transition-all transform duration-300 flex flex-col
                  ${
                                    isMiddle
                                        ? 'border-green-600 dark:border-green-100 bg-green-50 dark:bg-gray-900 md:scale-110 z-10'
                                        : ''
                                }`}
                            >
                                <h3 className="text-xl font-bold mb-2 text-left capitalize dark:text-white">
                                    {plan.name}
                                </h3>

                                <div className="text-3xl font-bold text-green-800 text-left dark:text-green-200">
                                    €{plan.monthly_price.toFixed(2)}
                                    <span className="text-base font-normal text-gray-500 dark:text-gray-300">
                    {' '}
                                        {t('monthly')}
                  </span>
                                </div>

                                {plan.yearly_price > 0 && (
                                    <div className="text-sm text-gray-400 mt-1 text-left dark:text-gray-100">
                                        {t('yearly', { price: plan.yearly_price.toFixed(2) })}
                                    </div>
                                )}

                                <ul className="mt-4 flex-1 space-y-3 text-sm text-gray-700 dark:text-gray-300">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-black dark:text-gray-300" />
                                        {t('max_users', { count: plan.max_users })}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-black dark:text-gray-300" />
                                        {t('max_companies', { count: plan.max_companies })}
                                    </li>
                                    {plan.has_trial && (
                                        <li className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-black dark:text-gray-300" />
                                            {t('trial', { days: plan.trial_days })}
                                        </li>
                                    )}
                                </ul>

                                <button
                                    className={`mt-6 ${
                                        isMiddle
                                            ? 'bg-green-800 hover:bg-green-900'
                                            : 'bg-black/90 hover:bg-black dark:bg-blue/90 dark:hover:bg-blue '
                                    } text-white py-2 px-4 rounded-xl transition`}
                                    onClick={() => handleGetStarted(plan.id)}
                                >
                                    {t('get_started')}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            <PlanModal
                open={modalOpen}
                onCloseAction={() => {
                    setModalOpen(false);
                    setSelectedPlanId(null);
                }}
                plan={selectedPlan}
                isLoading={planLoading}
                error={planError}
            />
        </div>
    );
}
