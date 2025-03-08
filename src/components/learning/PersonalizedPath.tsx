
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLearningPath } from '@/hooks/useLearningPath';
import { LearningStepItem } from './LearningStepItem';
import { NextRecommendedStep } from './NextRecommendedStep';
import { getDifficultyBadge } from '@/utils/learningPathUtils';
import { PersonalizedPathProps } from '@/types/learning-path';

export const PersonalizedPath: React.FC<PersonalizedPathProps> = ({ certificationName }) => {
  const {
    learningPath,
    expanded,
    completedSteps,
    totalSteps,
    progressPercentage,
    nextStep,
    handleToggleStep,
    handleMarkComplete
  } = useLearningPath();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Personalized Learning Path</CardTitle>
        <CardDescription>
          Tailored for {certificationName} certification based on your progress and learning style
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{completedSteps}/{totalSteps} steps</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        {nextStep && (
          <NextRecommendedStep 
            nextStep={nextStep}
            onToggleStep={handleToggleStep}
            getDifficultyBadge={getDifficultyBadge}
          />
        )}

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Learning Path</h3>
          {learningPath.map(step => (
            <LearningStepItem
              key={step.id}
              step={step}
              expanded={expanded}
              onToggle={handleToggleStep}
              onMarkComplete={handleMarkComplete}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Generate Complete Study Plan
        </Button>
      </CardFooter>
    </Card>
  );
};
