'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { usePaypalSuccess } from '@/hooks/usePlans';
import { FaCheckCircle } from 'react-icons/fa';

export default function PaypalSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const invoice = searchParams.get('invoice');
    const token = searchParams.get('token');
    const sig = searchParams.get('sig');

    const { data, isLoading, error } = usePaypalSuccess(invoice, token, sig);

    useEffect(() => {
        if (!isLoading && !error) {
            const timeout = setTimeout(() => {
                router.push('/dashboard');
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, [isLoading, error, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center">
                {isLoading ? (
                    <p className="text-lg text-gray-700 animate-pulse">Validating payment...</p>
                ) : error ? (
                    <>
                        <h2 className="text-xl font-semibold text-red-600 mb-2">Payment Failed</h2>
                        <p className="text-gray-600">{error.message}</p>
                    </>
                ) : (
                    <>
                        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful</h1>
                        <p className="text-gray-600">{data?.msg || 'Thank you for your payment!'}</p>
                        <p className="text-sm mt-4 text-gray-500">
                            Invoice: <strong>{invoice}</strong>
                        </p>
                        <p className="text-sm mt-2 text-gray-400">Redirecting to dashboard...</p>
                    </>
                )}
            </div>
        </div>
    );
}
