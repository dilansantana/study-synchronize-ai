
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ContentItem } from "@/data/learningResources";
import { FileText, BookOpen } from "lucide-react";

interface GuidePreviewProps {
  generatedGuide: ContentItem | null;
  onCreateFlashcards: () => void;
  onCreateQuiz: () => void;
}

export const GuidePreview: React.FC<GuidePreviewProps> = ({
  generatedGuide,
  onCreateFlashcards,
  onCreateQuiz
}) => {
  if (!generatedGuide) return null;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">{generatedGuide.title}</h3>
          <p className="text-sm text-muted-foreground">{generatedGuide.description}</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>{generatedGuide.author}</span>
          <span>•</span>
          <span>{generatedGuide.date}</span>
        </div>
      </div>
      
      <div className="border rounded-md p-4 bg-secondary/20">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">Generated Content</span>
          <span className="text-xs text-muted-foreground">
            Content includes extracted YouTube captions where available
          </span>
        </div>
        <Textarea 
          className="font-mono h-[300px] overflow-y-auto" 
          value={generatedGuide.content}
          readOnly
        />
      </div>
      
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <Button
          onClick={onCreateFlashcards}
          variant="outline"
          className="flex-1 flex items-center justify-center"
        >
          <FileText className="mr-2 h-4 w-4" />
          Create Flashcards
        </Button>
        <Button
          onClick={onCreateQuiz}
          variant="outline"
          className="flex-1 flex items-center justify-center"
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Create Quiz
        </Button>
      </div>
    </div>
  );
};
