
import React from 'react';
import Layout from '@/components/Layout';
import ContentAggregator from '@/components/ContentAggregator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudyPlanGenerator from '@/components/learning/StudyPlanGenerator';

const LearningPage: React.FC = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Certification Learning Resources</h1>
        <p className="text-muted-foreground mt-2">
          Search for any certification or course to find curated learning materials and create personalized study plans.
        </p>
      </div>

      <Tabs defaultValue="resources" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="resources">Learning Resources</TabsTrigger>
          <TabsTrigger value="studyplan">Study Plan Generator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resources">
          <ContentAggregator />
        </TabsContent>
        
        <TabsContent value="studyplan">
          <StudyPlanGenerator />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default LearningPage;
