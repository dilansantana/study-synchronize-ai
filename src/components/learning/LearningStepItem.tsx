
import React from 'react';
import { Check, BookOpen, GraduationCap, Map, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LearningStep } from '@/types/learning-path';

interface LearningStepItemProps {
  step: LearningStep;
  expanded: string | null;
  onToggle: (stepId: string) => void;
  onMarkComplete: (stepId: string) => void;
}

export const LearningStepItem: React.FC<LearningStepItemProps> = ({
  step,
  expanded,
  onToggle,
  onMarkComplete
}) => {
  const getResourceIcon = (type: string) => {
    switch(type) {
      case 'video': return <div className="p-2 rounded-full bg-primary/10"><BookOpen className="h-4 w-4 text-primary" /></div>;
      case 'article': return <div className="p-2 rounded-full bg-blue-100"><BookOpen className="h-4 w-4 text-blue-600" /></div>;
      case 'quiz': return <div className="p-2 rounded-full bg-orange-100"><GraduationCap className="h-4 w-4 text-orange-600" /></div>;
      case 'flashcard': return <div className="p-2 rounded-full bg-green-100"><Map className="h-4 w-4 text-green-600" /></div>;
      case 'practice': return <div className="p-2 rounded-full bg-purple-100"><Star className="h-4 w-4 text-purple-600" /></div>;
      default: return <div className="p-2 rounded-full bg-gray-100"><BookOpen className="h-4 w-4 text-gray-600" /></div>;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner': return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Beginner</Badge>;
      case 'intermediate': return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Intermediate</Badge>;
      case 'advanced': return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Advanced</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div 
      className={`p-4 border rounded-md transition-all ${
        expanded === step.id ? 'bg-secondary/20' : 'hover:bg-secondary/10'
      } ${step.completed ? 'border-green-200' : 'border-gray-200'}`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">
          {step.completed ? (
            <div className="p-2 rounded-full bg-green-100">
              <Check className="h-4 w-4 text-green-600" />
            </div>
          ) : (
            getResourceIcon(step.resourceType)
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-medium">{step.title}</h4>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{step.estimatedTime}</span>
              {getDifficultyBadge(step.difficulty)}
            </div>
          </div>
          
          {expanded === step.id && (
            <div className="mt-3 space-y-3">
              <p className="text-sm text-muted-foreground">{step.description}</p>
              <div className="flex space-x-2">
                <Button variant="default" size="sm">
                  View Resources
                </Button>
                {!step.completed && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onMarkComplete(step.id)}
                  >
                    Mark as Complete
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onToggle(step.id)}
          className="ml-2"
        >
          {expanded === step.id ? 'Hide' : 'Details'}
        </Button>
      </div>
    </div>
  );
};
