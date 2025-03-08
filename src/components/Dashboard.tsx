
import React from 'react';
import { cn } from "@/lib/utils";
import AnimatedTransition from './AnimatedTransition';
import { useUserProgress } from '@/utils/progressUtils';
import DashboardStats from './dashboard/DashboardStats';
import CertificationSearch from './dashboard/CertificationSearch';
import LearningProgress from './dashboard/LearningProgress';
import RecentActivity from './dashboard/RecentActivity';

interface DashboardProps {
  className?: string;
  userName?: string;
  userId?: string;
}

const Dashboard: React.FC<DashboardProps> = ({
  className,
  userName = "User",
  userId = "default-user"
}) => {
  // Use our progress tracking hook
  const { 
    progress, 
    addCertification, 
    logStudyTime,
    completeTopics,
    recordActivity
  } = useUserProgress(userId);

  return (
    <div className={cn("space-y-8", className)}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <AnimatedTransition animation="fade" delay={100}>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, {userName}</h2>
          <p className="text-muted-foreground">Here's an overview of your certification progress.</p>
        </AnimatedTransition>
        
        <AnimatedTransition animation="slide" delay={200}>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <button 
              className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
              onClick={() => {
                logStudyTime(0.5);
                recordActivity("Started a 30-minute study session");
              }}
            >
              Resume Learning
            </button>
            <button 
              className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
              onClick={() => {
                recordActivity("Started a practice quiz");
              }}
            >
              Practice Quiz
            </button>
          </div>
        </AnimatedTransition>
      </div>

      <CertificationSearch 
        addCertification={addCertification}
        recordActivity={recordActivity}
      />

      <DashboardStats 
        progress={progress}
        logStudyTime={logStudyTime}
        completeTopics={completeTopics}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <LearningProgress />
        <RecentActivity activities={progress.recentActivities} />
      </div>
    </div>
  );
};

export default Dashboard;
