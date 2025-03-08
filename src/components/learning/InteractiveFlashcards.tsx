
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, RotateCcw, Plus, Sparkles } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from '@/hooks/use-toast';
import { FlashcardCreationModal, CustomFlashcard } from './FlashcardCreationModal';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  nextReviewDate?: Date;
}

interface FlashcardDeckProps {
  title: string;
  description?: string;
  certificationName?: string;
}

export const InteractiveFlashcards: React.FC<FlashcardDeckProps> = ({ 
  title,
  description,
  certificationName
}) => {
  const { toast } = useToast();
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewStatus, setReviewStatus] = useState<Record<string, 'correct' | 'incorrect' | null>>({});
  const [showFlashcardModal, setShowFlashcardModal] = useState(false);
  
  // This would normally come from an API or be generated based on certification
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    {
      id: '1',
      question: 'What does CIA stand for in cybersecurity?',
      answer: 'Confidentiality, Integrity, and Availability - the three main components of information security.',
      category: 'Security Fundamentals',
      difficulty: 'easy'
    },
    {
      id: '2',
      question: 'What is the difference between symmetric and asymmetric encryption?',
      answer: 'Symmetric encryption uses the same key for encryption and decryption, while asymmetric encryption uses a public key for encryption and a private key for decryption.',
      category: 'Cryptography',
      difficulty: 'medium'
    },
    {
      id: '3',
      question: 'What is a buffer overflow attack?',
      answer: 'A buffer overflow attack occurs when a program or process attempts to write more data to a fixed length block of memory (a buffer) than the buffer is allocated to hold.',
      category: 'Application Security',
      difficulty: 'hard'
    },
    {
      id: '4',
      question: 'What is the purpose of a firewall?',
      answer: 'A firewall is a network security device that monitors and filters incoming and outgoing network traffic based on an organization\'s previously established security policies.',
      category: 'Network Security',
      difficulty: 'easy'
    },
    {
      id: '5',
      question: 'What is the difference between authentication and authorization?',
      answer: 'Authentication verifies who a user is, while authorization determines what resources a user has access to.',
      category: 'Access Control',
      difficulty: 'easy'
    }
  ]);

  // Load custom flashcards from localStorage
  useEffect(() => {
    const loadCustomFlashcards = () => {
      try {
        const savedFlashcards = localStorage.getItem('customFlashcards');
        if (savedFlashcards) {
          const parsedFlashcards = JSON.parse(savedFlashcards) as CustomFlashcard[];
          
          // Filter by certification if specified
          const filteredFlashcards = certificationName 
            ? parsedFlashcards.filter(card => 
                !card.certificationId || 
                card.certificationId === certificationName.toLowerCase().replace(/\s+/g, '-')
              )
            : parsedFlashcards;
            
          setFlashcards(prev => [...prev, ...filteredFlashcards]);
        }
      } catch (error) {
        console.error('Error loading custom flashcards:', error);
      }
    };
    
    loadCustomFlashcards();
  }, [certificationName]);

  const currentCard = flashcards[currentIndex];
  
  const handleFlip = () => {
    setFlipped(!flipped);
  };
  
  const nextCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % flashcards.length);
    }, 300);
  };
  
  const prevCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length);
    }, 300);
  };
  
  const resetCard = () => {
    setFlipped(false);
  };

  const markCardReview = (status: 'correct' | 'incorrect') => {
    setReviewStatus({
      ...reviewStatus,
      [currentCard.id]: status
    });
    
    toast({
      title: status === 'correct' ? "Marked as known" : "Marked for review",
      description: status === 'correct' 
        ? "Great job! Moving to the next card." 
        : "This card will appear more frequently in your reviews.",
      duration: 3000,
    });
    
    nextCard();
  };

  const handleSaveCustomFlashcard = (flashcard: CustomFlashcard) => {
    // Add to current session
    setFlashcards(prev => [...prev, flashcard]);
    
    // Save to localStorage
    try {
      const savedFlashcards = localStorage.getItem('customFlashcards');
      const existingFlashcards = savedFlashcards ? JSON.parse(savedFlashcards) as CustomFlashcard[] : [];
      
      localStorage.setItem('customFlashcards', JSON.stringify([...existingFlashcards, flashcard]));
    } catch (error) {
      console.error('Error saving custom flashcard:', error);
      toast({
        title: "Error saving flashcard",
        description: "There was an error saving your flashcard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const totalCards = flashcards.length;
  const reviewedCards = Object.keys(reviewStatus).length;
  const correctCards = Object.values(reviewStatus).filter(s => s === 'correct').length;
  const progressPercentage = totalCards > 0 ? (reviewedCards / totalCards) * 100 : 0;

  const getDifficultyClass = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title || 'Interactive Flashcards'}</CardTitle>
            <CardDescription>
              {description || `Test your knowledge of ${certificationName || 'certification'} concepts`}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">{correctCards} / {totalCards} Mastered</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Progress: {reviewedCards}/{totalCards} cards reviewed</span>
          <span>Card {currentIndex + 1} of {totalCards}</span>
        </div>
        
        <Progress value={progressPercentage} className="h-2" />
        
        {/* Flashcard */}
        <div className="perspective-1000 relative w-full aspect-[4/3] cursor-pointer" onClick={handleFlip}>
          <div
            className={cn(
              "absolute inset-0 rounded-xl shadow-md backface-hidden transition-all duration-500 transform-style-3d",
              flipped ? "rotate-y-180 opacity-0" : "rotate-y-0 opacity-100"
            )}
          >
            {/* Front of card (Question) */}
            <div className="absolute inset-0 p-6 border rounded-xl bg-card flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <Badge className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-medium",
                  getDifficultyClass(currentCard.difficulty)
                )}>
                  {currentCard.difficulty.charAt(0).toUpperCase() + currentCard.difficulty.slice(1)}
                </Badge>
                
                <Badge variant="outline" className="px-2.5 py-0.5 text-xs font-medium">
                  {currentCard.category}
                </Badge>
              </div>
              
              <div className="flex-1 flex items-center justify-center text-center">
                <h3 className="text-xl font-medium">{currentCard.question}</h3>
              </div>
              
              <div className="mt-4 text-sm text-center text-muted-foreground">
                Click to reveal answer
              </div>
            </div>
          </div>
          
          <div
            className={cn(
              "absolute inset-0 rounded-xl shadow-md backface-hidden transition-all duration-500 transform-style-3d",
              flipped ? "rotate-y-0 opacity-100" : "rotate-y-180 opacity-0"
            )}
          >
            {/* Back of card (Answer) */}
            <div className="absolute inset-0 p-6 border rounded-xl bg-secondary flex flex-col">
              <div className="flex-1 flex items-center justify-center text-center">
                <p className="text-base whitespace-pre-wrap">{currentCard.answer}</p>
              </div>
              
              <div className="mt-4 text-sm text-center text-muted-foreground">
                Click to see question
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevCard}
            className="rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={resetCard}
            className="rounded-full"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          
          <Button
            variant="destructive"
            size="sm"
            onClick={() => markCardReview('incorrect')}
            className="px-3"
          >
            Needs Review
          </Button>
          
          <Button
            variant="default"
            size="sm"
            onClick={() => markCardReview('correct')}
            className="px-3 bg-green-600 hover:bg-green-700"
          >
            Got It
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextCard}
            className="rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={() => setShowFlashcardModal(true)}
        >
          <Plus className="h-4 w-4" />
          Add Custom Card
        </Button>
        
        <Button variant="default">
          Generate More Flashcards
        </Button>
      </CardFooter>

      {/* Flashcard Creation Modal */}
      <FlashcardCreationModal
        open={showFlashcardModal}
        onOpenChange={setShowFlashcardModal}
        onSave={handleSaveCustomFlashcard}
        certificationName={certificationName}
      />
    </Card>
  );
};
