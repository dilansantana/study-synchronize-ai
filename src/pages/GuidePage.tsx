
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ContentItem, ultimateGuides } from '@/data/learningResources';
import { FileText, BookOpen, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GuidePage: React.FC = () => {
  const { guideId } = useParams<{ guideId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [guide, setGuide] = useState<ContentItem | null>(null);

  useEffect(() => {
    if (guideId && ultimateGuides[guideId]) {
      setGuide(ultimateGuides[guideId]);
    } else {
      toast({
        title: "Guide not found",
        description: "The requested guide could not be found",
        variant: "destructive"
      });
    }
  }, [guideId, toast]);

  const handleCreateFlashcards = () => {
    if (!guide) return;
    
    toast({
      title: "Creating flashcards",
      description: "Redirecting to flashcards with pre-populated content"
    });
    
    navigate('/flashcards', { state: { guideContent: guide.content } });
  };

  const handleCreateQuiz = () => {
    if (!guide) return;
    
    toast({
      title: "Creating quiz",
      description: "Redirecting to quiz generator with pre-populated content"
    });
    
    navigate('/quiz', { state: { guideContent: guide.content } });
  };

  const handleBack = () => {
    navigate('/learning');
  };

  if (!guide) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <h2 className="text-2xl font-bold">Guide not found</h2>
          <p className="text-muted-foreground mb-4">The requested guide could not be found</p>
          <Button onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Learning
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="outline" onClick={handleBack} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Learning
          </Button>
          <h1 className="text-3xl font-bold">{guide.title}</h1>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg text-muted-foreground">{guide.description}</p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>{guide.author}</span>
            <span>•</span>
            <span>{guide.date}</span>
          </div>
        </div>
        
        <div className="border rounded-md p-4 bg-secondary/20">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Guide Content</span>
            <span className="text-xs text-muted-foreground">
              Content includes extracted YouTube captions where available
            </span>
          </div>
          <Textarea 
            className="font-mono h-[500px] overflow-y-auto" 
            value={guide.content}
            readOnly
          />
        </div>
        
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Button
            onClick={handleCreateFlashcards}
            variant="outline"
            className="flex-1 flex items-center justify-center"
          >
            <FileText className="mr-2 h-4 w-4" />
            Create Flashcards
          </Button>
          <Button
            onClick={handleCreateQuiz}
            variant="outline"
            className="flex-1 flex items-center justify-center"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Create Quiz
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default GuidePage;
