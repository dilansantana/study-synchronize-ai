
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ultimateGuides, ContentItem } from '@/data/learningResources';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Calendar } from 'lucide-react';
import AnimatedTransition from '../AnimatedTransition';
import { EmptyResults } from './EmptyResults';

const SavedGuides: React.FC = () => {
  const navigate = useNavigate();
  const guides = Object.values(ultimateGuides);

  const handleViewGuide = (guideId: string) => {
    navigate(`/guide/${guideId}`);
  };

  if (guides.length === 0) {
    return (
      <EmptyResults
        title="No guides found"
        description="You haven't created any ultimate guides yet. Go to Learning Resources to create your first guide."
        icon={<BookOpen className="h-12 w-12 text-muted-foreground" />}
      />
    );
  }

  return (
    <div className="space-y-6">
      <AnimatedTransition animation="fade" className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">My Ultimate Guides</h2>
        <p className="text-muted-foreground">
          Access all your previously created ultimate guides
        </p>
      </AnimatedTransition>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <AnimatedTransition
            key={guide.id}
            animation="slide"
            className="col-span-1"
          >
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold truncate">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {guide.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>{guide.date}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewGuide(guide.id)}
                    >
                      View Guide
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedTransition>
        ))}
      </div>
    </div>
  );
};

export default SavedGuides;
