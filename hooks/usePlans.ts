import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchPublicPlans,
    getPlanById,
    choosePlan,
    getMySubscription,
    getSubscriptionHistory,
    cancelSubscription,
    changePlan,
    getUserInvoices,
    getInvoiceDetails,
    getPaypalPayments,
    confirmPaypalSuccess,
    getPaypalCancelInfo,
    createPaypalPayment
} from '@/lib/api/auth';

//invoice
export interface Invoice {
    invoice_number: string;
    subscription_id: number;
    amount: number;
    currency: string;
    status: string;
    created_at: string;
    due_date: string | null;
    reference_number?: string;
}

// PayPal Payment Type
export interface PaypalPayment {
    id: string;
    status: string;
    amount: {
        currency_code: string;
        value: string;
    };
    create_time: string;
    update_time: string;
    links: Array<{
        href: string;
        rel: string;
        method: string;
    }>;
}

// plans Type
export type SubscriptionPlan = {
    id: number;
    name: string;
    monthly_price: number;
    yearly_price: number;
    max_users: number;
    max_companies: number;
    has_trial: boolean;
    trial_days: number;
};

// active plan type
export type ActivePlan = {
    name: string;
    billing_cycle: 'monthly' | 'yearly';
    monthly_price: number;
    yearly_price: number;
};

// choose plan type
export type ChoosePlanInput = {
    plan_id: number;
    billing_cycle: 'monthly' | 'yearly';
    discount_code?: string;
};

// history type
export type SubscriptionHistoryEntry = {
    from_plan: string;
    to_plan: string;
    changed_at: string; // ISO date string
    note?: string;
};

//  ( API `getMySubscription`)
export type MySubscription = {
    plan_name: string;
    billing_cycle: 'monthly' | 'yearly';
    start_date: string;
    end_date: string | null;
    status: 'active' | 'cancelled' | 'expired';
};

// ------------------------- HOOKS -------------------------

// GET /api/subscription/public
export function usePublicPlans() {
    return useQuery<SubscriptionPlan[], Error>({
        queryKey: ['public-plans'],
        queryFn: fetchPublicPlans,
    });
}

// GET /api/subscription/plan/:id
export function usePlanById(planId: number | null, enabled = true) {
    return useQuery<SubscriptionPlan, Error>({
        queryKey: ['plan', planId],
        queryFn: () => getPlanById(planId!),
        enabled: !!planId && enabled,
    });
}

// POST /api/subscription/choose
export function useChoosePlan() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ plan_id, billing_cycle, discount_code }: ChoosePlanInput) =>
            choosePlan(plan_id, billing_cycle, discount_code),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['public-plans'] });
            await queryClient.invalidateQueries({ queryKey: ['my-subscription'] });
            await queryClient.invalidateQueries({ queryKey: ['subscription-history'] });
        },
    });
}

// GET /api/subscription/me
export function useMySubscription() {
    return useQuery<MySubscription, Error>({
        queryKey: ['my-subscription'],
        queryFn: getMySubscription,
    });
}

// GET /api/subscription/history
export function useSubscriptionHistory() {
    return useQuery<SubscriptionHistoryEntry[], Error>({
        queryKey: ['subscription-history'],
        queryFn: getSubscriptionHistory,
    });
}

// DELETE /api/subscription/cancel
export function useCancelSubscription() {
    return useMutation({
        mutationFn: cancelSubscription,
    });
}

// PUT /api/subscription/change
export function useChangePlan() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: ChoosePlanInput) => changePlan(input),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['my-subscription'] });
            await queryClient.invalidateQueries({ queryKey: ['subscription-history'] });
        },
    });
}

// Get /api/invoices
export function useUserInvoices() {
    return useQuery<Invoice[], Error>({
        queryKey: ['user-invoices'],
        queryFn: getUserInvoices,
    });
}

// Get /api/invoices/:invoiceNumber
export function useInvoiceDetails(invoiceNumber: string | null, enabled = true) {
    return useQuery<Invoice, Error>({
        queryKey: ['invoice-details', invoiceNumber],
        queryFn: () => getInvoiceDetails(invoiceNumber!),
        enabled: !!invoiceNumber && enabled,
    });
}

export function useCreatePaypalPayment() {
    return useMutation({
        mutationFn: (invoice_number: string) => createPaypalPayment(invoice_number),
    });
}

// Get /api/paypal/payments
export function usePaypalPayments() {
    return useQuery<PaypalPayment[], Error>({
        queryKey: ['paypal-payments'],
        queryFn: getPaypalPayments,
    });
}

// GET /api/paypal/success/:invoice_number
export function usePaypalSuccess(invoiceNumber: string | null, token: string | null, sig: string | null, enabled = true) {
    return useQuery<{ msg: string }, Error>({
        queryKey: ['paypal-success', invoiceNumber, token, sig],
        queryFn: () => confirmPaypalSuccess(invoiceNumber!, token!, sig!),
        enabled: !!invoiceNumber && !!token && !!sig && enabled,
    });
}

// GET /api/paypal/cancel/:invoice_number
export function usePaypalCancel(invoiceNumber: string | null, enabled = true) {
    return useQuery<{ msg: string }, Error>({
        queryKey: ['paypal-cancel', invoiceNumber],
        queryFn: () => getPaypalCancelInfo(invoiceNumber!),
        enabled: !!invoiceNumber && enabled,
    });
}
