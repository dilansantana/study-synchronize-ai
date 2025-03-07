
import React from 'react';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';

const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <Dashboard userName="IT Learner" />
    </Layout>
  );
};

export default DashboardPage;
