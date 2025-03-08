
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useUserProgress } from '@/utils/progressUtils';
import { LearningStep } from '@/types/learning-path';

export const useLearningPath = () => {
  const { toast } = useToast();
  const { completeTopics, recordActivity } = useUserProgress();
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

  return {
    learningPath,
    expanded,
    completedSteps,
    totalSteps,
    progressPercentage,
    nextStep,
    handleToggleStep,
    handleMarkComplete
  };
};
