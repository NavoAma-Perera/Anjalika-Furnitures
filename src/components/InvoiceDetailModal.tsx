"use client";
import React, { useState } from "react";
import StatusBadge from "./StatusBadge"; // ✅ Make sure this is defined or imported
import PaymentFormModal from "./PaymentFormModal";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  date: string;
  customer: string;
  amount: number;
  paid: number;
  balance: number;
  status: "Paid" | "Partial" | "Unpaid";
  paymentMethod: string;
  items: InvoiceItem[];
}

interface InvoiceDetailModalProps {
  invoice: Invoice;
  onClose: () => void;
  onPaymentRecorded: (updatedInvoice: Invoice) => void;
}

export default function InvoiceDetailModal({
  invoice,
  onClose,
  onPaymentRecorded,
}: InvoiceDetailModalProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleRecordPayment = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = (payment: {
    amount: number;
    method: string;
    date: string;
    notes?: string;
  }) => {
    // Update invoice locally (you may send this to backend instead)
    const newPaid = invoice.paid + payment.amount;
    const newBalance = invoice.amount - newPaid;

    const updatedInvoice: Invoice = {
      ...invoice,
      paid: newPaid,
      balance: newBalance,
      status: newBalance === 0 ? "Paid" : "Partial",
    };

    onPaymentRecorded(updatedInvoice);
    setShowPaymentModal(false);
  };

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {invoice.invoiceNo}
                </h2>
                <p className="text-gray-600 mt-1">Date: {invoice.date}</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close invoice details"
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Customer Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Bill To</h3>
              <p className="text-lg font-medium text-gray-900">
                {invoice.customer}
              </p>
            </div>

            {/* Items Table */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Items
              </h3>
              <table className="w-full border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Description
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                      Qty
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                      Rate
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {invoice.items.length > 0 ? (
                    invoice.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {item.description}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 text-right">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 text-right">
                          Rs. {item.rate.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                          Rs. {item.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-4 text-gray-500 italic"
                      >
                        No items found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Payment Summary */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-end">
                <div className="w-64">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-semibold">
                      Rs. {invoice.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Paid:</span>
                    <span className="font-semibold">
                      Rs. {invoice.paid.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span
                      className={
                        invoice.balance > 0 ? "text-red-600" : "text-gray-900"
                      }
                    >
                      Balance:
                    </span>
                    <span
                      className={
                        invoice.balance > 0 ? "text-red-600" : "text-gray-900"
                      }
                    >
                      Rs. {invoice.balance.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status and Record Payment */}
            <div className="mt-4 flex justify-between items-center">
              <StatusBadge status={invoice.status} />
              {invoice.balance > 0 && (
                <button
                  onClick={handleRecordPayment}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Record Payment
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Download PDF
              </button>
              <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Record Payment Modal */}
      {showPaymentModal && (
        <PaymentFormModal
          invoice={invoice}
          onClose={() => setShowPaymentModal(false)}
          onSubmit={handlePaymentSubmit}
        />
      )}
    </>
  );
}
