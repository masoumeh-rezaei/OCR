'use client';

import React from 'react';
import {
    useMySubscription,
    usePublicPlans,
    useSubscriptionHistory,
    SubscriptionPlan,
    SubscriptionHistoryEntry,
    useCancelSubscription,
} from '@/hooks/usePlans';
import { Loader2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';


interface UpgradePlanProps {
    onUpgradeClick: (planId: number) => void;
}


const UpgradePlan: React.FC<UpgradePlanProps> = ({ onUpgradeClick }) => {
    const {
        data: activePlan,
        isLoading: loadingActive,
        error: errorActive,
    } = useMySubscription();

    const {
        data: allPlans,
        isLoading: loadingPlans,
        error: errorPlans,
    } = usePublicPlans();

    const {
        data: history,
        isLoading: loadingHistory,
        error: errorHistory,
    } = useSubscriptionHistory();


    const formatDate = (date: string) => new Date(date).toLocaleDateString();

    const cancelMutation = useCancelSubscription();

    const handleCancel = () => {
        if (!confirm('Are you sure you want to cancel your current subscription?')) return;

        cancelMutation.mutate(undefined, {
            onSuccess: () => {
                toast.success('Subscription canceled successfully.');
            },
            onError: () => {
                toast.error('Failed to cancel subscription.');
            },
        });
    };

    return (
        <div className="space-y-12">
            {/* ========== Active Plan ========== */}
            <section>
                <h3 className="text-lg font-semibold mb-2 text-left dark:text-white">Active Plan</h3>

                {loadingActive ? (
                    <p className="text-sm text-gray-500 dark:text-white">Loading active plan...</p>
                ) : errorActive || !activePlan ? (
                    <p className="text-sm text-rose-500">You have no active plan yet</p>
                ) : (
                    <div className="bg-white dark:bg-darkSlider border border-gray-200 dark:border-gray-800 rounded-lg shadow p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        {/* Left Side: Plan Info */}
                        <div className="text-left">
                            <h4 className="text-2xl font-bold capitalize text-black dark:text-white">{activePlan.plan_name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">You are currently using:</p>
                            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 ">
                                {activePlan.billing_cycle === 'monthly' ? 'Monthly Billing' : 'Yearly Billing'}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Start: {formatDate(activePlan.start_date)}
                                {activePlan.end_date && <> <br/> End: {formatDate(activePlan.end_date)}</>}
                            </p>
                            <p className="text-xs capitalize mt-1 text-gray-500 dark:text-gray-400">
                                Status: {activePlan.status}
                            </p>
                        </div>

                        {/* Right Side: Cancel Button */}
                        <div className="flex md:w-[50%] w-[100%] items-center justify-between bg-gray-50 dark:bg-darkSlider  rounded-xl px-4 py-3">
                            {/* text */}
                            <div className="flex items-center gap-3">
                                {/*<div className=" rounded-full  flex items-center justify-center">*/}
                                {/*    <Trash2 className="w-4 h-4 text-blue" />*/}
                                {/*</div>*/}
                                <div className="text-left">
                                    <p className="font-semibold text-sm text-black dark:text-white">Cancel Subscription</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        Cancel your current plan and stop all future payments
                                    </p>
                                </div>
                            </div>

                            {/*button */}
                            <button
                                onClick={handleCancel}
                                disabled={cancelMutation.isPending}
                                className="bg-blue/90 hover:bg-blue m-1 text-white text-sm font-medium px-4 py-1.5 rounded-md transition disabled:opacity-50 flex items-center gap-2"
                            >
                                {cancelMutation.isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Canceling
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="w-4 h-4" />
                                        Cancel
                                    </>
                                )}
                            </button>
                        </div>

                    </div>
                )}
            </section>


            {/* ========== All Plans ========== */}
            <section>
                <h3 className="text-lg font-semibold mb-2 text-left dark:text-white">All Plans</h3>
                    <hr className="border-gray-200 dark:border-gray-800 "/>

                {loadingPlans ? (
                    <p className="text-sm text-gray-500 dark:text-white mt-4">Loading plans...</p>
                ) : errorPlans ? (
                    <p className="text-sm text-red-500 mt-4">Failed to load plans.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 lg:ml-50 lg:w-[70%]  ">
                        {allPlans?.map((plan: SubscriptionPlan) => (
                            <div
                                key={plan.id}
                                className="bg-white dark:bg-transparent lg:hover:shadow-none lg:border-0 lg:shadow-none border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow hover:shadow-md transition-all lg:text-left text-center   "
                            >
                                <h4 className="text-lg font-bold capitalize dark:text-white">{plan.name}</h4>
                                <p className="text-xs text-gray-500 mt-1">€{plan.monthly_price} per month</p>
                                <p className="text-xs text-gray-500 mt-1">€{plan.yearly_price} per year</p>
                                <button
                                    className="mt-4 px-4 py-1 bg-blue/90 hover:bg-blue text-white text-sm rounded"
                                    onClick={() => onUpgradeClick(plan.id)}
                                >
                                    Upgrade
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* ========== Subscription History ========== */}
            <section>
                <h3 className="text-lg font-semibold mb-4 text-left dark:text-white">Subscription History</h3>

                {loadingHistory ? (
                    <p className="text-sm text-gray-500 dark:text-white">Loading history...</p>
                ) : errorHistory ? (
                    <p className="text-sm text-red-500">Failed to load history.</p>
                ) : !history || history.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-white">No history available.</p>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-300 dark:border-gray-700 shadow-sm">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-100 dark:bg-darkSlider text-sm">
                                <tr>
                                    <th className="px-6 py-4 text-left font-semibold text-gray-600 dark:text-gray-300 border-r dark:border-gray-700">From</th>
                                    <th className="px-6 py-4 text-left font-semibold text-gray-600 dark:text-gray-300 border-r dark:border-gray-700">To</th>
                                    <th className="px-6 py-4 text-left font-semibold text-gray-600 dark:text-gray-300 border-r dark:border-gray-700">Date</th>
                                    <th className="px-6 py-4 text-left font-semibold text-gray-600 dark:text-gray-300">Note</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-darkBg divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                                {history.map((entry: SubscriptionHistoryEntry, index: number) => {
                                    const bgColor =
                                        entry.to_plan === 'premium'
                                            ? 'bg-green-50 dark:bg-green-900/40'
                                            : entry.to_plan === 'gold'
                                                ? 'bg-yellow-50 dark:bg-yellow-900/40'
                                                : 'bg-white dark:bg-darkSlider';

                                    return (
                                        <tr
                                            key={index}
                                            className={`${bgColor} hover:bg-gray-100 dark:hover:bg-darkSlider/80 transition border-t border-gray-200 dark:border-gray-700`}
                                        >
                                            <td className="px-6 py-4 text-gray-800 dark:text-white capitalize border-r border-gray-200 dark:border-gray-700">
                                                {entry.from_plan}
                                            </td>
                                            <td className="px-6 py-4 text-gray-800 dark:text-white capitalize border-r border-gray-200 dark:border-gray-700">
                                                {entry.to_plan}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">
                                                {new Date(entry.changed_at).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 italic text-gray-500 dark:text-gray-400">
                                                {entry.note || '-'}
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>


                        {/* Mobile Cards */}
                        <ul className="md:hidden mt-4 space-y-4">
                            {history.map((entry: SubscriptionHistoryEntry, index: number) => {
                                const borderColor =
                                    entry.to_plan === 'premium'
                                        ? 'border-green-500'
                                        : entry.to_plan === 'gold'
                                            ? 'border-yellow-500'
                                            : 'border-gray-300';

                                return (
                                    <li
                                        key={index}
                                        className={`rounded-lg border-l-4 ${borderColor} bg-white dark:bg-darkSlider p-4 shadow-sm`}
                                    >
                                        <p className="text-sm font-semibold text-gray-800 dark:text-white capitalize">
                                            {entry.from_plan} → {entry.to_plan}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {new Date(entry.changed_at).toLocaleString()}
                                        </p>
                                        {entry.note && (
                                            <p className="text-xs italic text-gray-400 dark:text-gray-500 mt-1">
                                                {entry.note}
                                            </p>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                )}
            </section>



        </div>
    );
};

export default React.memo(UpgradePlan);
