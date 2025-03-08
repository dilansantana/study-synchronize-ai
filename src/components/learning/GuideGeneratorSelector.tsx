
import React from 'react';
import { Button } from "@/components/ui/button";
import { ResourceSelectionList } from './ResourceSelectionList';
import { GenerationProgress } from './GenerationProgress';
import { GuideNameInput } from './GuideNameInput';
import { ContentItem } from "@/data/learningResources";

interface GuideGeneratorSelectorProps {
  guideName: string;
  setGuideName: (name: string) => void;
  selectedResources: string[];
  availableResources: ContentItem[];
  onResourceToggle: (id: string) => void;
  isGenerating: boolean;
  progress: number;
  onGenerate: () => void;
}

export const GuideGeneratorSelector: React.FC<GuideGeneratorSelectorProps> = ({
  guideName,
  setGuideName,
  selectedResources,
  availableResources,
  onResourceToggle,
  isGenerating,
  progress,
  onGenerate
}) => {
  return (
    <div className="space-y-4">
      <GuideNameInput 
        guideName={guideName}
        onChange={setGuideName}
      />
      
      <ResourceSelectionList
        availableResources={availableResources}
        selectedResources={selectedResources}
        onResourceToggle={onResourceToggle}
      />
      
      <GenerationProgress 
        isGenerating={isGenerating}
        progress={progress}
      />
      
      <div className="flex justify-end">
        <Button 
          onClick={onGenerate}
          disabled={isGenerating || !guideName || selectedResources.length === 0}
        >
          {isGenerating ? "Extracting Information..." : "Generate Ultimate Guide"}
        </Button>
      </div>
    </div>
  );
};
