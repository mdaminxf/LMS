'use client';

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
      name: user.name, // ✅ include
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
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

export function useAuth() {
  if (typeof window === 'undefined') {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      login: async () => false,
      logout: () => {},
      register: async () => false,
    };
  }

  const authState = AuthService.getAuth();

  const login = async (email: string, password: string) => {
    // Simulate API call to backend
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      AuthService.saveAuth(data);
      window.location.reload(); // Refresh to update auth state
      return true;
    }
    return false;
  };

  const register = async (userData: any) => {
    // Simulate API call to backend
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    return response.ok;
  };

  const logout = () => {
    AuthService.clearAuth();
    window.location.href = '/login';
  };

  return {
    user: authState?.user || null,
    token: authState?.token || null,
    isAuthenticated: authState?.isAuthenticated || false,
    login,
    logout,
    register,
  };
}
