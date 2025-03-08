
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, ExternalLink } from "lucide-react";

interface GuideActionsProps {
  onCreateFlashcards: () => void;
  onCreateQuiz: () => void;
  onViewGuide: () => void;
}

export const GuideActions: React.FC<GuideActionsProps> = ({
  onCreateFlashcards,
  onCreateQuiz,
  onViewGuide
}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      <Button
        onClick={onCreateFlashcards}
        size="sm"
        variant="outline"
        className="h-9 gap-1.5"
      >
        <FileText className="h-4 w-4 text-orange-500" />
        Create Flashcards
      </Button>
      <Button
        onClick={onCreateQuiz}
        size="sm"
        variant="outline"
        className="h-9 gap-1.5"
      >
        <BookOpen className="h-4 w-4 text-purple-500" />
        Create Quiz
      </Button>
      <Button
        onClick={onViewGuide}
        size="sm"
        variant="default"
        className="h-9 gap-1.5"
      >
        <ExternalLink className="h-4 w-4" />
        View Full Guide
      </Button>
    </div>
  );
};
