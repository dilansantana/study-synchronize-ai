
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, Map, Star } from 'lucide-react';

export const getResourceIcon = (type: string) => {
  switch(type) {
    case 'video': return <div className="p-2 rounded-full bg-primary/10"><BookOpen className="h-4 w-4 text-primary" /></div>;
    case 'article': return <div className="p-2 rounded-full bg-blue-100"><BookOpen className="h-4 w-4 text-blue-600" /></div>;
    case 'quiz': return <div className="p-2 rounded-full bg-orange-100"><GraduationCap className="h-4 w-4 text-orange-600" /></div>;
    case 'flashcard': return <div className="p-2 rounded-full bg-green-100"><Map className="h-4 w-4 text-green-600" /></div>;
    case 'practice': return <div className="p-2 rounded-full bg-purple-100"><Star className="h-4 w-4 text-purple-600" /></div>;
    default: return <div className="p-2 rounded-full bg-gray-100"><BookOpen className="h-4 w-4 text-gray-600" /></div>;
  }
};

export const getDifficultyBadge = (difficulty: string) => {
  switch(difficulty) {
    case 'beginner': return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Beginner</Badge>;
    case 'intermediate': return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Intermediate</Badge>;
    case 'advanced': return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Advanced</Badge>;
    default: return <Badge variant="outline">Unknown</Badge>;
  }
};
