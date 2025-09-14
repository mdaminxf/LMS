'use client';

import dynamic from 'next/dynamic';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';

// Dynamically import the Dashboard content to disable SSR
const DashboardContent = dynamic(() => import('./DashboardContent'), {
  ssr: false,
});

export default function DashboardPageWrapper() {
  return (
    <ProtectedRoute children={undefined}>
      <Layout children={undefined}>
        <DashboardContent />
      </Layout>
    </ProtectedRoute>
  );
}
