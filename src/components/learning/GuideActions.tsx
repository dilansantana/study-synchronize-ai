
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, ExternalLink, Plus } from "lucide-react";
import { FlashcardCreationModal } from './FlashcardCreationModal';
import { QuizCreationModal } from './QuizCreationModal';
import { useToast } from '@/hooks/use-toast';

interface GuideActionsProps {
  onCreateFlashcards: () => void;
  onCreateQuiz: () => void;
  onViewGuide: () => void;
  certificationName?: string;
}

export const GuideActions: React.FC<GuideActionsProps> = ({
  onCreateFlashcards,
  onCreateQuiz,
  onViewGuide,
  certificationName
}) => {
  const { toast } = useToast();
  const [showFlashcardModal, setShowFlashcardModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  const handleSaveFlashcard = (flashcard: any) => {
    // Save flashcard logic
    try {
      const savedFlashcards = localStorage.getItem('customFlashcards');
      const existingFlashcards = savedFlashcards ? JSON.parse(savedFlashcards) : [];
      
      localStorage.setItem('customFlashcards', JSON.stringify([...existingFlashcards, flashcard]));
      
      toast({
        title: "Flashcard created",
        description: "Your custom flashcard has been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving custom flashcard:', error);
      toast({
        title: "Error saving flashcard",
        description: "There was an error saving your flashcard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      <Button
        onClick={() => setShowFlashcardModal(true)}
        size="sm"
        variant="outline"
        className="h-9 gap-1.5"
      >
        <FileText className="h-4 w-4 text-orange-500" />
        Create Flashcards
      </Button>
      <Button
        onClick={() => setShowQuizModal(true)}
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

      {/* Flashcard Creation Modal */}
      <FlashcardCreationModal
        open={showFlashcardModal}
        onOpenChange={setShowFlashcardModal}
        onSave={handleSaveFlashcard}
        certificationName={certificationName}
      />

      {/* Quiz Creation Modal */}
      <QuizCreationModal
        open={showQuizModal}
        onOpenChange={setShowQuizModal}
        certificationName={certificationName}
      />
    </div>
  );
};
