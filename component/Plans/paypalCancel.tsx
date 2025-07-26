'use client';

import { useSearchParams } from 'next/navigation';
import { usePaypalCancel } from '@/hooks/usePlans';
import { FaTimesCircle } from 'react-icons/fa';

export default function PaypalCancelPage() {
    const searchParams = useSearchParams();
    const invoice = searchParams.get('invoice');

    const { data, isLoading, error } = usePaypalCancel(invoice);

    return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center">
                {isLoading ? (
                    <p className="text-lg text-gray-700 animate-pulse">Processing cancellation...</p>
                ) : error ? (
                    <>
                        <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
                        <p className="text-gray-600">{error.message}</p>
                    </>
                ) : (
                    <>
                        <FaTimesCircle className="text-red-500 text-5xl mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Cancelled</h1>
                        <p className="text-gray-600">{data?.msg || 'You have cancelled the payment.'}</p>
                        <p className="text-sm mt-4 text-gray-500">Invoice: <strong>{invoice}</strong></p>
                    </>
                )}
            </div>
        </div>
    );
}
