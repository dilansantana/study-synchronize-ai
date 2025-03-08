
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, ExternalLink, Plus, GraduationCap, Target, Clock } from "lucide-react";
import { FlashcardCreationModal } from './FlashcardCreationModal';
import { QuizCreationModal } from './QuizCreationModal';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="h-9 gap-1.5"
          >
            <FileText className="h-4 w-4 text-orange-500" />
            Study Options
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setShowFlashcardModal(true)}>
              <FileText className="h-4 w-4 text-orange-500 mr-2" />
              <span>Create Flashcards</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowQuizModal(true)}>
              <Target className="h-4 w-4 text-purple-500 mr-2" />
              <span>Practice Quiz</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setShowQuizModal(true)}>
              <Clock className="h-4 w-4 text-blue-500 mr-2" />
              <span>Timed Test</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowQuizModal(true)}>
              <GraduationCap className="h-4 w-4 text-green-500 mr-2" />
              <span>Exam Simulation</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

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
