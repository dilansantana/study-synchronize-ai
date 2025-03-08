import React from 'react';
import { Youtube, FileText, MessageSquare, Globe, BookOpenCheck, Layers } from 'lucide-react';

export const Clock = ({ className }: { className?: string }) => {
  return <div className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  </div>;
};

export const Star = ({ className }: { className?: string }) => {
  return <div className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  </div>;
};

export const ArrowRight = ({ className }: { className?: string }) => {
  return <div className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  </div>;
};

export const ExtractIcon = ({ className }: { className?: string }) => {
  return <div className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  </div>;
};

export const getSourceIcon = (source: string) => {
  switch (source) {
    case 'youtube':
      return <Youtube className="w-4 h-4 text-red-500" />;
    case 'article':
      return <FileText className="w-4 h-4 text-blue-500" />;
    case 'forum':
      return <MessageSquare className="w-4 h-4 text-green-500" />;
    case 'document':
      return <FileText className="w-4 h-4 text-amber-500" />;
    case 'quizlet':
      return <BookOpenCheck className="w-4 h-4 text-purple-500" />;
    case 'guide':
      return <Layers className="w-4 h-4 text-emerald-500" />;
    default:
      return <Globe className="w-4 h-4 text-gray-500" />;
  }
};
