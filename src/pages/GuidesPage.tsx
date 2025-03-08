
import React from 'react';
import Layout from '@/components/Layout';
import SavedGuides from '@/components/learning/SavedGuides';
import AIGuideGenerator from '@/components/learning/AIGuideGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GuidesPage: React.FC = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Ultimate Guides</h1>
        <p className="text-muted-foreground mt-2">
          Access and manage your custom created study guides or generate new ones with AI.
        </p>
      </div>
      
      <Tabs defaultValue="saved" className="space-y-4">
        <TabsList>
          <TabsTrigger value="saved">Saved Guides</TabsTrigger>
          <TabsTrigger value="generate">Generate with AI</TabsTrigger>
        </TabsList>
        
        <TabsContent value="saved">
          <SavedGuides />
        </TabsContent>
        
        <TabsContent value="generate">
          <AIGuideGenerator />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default GuidesPage;
