
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, ExternalLink, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AnimatedTransition from '../AnimatedTransition';

interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'update' | 'reminder' | 'certification' | 'resource';
  read: boolean;
  link?: string;
}

export const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'CompTIA Security+ Exam Update',
      description: 'The SY0-601 exam has been updated with new objectives. Check the latest changes.',
      date: '1 day ago',
      type: 'certification',
      read: false,
      link: 'https://www.comptia.org/certifications/security'
    },
    {
      id: '2',
      title: 'New Resource Added: Network Security',
      description: 'A new comprehensive guide on network security fundamentals has been added to your learning path.',
      date: '3 days ago',
      type: 'resource',
      read: false
    },
    {
      id: '3',
      title: 'CCNA Exam Study Reminder',
      description: 'Your scheduled study session for Cisco routing protocols is due today.',
      date: '5 hours ago',
      type: 'reminder',
      read: true
    },
    {
      id: '4',
      title: 'Cisco Certification Update',
      description: 'Cisco has announced changes to the CCNA certification path effective next quarter.',
      date: '1 week ago',
      type: 'update',
      read: true,
      link: 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html'
    },
    {
      id: '5',
      title: 'Weekly Progress Summary',
      description: 'You\'ve completed 4 modules this week. Keep up the good work!',
      date: '2 days ago',
      type: 'update',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const getNotificationTypeStyles = (type: string) => {
    switch(type) {
      case 'certification': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'resource': return 'bg-green-100 text-green-800 border-green-200';
      case 'reminder': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'update': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'certification': return <div className="p-2 rounded-full bg-purple-100"><Bell className="h-4 w-4 text-purple-600" /></div>;
      case 'resource': return <div className="p-2 rounded-full bg-green-100"><Bell className="h-4 w-4 text-green-600" /></div>;
      case 'reminder': return <div className="p-2 rounded-full bg-yellow-100"><Bell className="h-4 w-4 text-yellow-600" /></div>;
      case 'update': return <div className="p-2 rounded-full bg-blue-100"><Bell className="h-4 w-4 text-blue-600" /></div>;
      default: return <div className="p-2 rounded-full bg-gray-100"><Bell className="h-4 w-4 text-gray-600" /></div>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <CardTitle>Notifications</CardTitle>
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <CardDescription>
          Stay updated on certification changes and learning resources
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <AnimatedTransition
              key={notification.id}
              animation="fade"
              className={`p-4 border rounded-md ${notification.read ? 'bg-background' : 'bg-secondary/20'} relative overflow-hidden`}
            >
              <div className="flex gap-3">
                {getNotificationIcon(notification.type)}
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium">
                        {notification.title}
                        {!notification.read && (
                          <Badge variant="default" className="ml-2 px-1.5 py-0 text-[10px]">
                            New
                          </Badge>
                        )}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">{notification.date}</span>
                    <div className="flex items-center gap-2">
                      {notification.link && (
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" asChild>
                          <a href={notification.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View
                          </a>
                        </Button>
                      )}
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-xs"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Mark read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Colored edge based on notification type */}
              <div 
                className={`absolute left-0 top-0 bottom-0 w-1 ${getNotificationTypeStyles(notification.type)}`}
              />
            </AnimatedTransition>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
