'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell } from 'lucide-react';
import Sidebar from './(componnts)/sidebar';
import Footer from './(componnts)/footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter(); // 👈 for navigation

  const handleToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNotificationsClick = () => {
    router.push('/notifications'); // 👈 navigate to the notifications page
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onToggle={handleToggle} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with Notification Icon */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-end">
          <button
            onClick={handleNotificationsClick} // 👈 navigate when clicked
            className="relative p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        {/* Footer Component */}
        <Footer />
      </div>
    </div>
  );
}
