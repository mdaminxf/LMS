'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
  id: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  name: string;
  avatar?: string;
  rollNo?: string;
  department?: string;
  year?: string;
  degree?: string;
  joinDate?: string;
  designation?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const AUTH_STORAGE_KEY = 'sap_auth';

export class AuthService {
  static saveAuth(authState: AuthState): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
    }
  }

  static getAuth(): AuthState | null {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  }

  static clearAuth(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }

  static generateDummyToken(user: User): string {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h expiry
    };
    return btoa(JSON.stringify(payload));
  }

  static validateToken(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token));
      return payload.exp > Math.floor(Date.now() / 1000);
    } catch {
      return false;
    }
  }

  static getUserFromToken(token: string): User | null {
    try {
      const payload = JSON.parse(atob(token));
      return {
        id: payload.id,
        email: payload.email,
        role: payload.role,
        name: payload.name || 'User',
      };
    } catch {
      return null;
    }
  }
}

// ---------- React Hook for Auth ----------
export function useAuth() {
  const router = useRouter();

  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const stored = AuthService.getAuth();
    if (stored && stored.token && AuthService.validateToken(stored.token)) {
      setAuth(stored);
    } else {
      AuthService.clearAuth();
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) return false;

      const data = await response.json();
      AuthService.saveAuth(data);
      setAuth(data); // Update state to trigger re-render

      // Navigate to dashboard after login
      router.push('/dashboard');
      return true;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  }, [router]);

  const logout = useCallback(() => {
    AuthService.clearAuth();
    setAuth({ user: null, token: null, isAuthenticated: false });
    router.push('/login');
  }, [router]);

  const register = useCallback(async (userData: any) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      return response.ok;
    } catch {
      return false;
    }
  }, []);

  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    login,
    logout,
    register,
  };
}
