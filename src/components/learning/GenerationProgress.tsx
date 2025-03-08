
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface GenerationProgressProps {
  isGenerating: boolean;
  progress: number;
}

export const GenerationProgress: React.FC<GenerationProgressProps> = ({
  isGenerating,
  progress
}) => {
  if (!isGenerating) return null;
  
  return (
    <div className="space-y-2">
      <p className="text-sm">Extracting information from selected resources...</p>
      <Progress value={progress} className="h-2" />
    </div>
  );
};
