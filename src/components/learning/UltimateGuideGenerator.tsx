
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentItem } from "@/data/learningResources";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { GuidePreview } from './GuidePreview';
import { GuideGeneratorSelector } from './GuideGeneratorSelector';
import { useGuideGenerator } from '@/hooks/useGuideGenerator';

interface UltimateGuideGeneratorProps {
  availableResources: ContentItem[];
}

export const UltimateGuideGenerator: React.FC<UltimateGuideGeneratorProps> = ({ availableResources }) => {
  const navigate = useNavigate();
  const [guideName, setGuideName] = useState('');
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('select');
  
  const {
    isGenerating,
    progress,
    generatedGuide,
    setGeneratedGuide,
    handleGenerateGuide
  } = useGuideGenerator();

  const handleResourceToggle = (id: string) => {
    setSelectedResources(prev => 
      prev.includes(id)
        ? prev.filter(resourceId => resourceId !== id)
        : [...prev, id]
    );
  };

  const handleGenerateClick = async () => {
    const guide = await handleGenerateGuide(guideName, selectedResources, availableResources);
    if (guide) {
      setTimeout(() => {
        setActiveTab('preview');
      }, 1000);
    }
  };

  const handleCreateFlashcards = () => {
    if (!generatedGuide) return;
    navigate('/flashcards', { state: { guideContent: generatedGuide.content } });
  };

  const handleCreateQuiz = () => {
    if (!generatedGuide) return;
    navigate('/quiz', { state: { guideContent: generatedGuide.content } });
  };

  const handleViewGuide = () => {
    if (!generatedGuide) return;
    navigate(`/guide/${generatedGuide.id}`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ultimate Guide Generator</CardTitle>
        <CardDescription>
          Extract and combine information from multiple resources to create a comprehensive study guide
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="select">Select Resources</TabsTrigger>
            <TabsTrigger value="preview" disabled={!generatedGuide}>Preview Guide</TabsTrigger>
          </TabsList>
          
          <TabsContent value="select" className="space-y-4">
            <GuideGeneratorSelector
              guideName={guideName}
              setGuideName={setGuideName}
              selectedResources={selectedResources}
              availableResources={availableResources}
              onResourceToggle={handleResourceToggle}
              isGenerating={isGenerating}
              progress={progress}
              onGenerate={handleGenerateClick}
            />
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-4">
            <GuidePreview
              generatedGuide={generatedGuide}
              onCreateFlashcards={handleCreateFlashcards}
              onCreateQuiz={handleCreateQuiz}
              onViewGuide={handleViewGuide}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setActiveTab('select')}
          disabled={isGenerating || activeTab === 'select'}
        >
          Back
        </Button>
        {/* Removed the duplicate Generate button since it's already in GuideGeneratorSelector */}
      </CardFooter>
    </Card>
  );
};
