'use client';

import '@/app/globals.css';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/component/UI/dialog';
import { SubscriptionPlan } from '@/lib/api/auth';
import { useTranslations } from 'next-intl';
import {
    BadgeCheck,
    CheckCircle,
    Calendar,
    Users,
    Building,
    Gift,
} from 'lucide-react';
import React from 'react';
import { useChangePlan } from '@/hooks/usePlans';
import AnimatedBillingPeriodSelector from '@/component/UI/AnimatedBillingPeriodSelector';
import toast from "react-hot-toast";

type PlanModalProps = {
    open: boolean;
    onCloseAction: () => void;
    plan?: SubscriptionPlan;
    isLoading?: boolean;
    error?: Error | null;
};

export default function PlanModal({
                                      open,
                                      onCloseAction,
                                      plan,
                                      isLoading,
                                      error,
                                  }: PlanModalProps) {
    const t = useTranslations('planModal');
    const { mutate } = useChangePlan();
    const [billingPeriod, setBillingPeriod] = React.useState<'monthly' | 'yearly'>('monthly');
    const [discountCode, setDiscountCode] = React.useState('');


    if (!open) return null;

    return (
        <Dialog open={open} onOpenChange={onCloseAction}>
            <DialogContent
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
             max-w-lg w-[90vw] rounded-2xl shadow-2xl bg-white !dark:bg-darkBg
             p-6 sm:p-8 overflow-hidden max-h-[90vh]"
            >

            <DialogHeader className="text-center">
                    <div className="flex justify-center mb-2">
                        <BadgeCheck className="h-10 w-10 text-blue " />
                    </div>
                    <DialogTitle className="text-3xl font-bold text-darkBg dark:text-white">
                        {plan ? t('title', { planName: plan.name }) : ''}
                    </DialogTitle>
                    <DialogDescription className="text-gray-500 dark:text-gray-400 mt-1">
                        {t('description')}
                    </DialogDescription>
                </DialogHeader>

                {/* Loading & Error */}
                {isLoading ? (
                    <div className="text-center text-sm text-gray-500">{t('loading')}</div>
                ) : error ? (
                    <div className="text-center text-sm text-red-500">{error.message}</div>
                ) : plan ? (
                    <>
                        <div className="mt-6 space-y-4 text-sm sm:text-base dark:bg-darkBg">
                            <InfoRow
                                icon={<CheckCircle className="text-blue" />}
                                label={t('monthly_price')}
                                value={`€${plan.monthly_price.toFixed(2)}`}
                            />
                            {plan.yearly_price > 0 && (
                                <InfoRow
                                    icon={<Calendar className="text-blue" />}
                                    label={t('yearly_price')}
                                    value={`€${plan.yearly_price.toFixed(2)}`}
                                />
                            )}
                            <InfoRow
                                icon={<Users className="text-blue" />}
                                label={t('max_users')}
                                value={`${plan.max_users}`}
                            />
                            <InfoRow
                                icon={<Building className="text-blue" />}
                                label={t('max_companies')}
                                value={`${plan.max_companies}`}
                            />
                            {plan.has_trial && (
                                <InfoRow
                                    icon={<Gift className="text-blue" />}
                                    label={t('trial')}
                                    value={t('days', { days: plan.trial_days })}
                                />
                            )}
                        </div>


                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('discount_code_label')}
                            </label>
                            <input
                                type="text"
                                placeholder={t('discount_code_placeholder')}
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkSlider text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue"
                            />
                        </div>

                        <AnimatedBillingPeriodSelector
                            value={billingPeriod}
                            onChangeAction={setBillingPeriod}
                        />

                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={() => {
                                    mutate(
                                        {
                                            plan_id: plan.id,
                                            billing_cycle: billingPeriod,
                                            discount_code: discountCode || undefined,
                                        },
                                        {
                                            onSuccess: () => {
                                                toast.success(t('plan_chosen_success'));
                                                onCloseAction();
                                            },
                                            onError: (err: unknown) => {
                                                const errorMessage =
                                                    err instanceof Error ? err.message : t('error_choosing_plan');
                                                toast.error(errorMessage);
                                            },
                                        }
                                    );
                                }}
                                className="inline-flex items-center justify-center gap-2 bg-blue/90 text-black dark:text-white hover:bg-blue font-medium py-2.5 px-6 rounded-lg transition"
                            >
                                <CheckCircle className="h-5 w-5" />
                                {t('confirm')}
                            </button>

                        </div>
                    </>
                ) : null}
            </DialogContent>
        </Dialog>
    );
}

function InfoRow({
                     icon,
                     label,
                     value,
                 }: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-6 h-6">{icon}</div>
            <div className="text-gray-800 dark:text-gray-200">
                <strong>{label}:</strong> {value}
            </div>
        </div>
    );
}
