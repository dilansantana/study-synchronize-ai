
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ContentAggregator from '@/components/ContentAggregator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SavedGuides from '@/components/learning/SavedGuides';
import { PersonalizedPath } from '@/components/learning/PersonalizedPath';

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
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="resources">Learning Resources</TabsTrigger>
          <TabsTrigger value="securityplus">Security+</TabsTrigger>
          <TabsTrigger value="ccna">CCNA</TabsTrigger>
          <TabsTrigger value="guides">My Guides</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resources">
          <ContentAggregator />
        </TabsContent>
        
        <TabsContent value="securityplus">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ContentAggregator />
            </div>
            <div>
              <PersonalizedPath certificationName="CompTIA Security+" />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="ccna">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ContentAggregator />
            </div>
            <div>
              <PersonalizedPath certificationName="Cisco CCNA" />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="guides">
          <SavedGuides />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default LearningPage;
