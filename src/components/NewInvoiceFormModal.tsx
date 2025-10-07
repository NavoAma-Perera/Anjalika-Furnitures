"use client";

import React, { useState } from "react";
import { Invoice } from "./InvoiceDetailModal";

interface NewInvoiceFormModalProps {
  onClose: () => void;
  onSubmit: (invoice: Invoice) => void;
}

export default function NewInvoiceFormModal({
  onClose,
  onSubmit,
}: NewInvoiceFormModalProps) {
  const [invoiceNo, setInvoiceNo] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [customer, setCustomer] = useState<string>("");
  const [items, setItems] = useState([
    { id: crypto.randomUUID(), description: "", quantity: 1, rate: 0, amount: 0 },
  ]);
  const [paid, setPaid] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("Cash");

  // Auto-calculate total and balance
  const total = items.reduce((sum, item) => sum + item.amount, 0);
  const balance = total - paid;

  const handleItemChange = (
    id: string,
    field: "description" | "quantity" | "rate",
    value: string | number
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
              amount:
                field === "quantity"
                  ? (Number(value) || 0) * item.rate
                  : field === "rate"
                  ? item.quantity * (Number(value) || 0)
                  : item.quantity * item.rate,
            }
          : item
      )
    );
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), description: "", quantity: 1, rate: 0, amount: 0 },
    ]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInvoice: Invoice = {
      id: crypto.randomUUID(),
      invoiceNo,
      date,
      customer,
      items,
      amount: total,
      paid,
      balance,
      status:
        balance === 0 ? "Paid" : paid > 0 ? "Partial" : "Unpaid",
      paymentMethod,
    };
    onSubmit(newInvoice);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold text-gray-900">New Invoice</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Invoice Info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Invoice No</label>
                <input
                  type="text"
                  value={invoiceNo}
                  onChange={(e) => setInvoiceNo(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="INV-001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                <input
                  type="text"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Customer name"
                />
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Items</h3>
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-2 py-1 font-medium text-gray-600">Description</th>
                    <th className="text-right px-2 py-1 font-medium text-gray-600">Qty</th>
                    <th className="text-right px-2 py-1 font-medium text-gray-600">Rate</th>
                    <th className="text-right px-2 py-1 font-medium text-gray-600">Amount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-2 py-1">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                          placeholder="Item description"
                          className="w-full border rounded px-2 py-1"
                        />
                      </td>
                      <td className="px-2 py-1 text-right">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(item.id, "quantity", Number(e.target.value))}
                          className="w-16 border rounded px-2 py-1 text-right"
                        />
                      </td>
                      <td className="px-2 py-1 text-right">
                        <input
                          type="number"
                          min="0"
                          value={item.rate}
                          onChange={(e) => handleItemChange(item.id, "rate", Number(e.target.value))}
                          className="w-20 border rounded px-2 py-1 text-right"
                        />
                      </td>
                      <td className="px-2 py-1 text-right font-medium text-gray-900">
                        Rs. {item.amount.toLocaleString()}
                      </td>
                      <td className="px-2 py-1 text-center">
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ✕
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                type="button"
                onClick={addItem}
                className="mt-3 text-sm text-green-600 hover:text-green-800"
              >
                + Add Item
              </button>
            </div>

            {/* Payment Details */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option>Cash</option>
                  <option>Bank Transfer</option>
                  <option>Credit Card</option>
                  <option>Debit Card</option>
                  <option>Cheque</option>
                  <option>Online Payment</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Paid Amount</label>
                <input
                  type="number"
                  min="0"
                  max={total}
                  value={paid}
                  onChange={(e) => setPaid(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="border-t pt-3 text-sm">
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-semibold">Rs. {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Paid:</span>
                <span className="font-semibold">Rs. {paid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-red-600 font-semibold">
                <span>Balance:</span>
                <span>Rs. {balance.toLocaleString()}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Create Invoice
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
