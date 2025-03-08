
import React from 'react';
import { Clock, BookOpen, Award, Calendar } from 'lucide-react';
import AnimatedTransition from '../AnimatedTransition';
import { useToast } from "@/hooks/use-toast";
import { UserProgress } from '@/utils/progressUtils';

interface StatItemProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  onClick?: () => void;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, icon, change, onClick }) => (
  <div 
    className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center space-x-2">
      <div className="rounded-full p-2 bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
    </div>
    <div className="mt-2 space-y-1">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{change}</p>
    </div>
  </div>
);

interface DashboardStatsProps {
  progress: UserProgress;
  logStudyTime: (hours: number) => void;
  completeTopics: (count: number) => void;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ 
  progress, 
  logStudyTime,
  completeTopics
}) => {
  const { toast } = useToast();

  const stats = [
    { 
      label: 'Study Hours', 
      value: `${progress.studyHours}`, 
      icon: <Clock className="w-5 h-5" />, 
      change: '+2.5 hrs this week',
      onClick: () => {
        logStudyTime(0.5); // Log 30 minutes when clicked
        toast({
          title: "Study session logged",
          description: "30 minutes added to your study time.",
        });
      }
    },
    { 
      label: 'Completed Topics', 
      value: `${progress.completedTopics}`, 
      icon: <BookOpen className="w-5 h-5" />, 
      change: '+3 since last week',
      onClick: () => {
        completeTopics(1); // Complete one topic when clicked
        toast({
          title: "Topic completed",
          description: "You've completed another topic. Keep going!",
        });
      }
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

  return (
    <AnimatedTransition animation="scale" delay={300} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <StatItem 
          key={stat.label} 
          label={stat.label} 
          value={stat.value} 
          icon={stat.icon} 
          change={stat.change} 
          onClick={stat.onClick}
        />
      ))}
    </AnimatedTransition>
  );
};

export default DashboardStats;
