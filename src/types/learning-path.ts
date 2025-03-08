
export interface LearningStep {
  id: string;
  title: string;
  description: string;
  resourceType: 'video' | 'article' | 'quiz' | 'flashcard' | 'practice';
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
}

export interface PersonalizedPathProps {
  certificationName: string;
}

// Add soft UI colors for better readability
declare module '@/components/ui/alert' {
  interface AlertProps {
    className?: string;
  }
}

// Add CSS variables
export type SoftColors = {
  'soft-green': string;
  'soft-yellow': string;
  'soft-orange': string;
  'soft-purple': string;
  'soft-pink': string;
  'soft-peach': string;
  'soft-blue': string;
  'soft-gray': string;
  'dark-charcoal': string;
}
