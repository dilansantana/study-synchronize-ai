
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface QuizCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certificationName?: string;
}

export const QuizCreationModal: React.FC<QuizCreationModalProps> = ({
  open,
  onOpenChange,
  certificationName
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [quizName, setQuizName] = useState('');
  const [timeLimit, setTimeLimit] = useState('15');
  const [questionCount, setQuestionCount] = useState('10');
  const [difficulty, setDifficulty] = useState<'easy' | 'mixed' | 'hard'>('mixed');

  const handleCreateQuiz = () => {
    if (!quizName.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter a name for your quiz.",
        variant: "destructive",
      });
      return;
    }

    // In a real application, we would create and save the quiz here
    // For now, we'll simulate it and navigate to the quiz page
    
    toast({
      title: "Quiz created",
      description: `Your custom quiz "${quizName}" has been created and is ready to start.`,
    });
    
    resetForm();
    onOpenChange(false);
    
    // Navigate to the quiz page with parameters
    navigate(`/quiz?name=${encodeURIComponent(quizName)}&time=${timeLimit}&count=${questionCount}&difficulty=${difficulty}&cert=${certificationName || ''}`);
  };

  const resetForm = () => {
    setQuizName('');
    setTimeLimit('15');
    setQuestionCount('10');
    setDifficulty('mixed');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Custom Quiz</DialogTitle>
          <DialogDescription>
            Configure your quiz {certificationName ? `for ${certificationName}` : 'for a quick study session'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="quizName">Quiz Name</Label>
            <Input
              id="quizName"
              placeholder={certificationName ? `${certificationName} Quiz` : "My Custom Quiz"}
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
              <Select value={timeLimit} onValueChange={setTimeLimit}>
                <SelectTrigger id="timeLimit">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="questionCount">Number of Questions</Label>
              <Select value={questionCount} onValueChange={setQuestionCount}>
                <SelectTrigger id="questionCount">
                  <SelectValue placeholder="Select count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 questions</SelectItem>
                  <SelectItem value="10">10 questions</SelectItem>
                  <SelectItem value="15">15 questions</SelectItem>
                  <SelectItem value="20">20 questions</SelectItem>
                  <SelectItem value="30">30 questions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select value={difficulty} onValueChange={(value: 'easy' | 'mixed' | 'hard') => setDifficulty(value)}>
              <SelectTrigger id="difficulty">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="mixed">Mixed</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex space-x-2 justify-end">
          <DialogClose asChild>
            <Button variant="outline" onClick={resetForm}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleCreateQuiz}>Create Quiz</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
