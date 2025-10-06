'use client';

import { AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: "Today's Sales",
      value: "Rs. 125,000",
      change: "↑ 12% from yesterday",
      changeColor: "text-green-600",
      bgColor: "bg-gradient-to-br from-amber-700 to-orange-600",
      textColor: "text-white"
    },
    {
      title: "Pending Orders",
      value: "8",
      change: "3 need attention",
      changeColor: "text-orange-600",
      bgColor: "bg-white",
      textColor: "text-gray-900"
    },
    {
      title: "Low Stock Items",
      value: "5",
      change: "Reorder soon",
      changeColor: "text-red-600",
      bgColor: "bg-white",
      textColor: "text-gray-900"
    },
    {
      title: "Total Customers",
      value: "234",
      change: "↑ 5 new this week",
      changeColor: "text-green-600",
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
      product: "Queen Size Bed Frame",
      category: "Beds",
      stock: 1,
      status: "Low Stock",
      statusColor: "bg-yellow-100 text-yellow-700"
    },
    { 
      product: "Mahogany Wardrobe",
      category: "Wardrobes",
      stock: 0,
      status: "Out of Stock",
      statusColor: "bg-red-100 text-red-700"
    },
    { 
      product: "L-Shape Sofa Set",
      category: "Sofas",
      stock: 2,
      status: "Low Stock",
      statusColor: "bg-yellow-100 text-yellow-700"
    }
  ];

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600">Welcome back! Here's your business overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} rounded-xl shadow-lg p-6 ${stat.textColor}`}
          >
            <p className={`text-sm ${stat.textColor === 'text-white' ? 'text-white/80' : 'text-gray-600'} mb-2`}>
              {stat.title}
            </p>
            <p className="text-3xl font-bold mb-2">{stat.value}</p>
            <p className={`text-sm ${stat.changeColor} ${stat.textColor === 'text-white' ? 'text-white/90' : ''}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <button className="text-sm text-amber-600 hover:text-amber-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{order.customer}</p>
                  <p className="text-sm text-gray-600">{order.product}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 mb-1">{order.amount}</p>
                  <span className={`text-xs px-3 py-1 rounded-full ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Alerts */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Stock Alerts</h2>
          </div>
          <div className="space-y-4">
            {stockAlerts.map((item, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{item.product}</p>
                    <p className="text-xs text-gray-600">{item.category}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    Stock: {item.stock}
                  </span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${item.statusColor}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}