'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { useOffline } from '@/lib/offline';
import { 
  Bell, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Home, 
  Trophy, 
  FileText, 
  Users, 
  BarChart3,
  CheckCircle,
  Settings,
  Wifi,
  WifiOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const { isOnline } = useOffline();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const checkOnlineStatus = () => setOnline(isOnline());
    checkOnlineStatus();

    window.addEventListener('online', checkOnlineStatus);
    window.addEventListener('offline', checkOnlineStatus);

    return () => {
      window.removeEventListener('online', checkOnlineStatus);
      window.removeEventListener('offline', checkOnlineStatus);
    };
  }, []);

  const getNavigationItems = () => {
    const commonItems = [
      { name: 'Dashboard', href: '/dashboard', icon: Home },
    ];

    switch (user?.role) {
      case 'student':
        return [
          ...commonItems,
          { name: 'Activities', href: '/activities', icon: Trophy },
          { name: 'Achievements', href: '/achievements', icon: CheckCircle },
          { name: 'Portfolio', href: '/portfolio', icon: FileText },
        ];
      case 'faculty':
        return [
          ...commonItems,
          { name: 'Approvals', href: '/approvals', icon: CheckCircle },
          { name: 'Reports', href: '/reports', icon: BarChart3 },
          { name: 'Students', href: '/students', icon: Users },
        ];
      case 'admin':
        return [
          ...commonItems,
          { name: 'Analytics', href: '/analytics', icon: BarChart3 },
          { name: 'Users', href: '/users', icon: Users },
          { name: 'Reports', href: '/reports', icon: FileText },
          { name: 'Settings', href: '/settings', icon: Settings },
        ];
      default:
        return commonItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">SAP Portal</h1>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6">
          <div className="px-6 mb-6">
            <div className="flex items-center space-x-3">
              <img 
                src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'} 
                alt={user?.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          <div className="space-y-1 px-3">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </a>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
          <Button 
            onClick={logout}
            variant="outline" 
            className="w-full"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center space-x-4">
            {/* Online/Offline Status */}
            <div className="flex items-center space-x-2">
              {online ? (
                <Wifi className="h-4 w-4 text-green-500" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-500" />
              )}
              <span className="text-xs text-gray-500">
                {online ? 'Online' : 'Offline'}
              </span>
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-md hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-600" />
              {notifications > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {notifications}
                </Badge>
              )}
            </button>

            {/* User Menu */}
            <button className="p-2 rounded-md hover:bg-gray-100">
              <User className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}