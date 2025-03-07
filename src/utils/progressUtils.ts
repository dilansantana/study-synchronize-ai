
import { useState, useEffect } from 'react';

// Define types for user progress
export interface UserProgress {
  studyHours: number;
  completedTopics: number;
  quizScore: number;
  streak: number;
  lastActive: string;
  certifications: string[];
  recentActivities: RecentActivity[];
}

export interface RecentActivity {
  id: number;
  activity: string;
  time: string;
}

// Initial dummy progress data
const initialProgress: UserProgress = {
  studyHours: 0,
  completedTopics: 0,
  quizScore: 0,
  streak: 0,
  lastActive: new Date().toISOString(),
  certifications: [],
  recentActivities: []
};

// Mock recent activities
const defaultRecentActivities: RecentActivity[] = [
  { id: 1, activity: 'Completed Network Security module', time: '2 hours ago' },
  { id: 2, activity: 'Scored 92% on Encryption quiz', time: '1 day ago' },
  { id: 3, activity: 'Added 24 new flashcards', time: '2 days ago' },
  { id: 4, activity: 'Started CCNA certification path', time: '4 days ago' },
];

/**
 * Hook to manage and persist user progress
 */
export const useUserProgress = (userId: string = 'default-user') => {
  const storageKey = `user-progress-${userId}`;
  
  const [progress, setProgress] = useState<UserProgress>(() => {
    // Try to load from localStorage on initial render
    const savedProgress = localStorage.getItem(storageKey);
    if (savedProgress) {
      try {
        return JSON.parse(savedProgress);
      } catch (e) {
        console.error('Failed to parse saved progress', e);
      }
    }
    
    // Default initial progress with some random values to simulate a real user
    return {
      ...initialProgress,
      studyHours: 14.5,
      completedTopics: 18,
      quizScore: 86,
      streak: 7,
      recentActivities: defaultRecentActivities
    };
  });
  
  // Save to localStorage whenever progress changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress, storageKey]);
  
  // Log study time
  const logStudyTime = (hours: number) => {
    setProgress(prev => ({
      ...prev,
      studyHours: prev.studyHours + hours,
      lastActive: new Date().toISOString()
    }));
  };
  
  // Mark topic as completed
  const completeTopics = (count: number = 1) => {
    const newActivity = {
      id: Date.now(),
      activity: `Completed ${count} new topic${count > 1 ? 's' : ''}`,
      time: 'just now'
    };
    
    setProgress(prev => ({
      ...prev,
      completedTopics: prev.completedTopics + count,
      lastActive: new Date().toISOString(),
      recentActivities: [newActivity, ...prev.recentActivities].slice(0, 10) // Keep only the 10 most recent
    }));
  };
  
  // Update quiz score
  const updateQuizScore = (score: number) => {
    const newActivity = {
      id: Date.now(),
      activity: `Scored ${score}% on quiz`,
      time: 'just now'
    };
    
    setProgress(prev => ({
      ...prev,
      quizScore: score,
      lastActive: new Date().toISOString(),
      recentActivities: [newActivity, ...prev.recentActivities].slice(0, 10)
    }));
  };
  
  // Add certification
  const addCertification = (certification: string) => {
    const newActivity = {
      id: Date.now(),
      activity: `Started ${certification} certification path`,
      time: 'just now'
    };
    
    setProgress(prev => {
      // Only add if it doesn't already exist
      if (prev.certifications.includes(certification)) {
        return prev;
      }
      
      return {
        ...prev,
        certifications: [...prev.certifications, certification],
        lastActive: new Date().toISOString(),
        recentActivities: [newActivity, ...prev.recentActivities].slice(0, 10)
      };
    });
  };
  
  // Record any custom activity
  const recordActivity = (activity: string) => {
    const newActivity = {
      id: Date.now(),
      activity,
      time: 'just now'
    };
    
    setProgress(prev => ({
      ...prev,
      lastActive: new Date().toISOString(),
      recentActivities: [newActivity, ...prev.recentActivities].slice(0, 10)
    }));
  };
  
  // Calculate streak
  useEffect(() => {
    // Check if the user has been active today
    const checkStreak = () => {
      const lastActiveDate = new Date(progress.lastActive).setHours(0, 0, 0, 0);
      const today = new Date().setHours(0, 0, 0, 0);
      const yesterday = new Date(today - 86400000).setHours(0, 0, 0, 0);
      
      // If last active was today, do nothing
      if (lastActiveDate === today) return;
      
      // If last active was yesterday, increment streak
      if (lastActiveDate === yesterday) {
        setProgress(prev => ({
          ...prev,
          streak: prev.streak + 1,
          lastActive: new Date().toISOString()
        }));
      } 
      // If more than 1 day gap, reset streak to 1
      else if (lastActiveDate < yesterday) {
        setProgress(prev => ({
          ...prev,
          streak: 1,
          lastActive: new Date().toISOString()
        }));
      }
    };
    
    // Run once on mount
    checkStreak();
    
    // Set up daily check
    const intervalId = setInterval(checkStreak, 3600000); // Check every hour
    
    return () => clearInterval(intervalId);
  }, [progress.lastActive]);
  
  return {
    progress,
    logStudyTime,
    completeTopics,
    updateQuizScore,
    addCertification,
    recordActivity
  };
};
