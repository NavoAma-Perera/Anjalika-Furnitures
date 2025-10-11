"use client";

import { useState } from "react";

// Types
interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  supplier: string;
  amount: number;
  status: "Paid" | "Pending";
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "EXP-001",
      date: "2025-10-01",
      category: "Materials",
      description: "Teak Wood - 500 sq ft",
      supplier: "Lanka Timber",
      amount: 250000,
      status: "Paid",
    },
    {
      id: "EXP-002",
      date: "2025-10-02",
      category: "Utilities",
      description: "Electricity Bill - September",
      supplier: "CEB",
      amount: 35000,
      status: "Paid",
    },
    {
      id: "EXP-003",
      date: "2025-10-03",
      category: "Materials",
      description: "Foam Cushions - 100 units",
      supplier: "Comfort Foam Ltd",
      amount: 75000,
      status: "Pending",
    },
    {
      id: "EXP-004",
      date: "2025-10-03",
      category: "Rent",
      description: "Workshop Rent - October",
      supplier: "Property Owner",
      amount: 60000,
      status: "Paid",
    },
    {
      id: "EXP-005",
      date: "2025-10-04",
      category: "Transport",
      description: "Delivery Vehicle Fuel",
      supplier: "Ceypetco",
      amount: 15000,
      status: "Paid",
    },
    {
      id: "EXP-006",
      date: "2025-10-04",
      category: "Materials",
      description: "Fabric - Sofa Upholstery",
      supplier: "Textile House",
      amount: 105000,
      status: "Pending",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All Categories");

  // Calculate summary stats
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const materialPurchases = expenses
    .filter((exp) => exp.category === "Materials")
    .reduce((sum, exp) => sum + exp.amount, 0);
  const operatingCosts = expenses
    .filter((exp) => exp.category === "Utilities" || exp.category === "Rent" || exp.category === "Transport")
    .reduce((sum, exp) => sum + exp.amount, 0);
  const pendingPayments = expenses.filter((exp) => exp.status === "Pending").reduce((sum, exp) => sum + exp.amount, 0);

  // Filter expenses
  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory = categoryFilter === "All Categories" || expense.category === categoryFilter;
    const matchesSearch =
      expense.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Expenses & Purchases</h1>
          <p className="text-gray-600 mt-1">Track all business expenses and supplier payments</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800">Total Expenses</h2>
            <p className="text-2xl font-bold text-gray-900">Rs. {totalExpenses.toLocaleString()}</p>
            <span className="text-sm text-gray-600">This month</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800">Material Purchases</h2>
            <p className="text-2xl font-bold text-gray-900">Rs. {materialPurchases.toLocaleString()}</p>
            <span className="text-sm text-gray-600">
              {((materialPurchases / totalExpenses) * 100).toFixed(0)}% of expenses
            </span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800">Operating Costs</h2>
            <p className="text-2xl font-bold text-gray-900">Rs. {operatingCosts.toLocaleString()}</p>
            <span className="text-sm text-gray-600">
              {((operatingCosts / totalExpenses) * 100).toFixed(0)}% of expenses
            </span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800">Pending Payments</h2>
            <p className="text-2xl font-bold text-gray-900">Rs. {pendingPayments.toLocaleString()}</p>
            <span className="text-sm text-gray-600">{expenses.filter((exp) => exp.status === "Pending").length} suppliers</span>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search expenses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>All Categories</option>
                <option>Materials</option>
                <option>Utilities</option>
                <option>Rent</option>
                <option>Transport</option>
              </select>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Export</button>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">+ Add Expense</button>
            </div>
          </div>
        </div>

        {/* Expense Table */}
        <table className="w-full border-collapse bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Category</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Description</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Supplier/Vendor</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Amount</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.id} className="border-b">
                <td className="px-4 py-2 text-sm text-gray-800">{expense.id}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{expense.date}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{expense.category}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{expense.description}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{expense.supplier}</td>
                <td className="px-4 py-2 text-sm text-gray-800">Rs. {expense.amount.toLocaleString()}</td>
                <td
                  className={`px-4 py-2 text-sm font-semibold ${
                    expense.status === "Paid" ? "text-green-600" : "text-orange-600"
                  }`}
                >
                  {expense.status}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  <button className="mr-2 text-blue-600">✏️</button>
                  <button className="text-red-600">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}