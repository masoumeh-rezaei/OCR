'use client';

import React, { useState } from 'react';
import { useUserInvoices, Invoice } from '@/hooks/usePlans';
import { useInvoiceDetails,useCreatePaypalPayment   } from '@/hooks/usePlans';
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from '@/component/UI/dialog';
import toast from "react-hot-toast";

const InvoicesSection: React.FC = () => {
    const { data: invoices, isLoading, error } = useUserInvoices();
    const [selectedInvoiceNumber, setSelectedInvoiceNumber] = useState<string | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

    const {
        data: invoiceDetail,
        isLoading: detailLoading,
        error: detailError,
    } = useInvoiceDetails(selectedInvoiceNumber, openDialog);

    const handleRowClick = (invoiceNumber: string) => {
        setSelectedInvoiceNumber(invoiceNumber);
        setOpenDialog(true);
    };
    const { mutate: createPayment, isPending: creatingPayment } = useCreatePaypalPayment();


    const handleCreatePayment = () => {
        if (!selectedInvoiceNumber) return;

        createPayment(selectedInvoiceNumber, {
            onSuccess: (data) => {
                if (data?.approval_url) {
                    window.open(data.approval_url, '_blank');
                }
            },
            onError: (err) => {
                toast.error('Failed to generate PayPal payment link');
            },
        });
    };


    return (
        <section>
            <h3 className="text-lg font-semibold mb-4 text-left dark:text-white">Invoices</h3>
            {isLoading ? (
                <p className="text-sm text-gray-500 dark:text-white">Loading invoices...</p>
            ) : error ? (
                <p className="text-sm text-red-500">Failed to load invoices.</p>
            ) : !invoices || invoices.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-white">No invoices found.</p>
            ) : (
                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-100 dark:bg-darkSlider">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Invoice #</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Amount</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Created</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-darkBg divide-y divide-gray-200 dark:divide-gray-700">
                        {invoices.map((inv: Invoice) => (
                            <tr
                                key={inv.invoice_number}
                                className="hover:bg-blue-50 dark:hover:bg-darkSlider cursor-pointer transition"
                                onClick={() => handleRowClick(inv.invoice_number)}
                            >
                                <td className="px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-400">#{inv.invoice_number}</td>
                                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                    {inv.amount} {inv.currency}
                                </td>
                                <td className="px-4 py-2 text-sm capitalize text-gray-600 dark:text-gray-400">{inv.status}</td>
                                <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-500">
                                    {new Date(inv.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Invoice Details Modal */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-lg rounded-xl shadow-lg bg-white dark:bg-zinc-900 p-6">
                    <DialogTitle className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                        Invoice Details
                    </DialogTitle>

                    {detailLoading ? (
                        <p className="text-sm text-gray-500 dark:text-gray-300">Loading details...</p>
                    ) : detailError ? (
                        <p className="text-sm text-red-500">Failed to fetch details.</p>
                    ) : invoiceDetail ? (
                        <div className="grid grid-cols-1 gap-3 text-sm text-gray-700 dark:text-gray-300">
                            <div className="flex justify-between">
                                <span className="font-medium">Invoice #:</span>
                                <span className="text-blue-600 dark:text-blue-400">#{invoiceDetail.invoice_number}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Amount:</span>
                                <span>
            {invoiceDetail.amount} {invoiceDetail.currency}
          </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Status:</span>
                                <span className="capitalize">{invoiceDetail.status}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Created:</span>
                                <span>{new Date(invoiceDetail.created_at).toLocaleString()}</span>
                            </div>
                            {invoiceDetail.due_date && (
                                <div className="flex justify-between">
                                    <span className="font-medium">Due Date:</span>
                                    <span>{new Date(invoiceDetail.due_date).toLocaleDateString()}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="font-medium">Reference:</span>
                                <span>{invoiceDetail.reference_number}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Subscription ID:</span>
                                <span>{invoiceDetail.subscription_id}</span>
                            </div>

                            {invoiceDetail.status !== 'paid' && (
                                <div className="pt-4 flex justify-center">
                                    <button
                                        onClick={handleCreatePayment}
                                        disabled={creatingPayment}
                                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition disabled:opacity-50"
                                    >
                                        {creatingPayment ? 'Generating...' : 'Pay with PayPal'}
                                    </button>

                                </div>
                            )}

                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No detail available.</p>
                    )}
                </DialogContent>
            </Dialog>

        </section>
    );
};

export default React.memo(InvoicesSection);
