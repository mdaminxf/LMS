export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { mockUsers } from '@/lib/mockData';
import { AuthService } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Ensure JSON request
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Expected application/json' }, { status: 400 });
    }

    const body = await request.json();
    const email = (body.email || '').trim().toLowerCase();
    const password = (body.password || '').trim();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Find user in mock data
    const user = mockUsers.find(
      (u) => u.email.toLowerCase() === email && u.password === password
    );

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Generate dummy token
    const token = AuthService.generateDummyToken(user);

    const authState = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        avatar: user.avatar || '',
      },
      token,
      isAuthenticated: true,
    };

    return NextResponse.json(authState);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
