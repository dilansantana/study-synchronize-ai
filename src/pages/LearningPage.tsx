
import React from 'react';
import Layout from '@/components/Layout';
import ContentAggregator from '@/components/ContentAggregator';

const LearningPage: React.FC = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Certification Learning Resources</h1>
        <p className="text-muted-foreground mt-2">
          Search for any certification or course to find curated learning materials and create personalized study plans.
        </p>
      </div>

      <ContentAggregator />
    </Layout>
  );
};

export default LearningPage;
