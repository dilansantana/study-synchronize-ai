
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Check, BookOpen, GraduationCap, Map, Star } from 'lucide-react';
import { useUserProgress } from '@/utils/progressUtils';
import { useToast } from '@/hooks/use-toast';

interface LearningStep {
  id: string;
  title: string;
  description: string;
  resourceType: 'video' | 'article' | 'quiz' | 'flashcard' | 'practice';
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
}

interface PersonalizedPathProps {
  certificationName: string;
}

export const PersonalizedPath: React.FC<PersonalizedPathProps> = ({ certificationName }) => {
  const { toast } = useToast();
  const { progress, completeTopics, recordActivity } = useUserProgress();
  const [expanded, setExpanded] = useState<string | null>(null);
  
  // This would normally be fetched from an API based on user's progress
  const [learningPath, setLearningPath] = useState<LearningStep[]>([
    {
      id: '1',
      title: 'Introduction to Cybersecurity Concepts',
      description: 'Understand the fundamental concepts of cybersecurity, including CIA triad, threat types, and basic security principles.',
      resourceType: 'video',
      estimatedTime: '45 min',
      difficulty: 'beginner',
      completed: true
    },
    {
      id: '2',
      title: 'Network Security Fundamentals',
      description: 'Learn about firewalls, VPNs, NAT, and other network security components.',
      resourceType: 'article',
      estimatedTime: '1 hour',
      difficulty: 'beginner',
      completed: true
    },
    {
      id: '3',
      title: 'Cryptography Basics',
      description: 'Understand encryption, hashing, digital signatures, and public key infrastructure.',
      resourceType: 'video',
      estimatedTime: '1.5 hours',
      difficulty: 'intermediate',
      completed: false
    },
    {
      id: '4',
      title: 'Access Control Mechanisms',
      description: 'Learn about authentication factors, authorization models, and identity management.',
      resourceType: 'article',
      estimatedTime: '1 hour',
      difficulty: 'intermediate',
      completed: false
    },
    {
      id: '5',
      title: 'Practice Quiz: Security Fundamentals',
      description: 'Test your knowledge on security basics with adaptive questions based on your progress.',
      resourceType: 'quiz',
      estimatedTime: '30 min',
      difficulty: 'intermediate',
      completed: false
    },
  ]);

  const handleToggleStep = (stepId: string) => {
    setExpanded(expanded === stepId ? null : stepId);
  };

  const handleMarkComplete = (stepId: string) => {
    setLearningPath(prev => 
      prev.map(step => 
        step.id === stepId ? { ...step, completed: true } : step
      )
    );
    
    completeTopics(1);
    recordActivity(`Completed "${learningPath.find(s => s.id === stepId)?.title}"`);
    
    toast({
      title: "Step completed!",
      description: "Your progress has been updated.",
      duration: 3000,
    });
  };

  // Calculate overall progress
  const completedSteps = learningPath.filter(step => step.completed).length;
  const totalSteps = learningPath.length;
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);
  
  // Get next recommended step
  const nextStep = learningPath.find(step => !step.completed);

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
              onClick={() => handleToggleStep(nextStep.id)}
            >
              Start Learning
            </Button>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Learning Path</h3>
          {learningPath.map(step => (
            <div 
              key={step.id}
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
                            onClick={() => handleMarkComplete(step.id)}
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
                  onClick={() => handleToggleStep(step.id)}
                  className="ml-2"
                >
                  {expanded === step.id ? 'Hide' : 'Details'}
                </Button>
              </div>
            </div>
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
