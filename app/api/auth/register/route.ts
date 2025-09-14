import { NextRequest, NextResponse } from 'next/server';
import { mockUsers } from '@/lib/mockData';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, rollNo, department, year, degree } = body;

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email || u.rollNo === rollNo);
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // In a real app, this would save to database
    const newUser = {
      id: Date.now().toString(),
      email,
      password: 'demo123', // In real app, this would be hashed
      role: 'student' as const,
      name,
      rollNo,
      department,
      year,
      degree,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      joinDate: new Date().toISOString().split('T')[0]
    };

    // Simulate saving to database
    mockUsers.push(newUser);

    return NextResponse.json({ success: true, message: 'Registration successful' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}