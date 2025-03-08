
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export interface CustomFlashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  certificationId?: string;
}

interface FlashcardCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (flashcard: CustomFlashcard) => void;
  certificationName?: string;
}

export const FlashcardCreationModal: React.FC<FlashcardCreationModalProps> = ({
  open,
  onOpenChange,
  onSave,
  certificationName
}) => {
  const { toast } = useToast();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const handleSave = () => {
    if (!question.trim() || !answer.trim() || !category.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields.",
        variant: "destructive",
      });
      return;
    }

    const newFlashcard: CustomFlashcard = {
      id: `custom-${Date.now()}`,
      question: question.trim(),
      answer: answer.trim(),
      category: category.trim(),
      difficulty,
      certificationId: certificationName ? certificationName.toLowerCase().replace(/\s+/g, '-') : undefined
    };

    onSave(newFlashcard);
    resetForm();
    onOpenChange(false);

    toast({
      title: "Flashcard created",
      description: "Your custom flashcard has been added to your deck.",
    });
  };

  const resetForm = () => {
    setQuestion('');
    setAnswer('');
    setCategory('');
    setDifficulty('medium');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Custom Flashcard</DialogTitle>
          <DialogDescription>
            Create your own flashcard to study {certificationName ? `for ${certificationName}` : ''}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="question">Question</Label>
            <Textarea
              id="question"
              placeholder="Enter your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="answer">Answer</Label>
            <Textarea
              id="answer"
              placeholder="Enter the answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="min-h-24"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="e.g., Networking, Security"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={difficulty} onValueChange={(value: 'easy' | 'medium' | 'hard') => setDifficulty(value)}>
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="flex space-x-2 justify-end">
          <DialogClose asChild>
            <Button variant="outline" onClick={resetForm}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave}>Save Flashcard</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
