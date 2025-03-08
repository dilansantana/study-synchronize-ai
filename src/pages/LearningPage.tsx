
import React from 'react';
import Layout from '@/components/Layout';
import ContentAggregator from '@/components/ContentAggregator';

const LearningPage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Learning Resources</h1>
          <p className="text-muted-foreground mt-2">
            Find educational content to help you master IT skills and certifications
          </p>
        </div>

        <ContentAggregator />
      </div>
    </Layout>
  );
};

export default LearningPage;
