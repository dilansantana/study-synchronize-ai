
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
