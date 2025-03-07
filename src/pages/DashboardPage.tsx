
import React from 'react';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';

const DashboardPage: React.FC = () => {
  // In a real app, this would come from authentication
  const userData = {
    id: "user-123",
    name: "IT Learner"
  };

  return (
    <Layout>
      <Dashboard 
        userName={userData.name} 
        userId={userData.id} 
      />
    </Layout>
  );
};

export default DashboardPage;
