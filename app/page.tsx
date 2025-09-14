'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/auth';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/login';
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
          <span className="text-2xl font-bold text-white">S</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Student Achievement Portal</h1>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}