
import React from 'react';
import { BarChart } from 'lucide-react';
import AnimatedTransition from '../AnimatedTransition';

const LearningProgress: React.FC = () => {
  return (
    <AnimatedTransition animation="slide" delay={400} className="rounded-lg border bg-card shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">Learning Progress</h3>
        <div className="h-48 flex items-center justify-center">
          <div className="text-muted-foreground text-sm flex items-center">
            <BarChart className="w-5 h-5 mr-2" />
            <span>Learning statistics chart will appear here</span>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default LearningProgress;
