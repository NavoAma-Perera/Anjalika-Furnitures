'use client';

import { Bell, Package, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function Notifications() {
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'order',
      icon: Package,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      title: 'New Order Received',
      message: 'Rajesh Kumar placed an order for Custom Dining Set worth Rs. 125,000',
      time: '5 minutes ago',
      unread: true
    },
    {
      id: 2,
      type: 'stock',
      icon: AlertTriangle,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50',
      title: 'Stock Alert: Out of Stock',
      message: 'Mahogany Wardrobe is now out of stock. Reorder immediately.',
      time: '30 minutes ago',
      unread: true
    },
    {
      id: 3,
      type: 'production',
      icon: CheckCircle,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      title: 'Production Completed',
      message: 'King Size Bed Frame for Ahmed Hassan is ready for delivery',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 4,
      type: 'stock',
      icon: AlertTriangle,
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      title: 'Low Stock Warning',
      message: 'Teak Wood Planks running low (15 pieces remaining)',
      time: '3 hours ago',
      unread: false
    },
    {
      id: 5,
      type: 'order',
      icon: Clock,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      title: 'Order Pending Attention',
      message: 'Priya Silva\'s King Size Bed order has been pending for 2 days',
      time: '5 hours ago',
      unread: false
    },
    {
      id: 6,
      type: 'sales',
      icon: TrendingUp,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      title: 'Daily Sales Target Achieved',
      message: 'Congratulations! Today\'s sales reached Rs. 125,000 (12% above target)',
      time: '6 hours ago',
      unread: false
    },
    {
      id: 7,
      type: 'production',
      icon: Clock,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      title: 'Production Delayed',
      message: 'Custom L-Shape Sofa production running 1 day behind schedule',
      time: '1 day ago',
      unread: false
    },
    {
      id: 8,
      type: 'stock',
      icon: AlertTriangle,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50',
      title: 'Critical: Material Out of Stock',
      message: 'Sofa Cushions are completely out of stock. Production affected.',
      time: '1 day ago',
      unread: false
    },
    {
      id: 9,
      type: 'order',
      icon: CheckCircle,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      title: 'Order Delivered Successfully',
      message: 'Office Desk Set delivered to Anil Fernando',
      time: '2 days ago',
      unread: false
    },
    {
      id: 10,
      type: 'sales',
      icon: TrendingUp,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      title: 'Weekly Sales Milestone',
      message: 'This week\'s sales exceeded Rs. 500,000 - Best week this month!',
      time: '3 days ago',
      unread: false
    }
  ];

  const filterCategories = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => n.unread).length },
    { id: 'order', label: 'Orders', count: notifications.filter(n => n.type === 'order').length },
    { id: 'stock', label: 'Stock', count: notifications.filter(n => n.type === 'stock').length },
    { id: 'production', label: 'Production', count: notifications.filter(n => n.type === 'production').length },
    { id: 'sales', label: 'Sales', count: notifications.filter(n => n.type === 'sales').length }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return notification.unread;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="w-8 h-8 text-orange-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-md text-gray-600 mt-1">
                {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>
          </div>
          <button className="text-sm text-orange-600 hover:text-orange-700 font-medium transition">
            Mark all as read
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 p-2">
          <div className="flex flex-wrap gap-2">
            {filterCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === category.id
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.label}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  filter === category.id
                    ? 'bg-orange-700'
                    : 'bg-gray-200'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No notifications found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`p-6 hover:bg-gray-50 transition cursor-pointer ${
                      notification.unread ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`${notification.bgColor} rounded-full p-3 mr-4`}>
                        <Icon className={`w-5 h-5 ${notification.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 text-sm">
                            {notification.title}
                            {notification.unread && (
                              <span className="ml-2 w-2 h-2 bg-orange-600 rounded-full inline-block"></span>
                            )}
                          </h3>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

       
      </div>
    </div>
  );
}