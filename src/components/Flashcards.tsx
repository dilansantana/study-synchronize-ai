import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedTransition from './AnimatedTransition';
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface FlashcardsProps {
  className?: string;
}

const Flashcards: React.FC<FlashcardsProps> = ({ className }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());
  
  const flashcards: FlashcardData[] = [
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
      question: 'Explain the concept of a "man-in-the-middle" attack.',
      answer: 'A man-in-the-middle attack occurs when an attacker secretly intercepts and possibly alters communications between two parties who believe they are directly communicating with each other.',
      category: 'Network Security',
      difficulty: 'medium'
    },
    {
      id: '4',
      question: 'What is port 443 commonly used for?',
      answer: 'Port 443 is used for HTTPS (HTTP Secure) communications, providing encrypted web traffic.',
      category: 'Networking',
      difficulty: 'easy'
    },
    {
      id: '5',
      question: 'What is the purpose of a VLAN?',
      answer: 'A Virtual Local Area Network (VLAN) is used to logically segment a network without altering its physical topology, improving security and reducing broadcast domains.',
      category: 'Networking',
      difficulty: 'medium'
    }
  ];
  
  const currentCard = flashcards[currentCardIndex];
  
  const goToNextCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((currentCardIndex + 1) % flashcards.length);
    }, 300);
  };
  
  const goToPreviousCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((currentCardIndex - 1 + flashcards.length) % flashcards.length);
    }, 300);
  };
  
  const toggleFlip = () => {
    setFlipped(!flipped);
  };
  
  const markAsKnown = () => {
    setKnownCards(prev => {
      const newSet = new Set(prev);
      newSet.add(currentCard.id);
      return newSet;
    });
    goToNextCard();
  };
  
  const markAsUnknown = () => {
    setKnownCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentCard.id);
      return newSet;
    });
    goToNextCard();
  };
  
  const resetCard = () => {
    setFlipped(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  return (
    <div className={cn("space-y-8", className)}>
      <AnimatedTransition animation="fade" className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Flashcards</h2>
        <p className="text-muted-foreground">
          Review key concepts with AI-generated flashcards
        </p>
      </AnimatedTransition>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Card {currentCardIndex + 1} of {flashcards.length}
        </div>
        <div className="text-sm">
          <span className="font-medium">Known:</span> {knownCards.size} of {flashcards.length}
        </div>
      </div>
      
      <AnimatedTransition animation="scale" className="flex justify-center">
        <div className="w-full max-w-2xl aspect-[3/2] perspective-1000">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentCardIndex + (flipped ? '-flipped' : '')}
              className={cn(
                "relative w-full h-full rounded-xl shadow-lg cursor-pointer transform-style-3d transition-transform duration-500",
                flipped ? "rotate-y-180" : ""
              )}
              initial={{ opacity: 0, rotateY: flipped ? -180 : 0 }}
              animate={{ opacity: 1, rotateY: flipped ? 180 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={toggleFlip}
            >
              {/* Front of card (Question) */}
              <div 
                className={cn(
                  "absolute inset-0 backface-hidden rounded-xl border p-6 flex flex-col",
                  "bg-card text-card-foreground"
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                    getDifficultyColor(currentCard.difficulty)
                  )}>
                    {currentCard.difficulty.charAt(0).toUpperCase() + currentCard.difficulty.slice(1)}
                  </span>
                  
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {currentCard.category}
                  </span>
                </div>
                
                <div className="flex-1 flex items-center justify-center text-center">
                  <h3 className="text-xl font-medium">{currentCard.question}</h3>
                </div>
                
                <div className="mt-4 text-sm text-center text-muted-foreground">
                  Click to reveal answer
                </div>
              </div>
              
              {/* Back of card (Answer) */}
              <div 
                className={cn(
                  "absolute inset-0 backface-hidden rotate-y-180 rounded-xl border p-6 flex flex-col",
                  "bg-secondary text-foreground"
                )}
              >
                <div className="flex-1 flex items-center justify-center text-center">
                  <p>{currentCard.answer}</p>
                </div>
                
                <div className="mt-4 text-sm text-center text-muted-foreground">
                  Click to see question
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </AnimatedTransition>
      
      <div className="flex justify-center space-x-4">
        <button
          onClick={goToPreviousCard}
          className="p-2 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button
          onClick={resetCard}
          className="p-2 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
          aria-label="Reset"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        
        <button
          onClick={markAsUnknown}
          className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
          aria-label="Mark as not known"
        >
          <XCircle className="w-5 h-5" />
        </button>
        
        <button
          onClick={markAsKnown}
          className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
          aria-label="Mark as known"
        >
          <CheckCircle className="w-5 h-5" />
        </button>
        
        <button
          onClick={goToNextCard}
          className="p-2 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
          aria-label="Next card"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      <style>
        {`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        `}
      </style>
    </div>
  );
};

export default Flashcards;
