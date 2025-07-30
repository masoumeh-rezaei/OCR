import axiosClient from '../axiosClient';

// 📌 Types
export type LoginCredentials = {
    username: string;
    password: string;
};
export type User = {
    id: string;
    username: string;
    email: string;
    main_user_id: number;
    role: string;
    permissions: string[];
    is_email_verified?: boolean;
};


export type SignupCredentials = {
    username: string;
    password: string;
    confirm_password: string;
};

export type ResetPasswordPayload = {
    email: string;
    code: string;
    password: string;
    confirm: string;
};

export type LoginResponse = {
    access_token: string;
    refresh_token: string;
    user_id: string;
    main_user_id: number;
    role: string;
    permissions: string[];
    is_email_verified?: boolean;
};
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

//  Login
export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const res = await axiosClient.post<LoginResponse>('/api/auth/login', credentials);
    const { access_token, refresh_token } = res.data;

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);

    return res.data;
};

//  Signup
export const signupUser = async (credentials: SignupCredentials): Promise<{ msg: string; user_id: string }> => {
    const res = await axiosClient.post('/api/auth/signup', credentials);

    console.log(' Signup successful:', res.data);

    return res.data; // includes: msg and user_id
};


// 👤 Get current user
export const fetchMe = async (): Promise<User> => {
    const res = await axiosClient.get('/api/auth/me');
    return res.data;
};

// 🔒 Protected content
type ProtectedData = {
    msg: string;
    role: string;
    user_id: string;
    main_user_id: string;
    permissions: string[];
};
export const fetchProtectedContent = async (): Promise<ProtectedData> => {
    const res = await axiosClient.get('/api/auth/protected');
    return res.data;
};



// 🚪 Logout
export const logoutUser = async (): Promise<void> => {
    try {
        await axiosClient.post('/api/auth/logout');
    } catch (error) {
        console.warn('⚠️ Logout failed (maybe already logged out)', error);
    } finally {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
};

//  Resend verification code
export const resendVerificationCode = async (): Promise<{ msg: string }> => {
    const res = await axiosClient.post('/api/auth/resend-code');
    return res.data;
};

//  Verify email
export const verifyEmailCode = async (code: string): Promise<{ msg: string }> => {
    const res = await axiosClient.post('/api/auth/verify-code', { code });
    return res.data;
};

//  Forgot password
export const forgetPassword = async (email: string): Promise<{ msg: string }> => {
    const res = await axiosClient.post('/api/auth/forgot-password', { email });
    return res.data;
};

//  Reset password
export const resetPassword = async (data: ResetPasswordPayload): Promise<{ msg: string }> => {
    const res = await axiosClient.post('/api/auth/reset-password', data);
    return res.data;
};

//get all user
export const getSubUsers = async () => {
    const response = await axiosClient.get('/api/user/get-subusers');
    return response.data;
};

export const addSubUser = async (payload: {
    email: string;
    password: string;
    confirm: string;
    name?: string;
    last_name?: string;
    position?: string;
    role?: string; // مثلا "editor", "viewer"
}) => {
    const response = await axiosClient.post("/api/user/add-subuser", payload);
    return response.data;
};
//  Delete sub-user
export async function deleteSubUser(subUserId: string) {
    const { data } = await axiosClient.delete(`/api/user/delete-subuser/${subUserId}`);
    return data;
}

// GET /api/user/get-subuser/:id
export const getSubUserById = async (id: string) => {
    const { data } = await axiosClient.get(`/api/user/get-subuser/${id}`);
    return data;
};

// PUT /api/user/update-subuser
export const updateSubUser = async (formData: {
    id: string;
    name?: string;
    last_name?: string;
    position?: string;
    role: string;
}) => {
    const { data } = await axiosClient.put(`/api/user/update-subuser`, formData);
    return data;
};
export const getSubUserCount = async (): Promise<number> => {
    const { data } = await axiosClient.get('/api/user/subuser-count');
    return data.subuser_count;
};
//  Show reset code (for development/debug)
export const showResetCode = async (email: string): Promise<string> => {
    const res = await axiosClient.post('/api/auth/show-code-reset-password', { email });
    if (!res.data.code) throw new Error(res.data.msg || 'No code received');
    return res.data.code;
};

// 📦 Get all public subscription plans

export const fetchPublicPlans = async (): Promise<SubscriptionPlan[]> => {
    const res = await axiosClient.get('/api/subscription/plans');
    return res.data;
};

export const getPlanById = async (planId: number) => {
    const res = await axiosClient.get(`/api/subscription/plan/${planId}`);
    return res.data;
};
export async function choosePlan(
    planId: number,
    billingPeriod: 'monthly' | 'yearly',
    discountCode?: string
) {

    console.log('Sending choosePlan request with:', {
        planId,
        billingPeriod,
        discountCode,
    });

    const response = await axiosClient.post('/api/subscription/choose', {
        plan_id: planId,
        billing_cycle: billingPeriod,
        ...(discountCode && { discount_code: discountCode }),
    });
    return response.data;
}


//me

export async function getMySubscription() {
    const res = await axiosClient.get('/api/subscription/me');
    return res.data;
}

//history
export async function getSubscriptionHistory() {
    const res = await axiosClient.get('/api/subscription/history');
    return res.data;
}

//delete
export async function cancelSubscription() {
    const res = await axiosClient.delete('/api/subscription');
    return res.data;
}

// type definition
export type ChoosePlanInput = {
    plan_id: number;
    billing_cycle: 'monthly' | 'yearly';
    discount_code?: string;
};

// api function change
export async function changePlan(input: ChoosePlanInput) {
    const res = await axiosClient.put('/api/subscription/change', input);
    return res.data;
}
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

// GET /api/invoices
export async function getUserInvoices(): Promise<Invoice[]> {
    const response = await axiosClient.get('/api/invoices');
    return response.data;
}

// GET /api/invoices/:invoice_number
export async function getInvoiceDetails(invoiceNumber: string): Promise<Invoice> {
    const response = await axiosClient.get(`/api/invoices/${invoiceNumber}`);
    return response.data;
}

export async function createPaypalPayment(invoice_number: string): Promise<{ approval_url: string }> {
    const { data } = await axiosClient.post(`/api/paypal/pay/${invoice_number}`);
    return data;
}
export const getPaypalPayments = async () => {
    const res = await axiosClient.get('/api/paypal/payments');
    return res.data;
};

export const confirmPaypalSuccess = async (
    invoiceNumber: string,
    token: string,
    sig: string
): Promise<{ msg: string }> => {
    const res = await axiosClient.get(
        `/api/paypal/success/${invoiceNumber}?token=${token}&sig=${sig}`
    );
    return res.data;
};

export const getPaypalCancelInfo = async (invoiceNumber: string): Promise<{ msg: string }> => {
    const res = await axiosClient.get(`/api/paypal/cancel/${invoiceNumber}`);
    return res.data;
};




