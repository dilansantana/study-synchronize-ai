
import React from 'react';
import AnimatedTransition from '../AnimatedTransition';
import { Activity } from '@/utils/progressUtils';

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <AnimatedTransition animation="slide" delay={500} className="rounded-lg border bg-card shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {activities.map((activity) => (
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
  );
};

export default RecentActivity;
