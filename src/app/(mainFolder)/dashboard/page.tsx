'use client';

import { AlertTriangle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const stats = [
    {
      title: "Today's Sales",
      value: "Rs. 125,000",
      change: "↑ 12% from yesterday",
      changeColor: "text-white/90",
      bgColor: "bg-gradient-to-br from-orange-600 to-orange-500",
      textColor: "text-white"
    },
    {
      title: "In Production",
      value: "6",
      subtext: "Custom orders",
      subtextColor: "text-blue-600",
      bgColor: "bg-white",
      textColor: "text-gray-900"
    },
    {
      title: "Pending Deliveries",
      value: "4",
      subtext: "Ready to ship",
      subtextColor: "text-green-600",
      bgColor: "bg-white",
      textColor: "text-gray-900"
    },
    {
      title: "This Month's Customers",
      value: "28",
      subtext: "↑ 8 from last month",
      subtextColor: "text-green-600",
      bgColor: "bg-white",
      textColor: "text-gray-900"
    }
  ];

  const recentOrders = [
    { 
      customer: "Rajesh Kumar", 
      product: "Custom Dining Set", 
      amount: "Rs. 125,000",
      status: "In Production",
      statusColor: "bg-blue-100 text-blue-700"
    },
    { 
      customer: "Priya Silva", 
      product: "King Size Bed", 
      amount: "Rs. 75,000",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-700"
    },
    { 
      customer: "Anil Fernando", 
      product: "Office Desk Set", 
      amount: "Rs. 55,000",
      status: "Ready",
      statusColor: "bg-green-100 text-green-700"
    }
  ];

  const stockAlerts = [
    { 
      product: "Teak Wood Planks",
      category: "Materials",
      stock: 15,
      unit: "pieces",
      status: "Low Stock",
      statusColor: "bg-yellow-100 text-yellow-700"
    },
    { 
      product: "Sofa Cushions",
      category: "Materials",
      stock: 0,
      unit: "sets",
      status: "Out of Stock",
      statusColor: "bg-red-100 text-red-700"
    },
    { 
      product: "Mahogany Wardrobe",
      category: "Finished Goods",
      stock: 0,
      unit: "units",
      status: "Out of Stock",
      statusColor: "bg-red-100 text-red-700"
    }
  ];

  // Sales trend data (last 30 days)
  const salesData = [
    { date: 'Week 1', sales: 420000 },
    { date: 'Week 2', sales: 380000 },
    { date: 'Week 3', sales: 550000 },
    { date: 'Week 4', sales: 625000 },
  ];

  // Product category performance
  const categoryData = [
    { category: 'Beds', sales: 450000, orders: 12 },
    { category: 'Sofas', sales: 380000, orders: 8 },
    { category: 'Dining Sets', sales: 520000, orders: 10 },
    { category: 'Wardrobes', sales: 290000, orders: 6 },
    { category: 'Tables', sales: 210000, orders: 15 },
  ];

  // Order status breakdown
  const orderStatusData = [
    { name: 'In Production', value: 6, color: '#3b82f6' },
    { name: 'Pending', value: 3, color: '#eab308' },
    { name: 'Ready', value: 4, color: '#22c55e' },
    { name: 'Delivered', value: 15, color: '#64748b' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-md text-gray-600 mt-1">Welcome back! Here's your business overview</p>
      </div>

      {/* Main Content */}
      <div className="p-8">
       

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} rounded-xl shadow-sm p-6 ${stat.textColor} border border-gray-100`}
            >
              <p className={`text-sm mb-2 ${stat.textColor === 'text-white' ? 'text-white/80' : 'text-gray-600'}`}>
                {stat.title}
              </p>
              <p className="text-3xl font-bold mb-2">{stat.value}</p>
              <p className={`text-sm ${stat.changeColor || stat.subtextColor}`}>
                {stat.change || stat.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Sales Trend Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Sales Trend (Last 4 Weeks)</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} tickFormatter={(value) => `Rs. ${value/1000}k`} />
                <Tooltip 
                  formatter={(value) => `Rs. ${value.toLocaleString()}`}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                />
                <Line type="monotone" dataKey="sales" stroke="#ea580c" strokeWidth={3} dot={{ fill: '#ea580c', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Order Status Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Status</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {orderStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Category Performance */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Product Category Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} tickFormatter={(value) => `Rs. ${value/1000}k`} />
              <Tooltip 
                formatter={(value) => `Rs. ${value.toLocaleString()}`}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Legend />
              <Bar dataKey="sales" fill="#ea580c" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <button className="text-sm text-orange-600 hover:text-orange-700 font-medium transition">
                Manage Orders
              </button>
            </div>
            <div className="space-y-3">
              {recentOrders.map((order, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{order.customer}</p>
                    <p className="text-sm text-gray-600 mt-0.5">{order.product}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-gray-900 text-sm mb-1">{order.amount}</p>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stock Alerts */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Stock Alerts</h2>
              </div>
              <button className="text-sm text-orange-600 hover:text-orange-700 font-medium transition">
                Reorder
              </button>
            </div>
            <div className="space-y-3">
              {stockAlerts.map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm leading-tight">{item.product}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{item.category}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-900 ml-2">
                      {item.stock} {item.unit}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium inline-block ${item.statusColor}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Production Status */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Production Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Custom L-Shape Sofa</p>
                  <p className="text-xs text-gray-600 mt-1">Customer: Sarah Perera</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-700">
                  Day 3/7
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '45%'}}></div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">King Size Bed Frame</p>
                  <p className="text-xs text-gray-600 mt-1">Customer: Ahmed Hassan</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-700">
                  Day 5/6
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '83%'}}></div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Office Desk & Chair Set</p>
                  <p className="text-xs text-gray-600 mt-1">Customer: Tech Solutions Ltd</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-700">
                  Day 2/5
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '40%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}