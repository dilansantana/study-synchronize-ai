
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import AnimatedTransition from './AnimatedTransition';
import { CheckCircle, XCircle, HelpCircle, ArrowRight, Timer, BarChart, Award } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizComponentProps {
  className?: string;
  timeLimit?: number; // in seconds
}

const QuizComponent: React.FC<QuizComponentProps> = ({ 
  className,
  timeLimit = 60
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(timeLimit);
  
  // Mock quiz questions
  const questions: QuizQuestion[] = [
    {
      id: '1',
      question: 'Which protocol is used to secure web traffic with encryption?',
      options: ['HTTP', 'FTP', 'HTTPS', 'SMTP'],
      correctAnswer: 2,
      explanation: 'HTTPS (Hypertext Transfer Protocol Secure) is the secure version of HTTP that uses TLS/SSL encryption to protect data in transit.',
      difficulty: 'easy'
    },
    {
      id: '2',
      question: 'What type of attack tries many password combinations to gain unauthorized access?',
      options: ['Phishing', 'Man-in-the-middle', 'Brute force', 'SQL injection'],
      correctAnswer: 2,
      explanation: 'A brute force attack attempts to gain access by systematically trying all possible password combinations until the correct one is found.',
      difficulty: 'medium'
    },
    {
      id: '3',
      question: 'Which of the following is NOT a part of the CIA triad in information security?',
      options: ['Confidentiality', 'Integrity', 'Authentication', 'Availability'],
      correctAnswer: 2,
      explanation: 'The CIA triad consists of Confidentiality, Integrity, and Availability. Authentication, while important, is not part of this fundamental security model.',
      difficulty: 'medium'
    },
    {
      id: '4',
      question: 'What is the default port for HTTPS?',
      options: ['80', '443', '22', '25'],
      correctAnswer: 1,
      explanation: 'Port 443 is the standard port for HTTPS traffic, while port 80 is used for HTTP.',
      difficulty: 'easy'
    },
    {
      id: '5',
      question: 'Which network device operates at Layer 3 of the OSI model?',
      options: ['Hub', 'Switch', 'Router', 'Bridge'],
      correctAnswer: 2,
      explanation: 'Routers operate at Layer 3 (Network layer) of the OSI model, making routing decisions based on IP addresses.',
      difficulty: 'medium'
    },
    {
      id: '6',
      question: 'What does DNS stand for?',
      options: ['Dynamic Network Service', 'Domain Name System', 'Digital Network Security', 'Data Network Standard'],
      correctAnswer: 1,
      explanation: 'DNS (Domain Name System) translates domain names to IP addresses so browsers can load internet resources.',
      difficulty: 'easy'
    },
    {
      id: '7',
      question: 'Which of the following is a stateless protocol?',
      options: ['FTP', 'Telnet', 'HTTP', 'SSH'],
      correctAnswer: 2,
      explanation: 'HTTP is stateless, meaning each request is independent and the server maintains no information about past client requests.',
      difficulty: 'medium'
    },
    {
      id: '8',
      question: 'What is the purpose of a CAPTCHA?',
      options: ['Encrypt data', 'Distinguish humans from bots', 'Block malware', 'Manage passwords'],
      correctAnswer: 1,
      explanation: 'CAPTCHA (Completely Automated Public Turing test to tell Computers and Humans Apart) is designed to determine whether the user is human or a bot.',
      difficulty: 'easy'
    },
    {
      id: '9',
      question: 'Which encryption algorithm is considered obsolete and insecure?',
      options: ['AES', 'RSA', 'DES', 'SHA-256'],
      correctAnswer: 2,
      explanation: 'DES (Data Encryption Standard) is now considered insecure due to its small key size (56 bits) and has been replaced by more secure algorithms like AES.',
      difficulty: 'hard'
    },
    {
      id: '10',
      question: 'What is a honeypot in cybersecurity?',
      options: ['A type of malware', 'A decoy system to attract attackers', 'An encryption method', 'A password manager'],
      correctAnswer: 1,
      explanation: 'A honeypot is a security mechanism that creates a deliberate vulnerability to attract and detect attackers, studying their behavior and potentially identifying new threats.',
      difficulty: 'medium'
    },
    {
      id: '11', 
      question: 'What is the main purpose of a VPN?',
      options: ['Block all ads', 'Increase internet speed', 'Create a secure, encrypted connection', 'Store passwords securely'],
      correctAnswer: 2,
      explanation: 'A Virtual Private Network (VPN) establishes an encrypted connection over a less secure network, providing privacy and anonymity by hiding the user\'s internet protocol (IP) address.',
      difficulty: 'easy'
    },
    {
      id: '12',
      question: 'What is a zero-day exploit?',
      options: ['An attack that occurs at midnight', 'An attack that targets vulnerabilities with no patches', 'A virus that deletes all data', 'A DDoS attack that lasts for 24 hours'],
      correctAnswer: 1,
      explanation: 'A zero-day exploit targets a previously unknown vulnerability in software or hardware, for which no patch exists yet, giving developers "zero days" to address it before it\'s exploited.',
      difficulty: 'hard'
    }
  ];
  
  const currentQuestion = questions[currentQuestionIndex];
  
  // Timer effect
  useEffect(() => {
    if (quizCompleted || showExplanation) return;
    
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (selectedOption === null) {
            handleOptionSelect(-1); // Time's up, count as wrong
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [quizCompleted, showExplanation, selectedOption]);
  
  // Reset timer when moving to next question
  useEffect(() => {
    setRemainingTime(timeLimit);
  }, [currentQuestionIndex, timeLimit]);
  
  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null || showExplanation) return;
    
    setSelectedOption(optionIndex);
    
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    setShowExplanation(true);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
    setRemainingTime(timeLimit);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getOptionClass = (index: number) => {
    if (!showExplanation) {
      return selectedOption === index ? 'border-primary bg-primary/5' : 'hover:bg-secondary/80';
    }
    
    if (index === currentQuestion.correctAnswer) {
      return 'border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    }
    
    if (selectedOption === index && index !== currentQuestion.correctAnswer) {
      return 'border-red-500 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    }
    
    return 'opacity-50';
  };

  return (
    <div className={cn("space-y-6", className)}>
      {!quizCompleted ? (
        <>
          <div className="flex justify-between items-center">
            <AnimatedTransition animation="fade" className="space-y-1">
              <h2 className="text-xl font-semibold">Practice Quiz</h2>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </AnimatedTransition>
            
            <AnimatedTransition animation="scale" className="flex items-center space-x-2 text-sm font-medium">
              <Timer className="w-4 h-4 text-amber-500" />
              <span className={cn(
                remainingTime < 10 && "text-red-500 animate-pulse"
              )}>
                {formatTime(remainingTime)}
              </span>
            </AnimatedTransition>
          </div>
          
          <div className="w-full bg-secondary rounded-full h-1.5">
            <div 
              className="bg-primary h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
            />
          </div>
          
          <AnimatedTransition animation="scale" className="p-6 rounded-xl border bg-card">
            <div className="flex items-start justify-between mb-4">
              <span className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                currentQuestion.difficulty === 'easy' ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400" :
                currentQuestion.difficulty === 'medium' ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-400" :
                "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400"
              )}>
                {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
              </span>
            </div>
            
            <h3 className="text-lg font-medium mb-6">{currentQuestion.question}</h3>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={showExplanation}
                  className={cn(
                    "relative w-full p-4 text-left rounded-lg border transition-all",
                    "bg-card hover:bg-secondary/50",
                    getOptionClass(index)
                  )}
                >
                  <div className="pr-8">{option}</div>
                  {showExplanation && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                  {showExplanation && selectedOption === index && index !== currentQuestion.correctAnswer && (
                    <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                  )}
                </button>
              ))}
            </div>
            
            {showExplanation && (
              <AnimatedTransition animation="slide" className="mt-6 p-4 rounded-lg bg-secondary/70">
                <div className="flex items-start space-x-3">
                  <HelpCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Explanation</h4>
                    <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </AnimatedTransition>
            )}
          </AnimatedTransition>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Score: {score}/{currentQuestionIndex + (selectedOption !== null ? 1 : 0)}
            </div>
            
            {showExplanation && (
              <button
                onClick={handleNextQuestion}
                className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            )}
          </div>
        </>
      ) : (
        <AnimatedTransition animation="scale" className="p-8 rounded-xl border bg-card text-center">
          <div className="inline-flex items-center justify-center rounded-full p-4 bg-primary/10 text-primary mb-4">
            <Award className="w-10 h-10" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
          <p className="text-lg mb-6">
            Your score: <span className="font-bold">{score}/{questions.length}</span>
            <span className="text-muted-foreground ml-2">({Math.round((score / questions.length) * 100)}%)</span>
          </p>
          
          <div className="w-full max-w-md mx-auto mb-8">
            <div className="h-4 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full animate-progress transition-all duration-1000"
                style={{ width: `${(score / questions.length) * 100}%` }}
              />
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Correct</p>
                <p className="text-xl font-bold text-green-500">{score}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Incorrect</p>
                <p className="text-xl font-bold text-red-500">{questions.length - score}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Accuracy</p>
                <p className="text-xl font-bold">{Math.round((score / questions.length) * 100)}%</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={resetQuiz}
              className="inline-flex items-center justify-center rounded-md px-6 py-2 text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Take Another Quiz
            </button>
          </div>
        </AnimatedTransition>
      )}
    </div>
  );
};

export default QuizComponent;
