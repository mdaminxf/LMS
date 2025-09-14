import { NextRequest, NextResponse } from 'next/server';
import { mockActivities } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get('studentId');

  let activities = mockActivities;
  
  if (studentId) {
    activities = activities.filter(activity => activity.studentId === studentId);
  }

  return NextResponse.json(activities);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newActivity = {
      id: Date.now().toString(),
      ...body,
      status: 'pending',
      submittedDate: new Date().toISOString()
    };

    // In a real app, this would save to database
    mockActivities.push(newActivity);

    return NextResponse.json({ success: true, activity: newActivity });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}