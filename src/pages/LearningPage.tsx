
import React from 'react';
import Layout from '@/components/Layout';
import ContentAggregator from '@/components/ContentAggregator';
import { ChatGPTInterface } from '@/components/learning/ChatGPTInterface';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Bot } from 'lucide-react';

const LearningPage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Learning Resources</h1>
          <p className="text-muted-foreground mt-2">
            Find educational content and get AI assistance to help you master IT skills and certifications
          </p>
        </div>

        <Tabs defaultValue="resources" className="space-y-4">
          <TabsList>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              AI Chat
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="resources">
            <ContentAggregator />
          </TabsContent>
          
          <TabsContent value="chat">
            <ChatGPTInterface />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default LearningPage;
