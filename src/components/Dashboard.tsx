
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { BarChart, Calendar, Clock, BookOpen, Award, Search, Loader2 } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { useToast } from "@/hooks/use-toast";
import { UserProgress, useUserProgress } from '@/utils/progressUtils';

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
  const { toast } = useToast();
  const [certificationQuery, setCertificationQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  // Use our progress tracking hook
  const { 
    progress, 
    addCertification, 
    logStudyTime,
    completeTopics,
    recordActivity
  } = useUserProgress(userId);

  // Convert stats from progress data
  const stats = [
    { 
      label: 'Study Hours', 
      value: `${progress.studyHours}`, 
      icon: <Clock className="w-5 h-5" />, 
      change: '+2.5 hrs this week',
      action: () => logStudyTime(0.5) // Log 30 minutes when clicked
    },
    { 
      label: 'Completed Topics', 
      value: `${progress.completedTopics}`, 
      icon: <BookOpen className="w-5 h-5" />, 
      change: '+3 since last week',
      action: () => completeTopics(1) // Complete one topic when clicked
    },
    { 
      label: 'Quiz Score', 
      value: `${progress.quizScore}%`, 
      icon: <Award className="w-5 h-5" />, 
      change: '+4% improvement' 
    },
    { 
      label: 'Streak', 
      value: `${progress.streak} days`, 
      icon: <Calendar className="w-5 h-5" />, 
      change: 'Keep it up!' 
    },
  ];

  // Handle gathering resources for a certification
  const handleGatherResources = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!certificationQuery.trim()) {
      toast({
        title: "Input required",
        description: "Please enter a certification to search for",
        variant: "destructive"
      });
      return;
    }
    
    setIsSearching(true);
    
    // Simulate an API call to gather resources
    setTimeout(() => {
      setIsSearching(false);
      
      // Add certification to user progress
      addCertification(certificationQuery);
      
      toast({
        title: "Resources gathered",
        description: `We've started gathering resources for ${certificationQuery}. Check the Learning page for updates.`,
      });
      
      // Reset the input after searching
      setCertificationQuery('');
      
      // Record this activity
      recordActivity(`Started gathering resources for ${certificationQuery}`);
    }, 2000);
  };

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
                toast({
                  title: "Study session started",
                  description: "30 minutes added to your study time.",
                });
              }}
            >
              Resume Learning
            </button>
            <button 
              className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
              onClick={() => {
                recordActivity("Started a practice quiz");
                toast({
                  title: "Practice quiz ready",
                  description: "Good luck with your practice quiz!",
                });
              }}
            >
              Practice Quiz
            </button>
          </div>
        </AnimatedTransition>
      </div>

      <AnimatedTransition animation="scale" delay={150} className="rounded-lg border bg-card shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Search for Certification Resources</h3>
        <form onSubmit={handleGatherResources} className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              className="h-10 w-full rounded-md border border-input pl-10 pr-4 py-2 bg-transparent text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Enter certification (e.g., CompTIA A+, CCNA, Security+)"
              value={certificationQuery}
              onChange={(e) => setCertificationQuery(e.target.value)}
              disabled={isSearching}
            />
          </div>
          <button 
            type="submit" 
            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:pointer-events-none"
            disabled={isSearching}
          >
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gathering
              </>
            ) : (
              "Gather Resources"
            )}
          </button>
        </form>
        <p className="text-xs text-muted-foreground mt-2">
          Our AI will gather relevant videos, articles, flashcards, and practice materials for your certification.
        </p>
      </AnimatedTransition>

      <AnimatedTransition animation="scale" delay={300} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div 
            key={stat.label} 
            className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md cursor-pointer"
            onClick={stat.action}
          >
            <div className="flex items-center space-x-2">
              <div className="rounded-full p-2 bg-primary/10 text-primary">
                {stat.icon}
              </div>
              <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
            </div>
            <div className="mt-2 space-y-1">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </div>
          </div>
        ))}
      </AnimatedTransition>

      <div className="grid gap-6 md:grid-cols-2">
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

        <AnimatedTransition animation="slide" delay={500} className="rounded-lg border bg-card shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {progress.recentActivities.map((activity) => (
                <div key={activity.id} className="flex justify-between items-start pb-3 border-b border-border last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium">{activity.activity}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedTransition>
      </div>
    </div>
  );
};

export default Dashboard;
