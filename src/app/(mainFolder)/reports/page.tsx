'use client';

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, Users, Download, Calendar, ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
import { useState } from 'react';

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
const [activeReport, setActiveReport] = useState<string | null>(null);
  const [reportDateRange, setReportDateRange] = useState('month');
  const [reportCategory, setReportCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  // Detailed sales transactions
  const salesTransactions = [
    { id: 'INV-2024-001', date: '2024-06-28', customer: 'John Silva', product: 'King Size Bed Frame', category: 'Beds', quantity: 1, unitPrice: 75000, total: 75000, status: 'Completed', paymentMethod: 'Bank Transfer' },
    { id: 'INV-2024-002', date: '2024-06-27', customer: 'Sarah Fernando', product: 'Custom Dining Set', category: 'Dining Sets', quantity: 1, unitPrice: 110000, total: 110000, status: 'Completed', paymentMethod: 'Cash' },
    { id: 'INV-2024-003', date: '2024-06-26', customer: 'Michael Perera', product: 'L-Shape Sofa', category: 'Sofas', quantity: 1, unitPrice: 85000, total: 85000, status: 'Completed', paymentMethod: 'Card' },
    { id: 'INV-2024-004', date: '2024-06-25', customer: 'Anne De Silva', product: 'Mahogany Wardrobe', category: 'Wardrobes', quantity: 1, unitPrice: 90000, total: 90000, status: 'Pending', paymentMethod: 'Bank Transfer' },
    { id: 'INV-2024-005', date: '2024-06-24', customer: 'David Jayawardena', product: 'Office Desk Set', category: 'Tables', quantity: 2, unitPrice: 35000, total: 70000, status: 'Completed', paymentMethod: 'Cash' },
    { id: 'INV-2024-006', date: '2024-06-23', customer: 'Lisa Rajapaksa', product: 'King Size Bed Frame', category: 'Beds', quantity: 1, unitPrice: 75000, total: 75000, status: 'Completed', paymentMethod: 'Card' },
    { id: 'INV-2024-007', date: '2024-06-22', customer: 'James Wickramasinghe', product: 'Custom Dining Set', category: 'Dining Sets', quantity: 1, unitPrice: 110000, total: 110000, status: 'Completed', paymentMethod: 'Bank Transfer' },
    { id: 'INV-2024-008', date: '2024-06-21', customer: 'Maria Gunawardena', product: 'Coffee Table', category: 'Tables', quantity: 1, unitPrice: 25000, total: 25000, status: 'Completed', paymentMethod: 'Cash' },
    { id: 'INV-2024-009', date: '2024-06-20', customer: 'Robert Dissanayake', product: 'L-Shape Sofa', category: 'Sofas', quantity: 1, unitPrice: 85000, total: 85000, status: 'Completed', paymentMethod: 'Card' },
    { id: 'INV-2024-010', date: '2024-06-19', customer: 'Emma Bandara', product: 'Mahogany Wardrobe', category: 'Wardrobes', quantity: 1, unitPrice: 90000, total: 90000, status: 'Completed', paymentMethod: 'Bank Transfer' },
    { id: 'INV-2024-011', date: '2024-06-18', customer: 'William Senanayake', product: 'King Size Bed Frame', category: 'Beds', quantity: 1, unitPrice: 75000, total: 75000, status: 'Completed', paymentMethod: 'Cash' },
    { id: 'INV-2024-012', date: '2024-06-17', customer: 'Sophia Mendis', product: 'Dining Chair Set', category: 'Dining Sets', quantity: 6, unitPrice: 8000, total: 48000, status: 'Completed', paymentMethod: 'Card' },
    { id: 'INV-2024-013', date: '2024-06-16', customer: 'Oliver Karunaratne', product: 'Office Desk Set', category: 'Tables', quantity: 1, unitPrice: 35000, total: 35000, status: 'Pending', paymentMethod: 'Bank Transfer' },
    { id: 'INV-2024-014', date: '2024-06-15', customer: 'Charlotte De Alwis', product: 'Custom Sofa', category: 'Sofas', quantity: 1, unitPrice: 95000, total: 95000, status: 'Completed', paymentMethod: 'Cash' },
    { id: 'INV-2024-015', date: '2024-06-14', customer: 'Benjamin Wijesinghe', product: 'Teak Wood Cabinet', category: 'Wardrobes', quantity: 1, unitPrice: 65000, total: 65000, status: 'Completed', paymentMethod: 'Card' },
    { id: 'INV-2024-016', date: '2024-06-13', customer: 'Amelia Samaraweera', product: 'Queen Size Bed', category: 'Beds', quantity: 1, unitPrice: 65000, total: 65000, status: 'Completed', paymentMethod: 'Bank Transfer' },
    { id: 'INV-2024-017', date: '2024-06-12', customer: 'Lucas Gamage', product: 'Study Table', category: 'Tables', quantity: 1, unitPrice: 28000, total: 28000, status: 'Completed', paymentMethod: 'Cash' },
    { id: 'INV-2024-018', date: '2024-06-11', customer: 'Mia Rathnayake', product: '6-Seater Dining Set', category: 'Dining Sets', quantity: 1, unitPrice: 125000, total: 125000, status: 'Completed', paymentMethod: 'Card' },
    { id: 'INV-2024-019', date: '2024-06-10', customer: 'Henry Amarasinghe', product: 'Recliner Sofa', category: 'Sofas', quantity: 1, unitPrice: 78000, total: 78000, status: 'Pending', paymentMethod: 'Bank Transfer' },
    { id: 'INV-2024-020', date: '2024-06-09', customer: 'Ella Jayasuriya', product: 'Sliding Wardrobe', category: 'Wardrobes', quantity: 1, unitPrice: 110000, total: 110000, status: 'Completed', paymentMethod: 'Cash' },
  ];

  // Filter transactions based on search and category
  const filteredTransactions = salesTransactions.filter(transaction => {
    const matchesSearch = searchQuery === '' || 
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.product.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = reportCategory === 'all' || 
      transaction.category.toLowerCase().includes(reportCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  // Calculate summary statistics
  const totalRevenue = filteredTransactions.reduce((sum, t) => sum + t.total, 0);
  const completedOrders = filteredTransactions.filter(t => t.status === 'Completed').length;
  const pendingOrders = filteredTransactions.filter(t => t.status === 'Pending').length;
  const averageOrderValue = filteredTransactions.length > 0 ? totalRevenue / filteredTransactions.length : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Business Reports</h1>
            <p className="text-md text-gray-600 mt-1">Comprehensive analytics and insights</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-medium">
              <Download className="w-4 h-4" />
              Export All
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Report Generation Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate Custom Reports</h2>
          <p className="text-sm text-gray-600 mb-6">Select a report type to preview and export</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button 
              onClick={() => setActiveReport('sales')}
              className="flex flex-col items-start p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition group"
            >
              <div className="flex items-center justify-between w-full mb-3">
                <div className="bg-orange-100 rounded-lg p-2 group-hover:bg-orange-200 transition">
                  <DollarSign className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Sales Report</h3>
              <p className="text-xs text-gray-600">Revenue, orders, and sales trends</p>
            </button>

            <button className="flex flex-col items-start p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition group">
              <div className="flex items-center justify-between w-full mb-3">
                <div className="bg-blue-100 rounded-lg p-2 group-hover:bg-blue-200 transition">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Inventory Report</h3>
              <p className="text-xs text-gray-600">Stock levels, materials & finished goods</p>
            </button>

            <button className="flex flex-col items-start p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition group">
              <div className="flex items-center justify-between w-full mb-3">
                <div className="bg-green-100 rounded-lg p-2 group-hover:bg-green-200 transition">
                  <ShoppingCart className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Orders Report</h3>
              <p className="text-xs text-gray-600">Pending, completed & custom orders</p>
            </button>

            <button className="flex flex-col items-start p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition group">
              <div className="flex items-center justify-between w-full mb-3">
                <div className="bg-purple-100 rounded-lg p-2 group-hover:bg-purple-200 transition">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Customer Report</h3>
              <p className="text-xs text-gray-600">New customers, repeat buyers & demographics</p>
            </button>

            <button className="flex flex-col items-start p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition group">
              <div className="flex items-center justify-between w-full mb-3">
                <div className="bg-yellow-100 rounded-lg p-2 group-hover:bg-yellow-200 transition">
                  <Package className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Production Report</h3>
              <p className="text-xs text-gray-600">Items produced, time taken & efficiency</p>
            </button>

            <button className="flex flex-col items-start p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition group">
              <div className="flex items-center justify-between w-full mb-3">
                <div className="bg-red-100 rounded-lg p-2 group-hover:bg-red-200 transition">
                  <TrendingUp className="w-5 h-5 text-red-600" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Material Usage Report</h3>
              <p className="text-xs text-gray-600">Material consumption & supplier costs</p>
            </button>

            <button className="flex flex-col items-start p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition group">
              <div className="flex items-center justify-between w-full mb-3">
                <div className="bg-indigo-100 rounded-lg p-2 group-hover:bg-indigo-200 transition">
                  <BarChart className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Profit & Loss Report</h3>
              <p className="text-xs text-gray-600">Revenue, costs & net profit analysis</p>
            </button>

            <button className="flex flex-col items-start p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition group">
              <div className="flex items-center justify-between w-full mb-3">
                <div className="bg-pink-100 rounded-lg p-2 group-hover:bg-pink-200 transition">
                  <Package className="w-5 h-5 text-pink-600" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Product Performance</h3>
              <p className="text-xs text-gray-600">Best sellers, slow movers & profitability</p>
            </button>

            <button className="flex flex-col items-start p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition group">
              <div className="flex items-center justify-between w-full mb-3">
                <div className="bg-teal-100 rounded-lg p-2 group-hover:bg-teal-200 transition">
                  <Calendar className="w-5 h-5 text-teal-600" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Custom Date Range</h3>
              <p className="text-xs text-gray-600">Generate report for any date range</p>
            </button>
          </div>
        </div>

        {/* Sales Report Preview - Detailed Table View */}
        {activeReport === 'sales' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Report Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-lg p-2">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Sales Report</h2>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveReport(null)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition"
                >
                  ✕
                </button>
              </div>
            </div>

          

            {/* Filters and Search */}
            <div className="border-b border-gray-200 bg-white px-6 py-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[250px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by invoice, customer, or product..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <select
                    value={reportDateRange}
                    onChange={(e) => setReportDateRange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                    <option value="year">This Year</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>

                <div>
                  <select
                    value={reportCategory}
                    onChange={(e) => {
                      setReportCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="beds">Beds</option>
                    <option value="dining">Dining Sets</option>
                    <option value="sofas">Sofas</option>
                    <option value="wardrobes">Wardrobes</option>
                    <option value="tables">Tables</option>
                  </select>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-medium text-sm">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

              {/* Summary Details as Points */}
<div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
  <ul className="space-y-4">
    <li className="text-gray-900">
      <span className="font-semibold">• Total Revenue:</span> Rs. {totalRevenue.toLocaleString()} 
      <span className="text-gray-500"> ({filteredTransactions.length} transactions)</span>
    </li>
    <li className="text-gray-900">
      <span className="font-semibold">• Completed Orders:</span> {completedOrders} 
      <span className="text-gray-500"> (Successfully processed)</span>
    </li>
    <li className="text-gray-900">
      <span className="font-semibold">• Pending Orders:</span> {pendingOrders} 
      <span className="text-gray-500"> (Awaiting completion)</span>
    </li>
    <li className="text-gray-900">
      <span className="font-semibold">• Average Order Value:</span> Rs. {averageOrderValue.toLocaleString(undefined, {maximumFractionDigits: 0})} 
      <span className="text-gray-500"> (Per transaction)</span>
    </li>
  </ul>
</div>


            {/* Detailed Transactions Table */}
            <div className="overflow-x-auto mt-10">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Invoice ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Qty</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Unit Price</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-600">{transaction.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{transaction.date}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{transaction.customer}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{transaction.product}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5  text-sm font-medium  text-gray-600">
                          {transaction.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-sm text-gray-900">{transaction.quantity}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="text-sm text-gray-900">Rs. {transaction.unitPrice.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="text-sm font-semibold text-gray-900">Rs. {transaction.total.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-sm text-gray-600">{transaction.paymentMethod}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 text-sm font-medium ${
                          transaction.status === 'Completed' 
                            ? ' text-gray-600' 
                            : ' text-gray-600'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white border-t border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(endIndex, filteredTransactions.length)}</span> of{' '}
                  <span className="font-medium">{filteredTransactions.length}</span> results
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNum = index + 1;
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                              currentPage === pageNum
                                                            ? 'bg-orange-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (
                        pageNum === currentPage - 2 ||
                        pageNum === currentPage + 2
                      ) {
                        return <span key={pageNum} className="px-2 text-gray-500">…</span>;
                      } else {
                        return null;
                      }
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
