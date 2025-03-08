
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ContentAggregator from '@/components/ContentAggregator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudyPlanGenerator from '@/components/learning/StudyPlanGenerator';
import SavedGuides from '@/components/learning/SavedGuides';

const LearningPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("resources");
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Certification Learning Resources</h1>
        <p className="text-muted-foreground mt-2">
          Search for any certification or course to find curated learning materials and create personalized study plans.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="resources">Learning Resources</TabsTrigger>
          <TabsTrigger value="guides">My Guides</TabsTrigger>
          <TabsTrigger value="studyplan">Study Plan Generator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resources">
          <ContentAggregator />
        </TabsContent>
        
        <TabsContent value="guides">
          <SavedGuides />
        </TabsContent>
        
        <TabsContent value="studyplan">
          <StudyPlanGenerator />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default LearningPage;
