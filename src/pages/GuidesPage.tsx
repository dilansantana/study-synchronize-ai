
import React from 'react';
import Layout from '@/components/Layout';
import SavedGuides from '@/components/learning/SavedGuides';
import AIGuideGenerator from '@/components/learning/AIGuideGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, BrainCircuit } from 'lucide-react';

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
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Saved Guides</span>
          </TabsTrigger>
          <TabsTrigger value="generate" className="flex items-center gap-2">
            <BrainCircuit className="h-4 w-4" />
            <span>Generate with AI</span>
          </TabsTrigger>
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
