import { NextRequest, NextResponse } from 'next/server';
import { mockActivities } from '@/lib/mockData';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { activities } = body;

    // In a real app, this would sync offline data with the database
    activities.forEach((activity: any) => {
      const existingIndex = mockActivities.findIndex(a => a.id === activity.id);
      if (existingIndex === -1) {
        mockActivities.push(activity);
      } else {
        mockActivities[existingIndex] = activity;
      }
    });

    return NextResponse.json({ success: true, synced: activities.length });
  } catch (error) {
    return NextResponse.json(
      { error: 'Sync failed' },
      { status: 500 }
    );
  }
}