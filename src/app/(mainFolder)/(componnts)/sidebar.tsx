'use client';

import { useState } from 'react';
import { 
  Home, Package, ShoppingCart, Archive, Users, Truck, 
  Bell, BarChart3, Settings, LogOut, Menu, X, ChevronDown, DollarSign
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [financeOpen, setFinanceOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard', badge: null, hasSubmenu: false },
    { icon: Users, label: 'Customers', path: '/customers', badge: null, hasSubmenu: false },
    { icon: Package, label: 'Products', path: '/products', badge: null, hasSubmenu: false },
    { icon: ShoppingCart, label: 'Orders', path: '/orders', badge: null, hasSubmenu: false },
    { 
      icon: Archive, 
      label: 'Inventory', 
      path: '/inventory', 
      badge: null, 
      hasSubmenu: true,
      submenuState: inventoryOpen,
      setSubmenuState: setInventoryOpen,
      submenu: [
        { label: 'Products', path: '/inventory/products' },
        { label: 'Materials', path: '/inventory/materials' }
      ]
    },
    { icon: Truck, label: 'Suppliers', path: '/suppliers', badge: null, hasSubmenu: false },
    { 
      icon: DollarSign, 
      label: 'Finance', 
      path: '/finance', 
      badge: null, 
      hasSubmenu: true,
      submenuState: financeOpen,
      setSubmenuState: setFinanceOpen,
      submenu: [
        { label: 'Sales & Revenue', path: '/finance/sales' },
        { label: 'Expenses & Purchases', path: '/finance/expenses' }
      ]
    },
    { icon: BarChart3, label: 'Reports', path: '/reports', badge: null, hasSubmenu: false }
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('isAuthenticated');
    router.push('/');
  };

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 flex flex-col`}>
      {/* Logo with Toggle */}
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        {isOpen ? (
          <>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold">A</span>
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-bold">Anjalika</h1>
                <p className="text-xs text-gray-400">Furniture</p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="p-1.5 hover:bg-gray-800 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold">A</span>
            </div>
            <button
              onClick={onToggle}
              className="p-1.5 hover:bg-gray-800 rounded-lg transition"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.label}>
            <button
              onClick={() => {
                if (item.hasSubmenu && item.setSubmenuState) {
                  item.setSubmenuState(!item.submenuState);
                } else {
                  handleNavigation(item.path);
                }
              }}
              className={`w-full flex items-center ${isOpen ? 'px-4' : 'px-6'} py-3 hover:bg-gray-800 transition ${
                isActive(item.path) ? 'bg-gray-800 border-l-4 border-amber-600' : ''
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && (
                <>
                  <span className="ml-3 flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {item.hasSubmenu && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${item.submenuState ? 'rotate-180' : ''}`} />
                  )}
                </>
              )}
            </button>
            
            {/* Submenu */}
            {item.hasSubmenu && isOpen && item.submenuState && (
              <div className="bg-gray-950">
                {item.submenu?.map((subItem) => (
                  <button
                    key={subItem.path}
                    onClick={() => handleNavigation(subItem.path)}
                    className={`w-full flex items-center px-12 py-2.5 hover:bg-gray-800 transition text-sm ${
                      pathname === subItem.path ? 'bg-gray-800 text-amber-500' : 'text-gray-400'
                    }`}
                  >
                    {subItem.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom Menu */}
      <div className="border-t border-gray-800">
        <button 
          onClick={() => handleNavigation('/settings')}
          className={`w-full flex items-center ${isOpen ? 'px-4' : 'px-6'} py-3 hover:bg-gray-800 transition`}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span className="ml-3">Settings</span>}
        </button>
        <button 
          onClick={handleLogout}
          className={`w-full flex items-center ${isOpen ? 'px-4' : 'px-6'} py-3 hover:bg-gray-800 transition text-red-400`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </aside>
  );
}