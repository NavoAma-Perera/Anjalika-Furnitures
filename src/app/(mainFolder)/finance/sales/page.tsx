"use client";

import { useState } from "react";
import SummaryCard from "@/components/SummaryCard";
import InvoiceTable from "@/components/InvoiceTable";
import InvoiceDetailModal from "@/components/InvoiceDetailModal";
import PaymentFormModal from "@/components/PaymentFormModal";
import NewInvoiceFormModal from "@/components/NewInvoiceFormModal";

// Types
interface Invoice {
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

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Payment {
  amount: number;
  method: string;
  date: string;
  notes?: string;
}

export default function SalesRevenuePage() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "1",
      invoiceNo: "INV-2025-001",
      date: "2025-10-01",
      customer: "Rajesh Kumar",
      amount: 125000,
      paid: 125000,
      balance: 0,
      status: "Paid",
      paymentMethod: "Bank Transfer",
      items: [
        { id: "1", description: "3-Seater Premium Fabric Sofa Set", quantity: 1, rate: 125000, amount: 125000 }
      ]
    },
    {
      id: "2",
      invoiceNo: "INV-2025-002",
      date: "2025-10-02",
      customer: "Priya Silva",
      amount: 75000,
      paid: 50000,
      balance: 25000,
      status: "Partial",
      paymentMethod: "Cash",
      items: [
        { id: "2", description: "Teak Wood Bed Frame with Headboard", quantity: 1, rate: 75000, amount: 75000 }
      ]
    },
    {
      id: "3",
      invoiceNo: "INV-2025-003",
      date: "2025-10-03",
      customer: "Anil Fernando",
      amount: 55000,
      paid: 0,
      balance: 55000,
      status: "Unpaid",
      paymentMethod: "-",
      items: [
        { id: "3", description: "TV Console Unit", quantity: 1, rate: 55000, amount: 55000 }
      ]
    },
    {
      id: "4",
      invoiceNo: "INV-2025-004",
      date: "2025-10-04",
      customer: "Kamala Perera",
      amount: 95000,
      paid: 95000,
      balance: 0,
      status: "Paid",
      paymentMethod: "Cheque",
      items: [
        { id: "4", description: "Center Coffee Table with Glass Top", quantity: 2, rate: 47500, amount: 95000 }
      ]
    },
    {
      id: "5",
      invoiceNo: "INV-2025-005",
      date: "2025-10-04",
      customer: "Sunil Silva",
      amount: 120000,
      paid: 60000,
      balance: 60000,
      status: "Partial",
      paymentMethod: "Cheque",
      items: [
        { id: "5", description: "Center Coffee Table with Glass Top", quantity: 1, rate: 60000, amount: 120000 }
      ]
    }
  ]);

  const [statusFilter, setStatusFilter] = useState<string>("All Status");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState<boolean>(false);
  const [showNewInvoiceForm, setShowNewInvoiceForm] = useState<boolean>(false);

  // Calculate summary stats
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidInvoicesCount = invoices.filter(inv => inv.status === "Paid").length;
  const paidAmount = invoices.reduce((sum, inv) => sum + inv.paid, 0);
  const pendingPaymentsCount = invoices.filter(inv => inv.balance > 0).length;
  const pendingAmount = invoices.reduce((sum, inv) => sum + inv.balance, 0);
  const thisMonthRevenue = invoices
    .filter(inv => new Date(inv.date).getMonth() === new Date().getMonth())
    .reduce((sum, inv) => sum + inv.paid, 0);

  // Filter invoices
  const filteredInvoices = invoices.filter(invoice => {
    const matchesStatus = statusFilter === "All Status" || invoice.status === statusFilter;
    const matchesSearch = 
      invoice.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleRecordPayment = (payment: Payment) => {
    if (!selectedInvoice) return;

    setInvoices(invoices.map(inv => {
      if (inv.id === selectedInvoice.id) {
        const newPaid = inv.paid + payment.amount;
        const newBalance = inv.amount - newPaid;
        return {
          ...inv,
          paid: newPaid,
          balance: newBalance,
          status: newBalance === 0 ? "Paid" : newBalance < inv.amount ? "Partial" : "Unpaid",
          paymentMethod: payment.method
        };
      }
      return inv;
    }));

    setShowPaymentForm(false);
    setSelectedInvoice(null);
  };

  // 🆕 Handle new invoice creation
  const handleAddInvoice = (newInvoice: Invoice) => {
    setInvoices([...invoices, newInvoice]);
    setShowNewInvoiceForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sales & Revenue</h1>
          <p className="text-gray-600 mt-1">Track invoices, payments, and revenue</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <SummaryCard
            title="Total Revenue"
            amount={totalRevenue}
            subtitle="+15% from last month"
            bgColor="bg-white"
          />
          <SummaryCard
            title="Paid Invoices"
            amount={paidAmount}
            count={paidInvoicesCount}
            bgColor="bg-white"
          />
          <SummaryCard
            title="Pending Payments"
            amount={pendingAmount}
            count={pendingPaymentsCount}
            bgColor="bg-white"
          />
          <SummaryCard
            title="This Month"
            amount={thisMonthRevenue}
            subtitle="+22% vs last month"
            bgColor="bg-white"
          />
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search by invoice, customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>All Status</option>
                <option>Paid</option>
                <option>Partial</option>
                <option>Unpaid</option>
              </select>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Export
              </button>
              {/* 🆕 Add New Invoice Button */}
              <button
                onClick={() => setShowNewInvoiceForm(true)}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                + New Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Invoice Table */}
        <InvoiceTable
          invoices={filteredInvoices}
          onViewDetails={setSelectedInvoice}
          onRecordPayment={(invoice) => {
            setSelectedInvoice(invoice);
            setShowPaymentForm(true);
          }}
        />

        {/* Invoice Detail Modal */}
        {selectedInvoice && !showPaymentForm && (
          <InvoiceDetailModal
            invoice={selectedInvoice}
            onClose={() => setSelectedInvoice(null)}
            onPaymentRecorded={() => setShowPaymentForm(true)}
          />
        )}

        {/* Payment Form Modal */}
        {showPaymentForm && selectedInvoice && (
          <PaymentFormModal
            invoice={selectedInvoice}
            onClose={() => {
              setShowPaymentForm(false);
              setSelectedInvoice(null);
            }}
            onSubmit={handleRecordPayment}
          />
        )}

        {/* 🆕 New Invoice Form Modal */}
        {showNewInvoiceForm && (
          <NewInvoiceFormModal
            onClose={() => setShowNewInvoiceForm(false)}
            onSubmit={handleAddInvoice}
          />
        )}
      </div>
    </div>
  );
}
