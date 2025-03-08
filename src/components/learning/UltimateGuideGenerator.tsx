
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentItem } from "@/data/learningResources";
import { useNavigate } from 'react-router-dom';
import { GuideGeneratorSelector } from './GuideGeneratorSelector';
import { useGuideGenerator } from '@/hooks/useGuideGenerator';

interface UltimateGuideGeneratorProps {
  availableResources: ContentItem[];
}

export const UltimateGuideGenerator: React.FC<UltimateGuideGeneratorProps> = ({ availableResources }) => {
  const navigate = useNavigate();
  const [guideName, setGuideName] = useState('');
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  
  const {
    isGenerating,
    progress,
    generatedGuide,
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
      // Directly navigate to the new guide after generation
      navigate(`/guide/${guide.id}`);
    }
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
      </CardContent>
      <CardFooter className="flex justify-end">
        {/* No back button needed since we're not using tabs anymore */}
      </CardFooter>
    </Card>
  );
};
