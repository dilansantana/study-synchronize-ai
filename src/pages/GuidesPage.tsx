
import React from 'react';
import Layout from '@/components/Layout';
import SavedGuides from '@/components/learning/SavedGuides';

const GuidesPage: React.FC = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Ultimate Guides</h1>
        <p className="text-muted-foreground mt-2">
          Access and manage all your custom created study guides for different certifications.
        </p>
      </div>
      
      <SavedGuides />
    </Layout>
  );
};

export default GuidesPage;
