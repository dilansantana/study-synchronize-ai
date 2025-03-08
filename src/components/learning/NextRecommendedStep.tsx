
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LearningStep } from '@/types/learning-path';

interface NextRecommendedStepProps {
  nextStep: LearningStep | undefined;
  onToggleStep: (stepId: string) => void;
  getDifficultyBadge: (difficulty: string) => React.ReactNode;
}

export const NextRecommendedStep: React.FC<NextRecommendedStepProps> = ({
  nextStep,
  onToggleStep,
  getDifficultyBadge
}) => {
  if (!nextStep) return null;
  
  return (
    <div className="p-4 border rounded-md bg-secondary/20">
      <h3 className="text-sm font-semibold mb-1">Recommended Next Step:</h3>
      <p className="text-base font-medium">{nextStep.title}</p>
      <div className="flex items-center mt-2 space-x-2">
        <span className="text-xs text-muted-foreground">{nextStep.estimatedTime}</span>
        {getDifficultyBadge(nextStep.difficulty)}
      </div>
      <Button 
        variant="default" 
        size="sm" 
        className="mt-3"
        onClick={() => onToggleStep(nextStep.id)}
      >
        Start Learning
      </Button>
    </div>
  );
};
