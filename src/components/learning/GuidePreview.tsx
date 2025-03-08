
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ContentItem } from "@/data/learningResources";
import { FileText, BookOpen, ExternalLink, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface GuidePreviewProps {
  generatedGuide: ContentItem | null;
  onCreateFlashcards: () => void;
  onCreateQuiz: () => void;
  onViewGuide: () => void;
}

export const GuidePreview: React.FC<GuidePreviewProps> = ({
  generatedGuide,
  onCreateFlashcards,
  onCreateQuiz,
  onViewGuide
}) => {
  const { toast } = useToast();
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedContent, setOptimizedContent] = useState<string>('');
  
  if (!generatedGuide) return null;
  
  const handleOptimizeContent = async () => {
    setIsOptimizing(true);
    
    try {
      // Simulate AI processing with a timeout (would connect to GPT or DeepSeek in production)
      toast({
        title: "AI analysis in progress",
        description: "Extracting the most relevant information from your guide..."
      });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create summarized version with better formatting
      const contentSections = generatedGuide.content.split('---');
      let optimized = '# Key Takeaways from ' + generatedGuide.title + '\n\n';
      
      contentSections.forEach((section, index) => {
        if (index === 0 || !section.trim()) return; // Skip intro or empty sections
        
        // Extract section title if it exists
        const titleMatch = section.match(/## Section \d+: (.*?)(?:<a|$)/);
        if (titleMatch && titleMatch[1]) {
          optimized += `## ${titleMatch[1].trim()}\n\n`;
          
          // Extract bullet points and key information
          const bulletPoints = section.match(/- .*?\n/g);
          if (bulletPoints && bulletPoints.length) {
            optimized += bulletPoints.join('');
          } else {
            // If no bullet points, extract a few sentences
            const sentences = section.split(/\.\s+/).slice(0, 3);
            optimized += sentences.map(s => s.trim() + '.\n').join('');
          }
          optimized += '\n';
        }
      });
      
      // Add conclusion
      optimized += '\n## Summary\n';
      optimized += 'These are the most important concepts extracted from your learning resources. ';
      optimized += 'Use this focused summary for more efficient studying and quicker comprehension.\n';
      
      setOptimizedContent(optimized);
      
      toast({
        title: "Optimization complete",
        description: "The most relevant information has been extracted from your guide"
      });
    } catch (error) {
      toast({
        title: "Optimization failed",
        description: "Failed to extract relevant information",
        variant: "destructive"
      });
      console.error("Error optimizing content:", error);
    } finally {
      setIsOptimizing(false);
    }
  };
  
  const displayContent = optimizedContent || generatedGuide.content;
  
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
      
      <div className="border rounded-md p-4 bg-card">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">
            {optimizedContent ? "Optimized Content" : "Generated Content"}
          </span>
          <div className="flex items-center gap-2">
            {!optimizedContent && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleOptimizeContent}
                disabled={isOptimizing}
                className="text-xs"
              >
                <Lightbulb className="mr-1 h-3 w-3" />
                {isOptimizing ? "Analyzing..." : "Extract Key Points"}
              </Button>
            )}
            <span className="text-xs text-muted-foreground hidden sm:inline">
              {optimizedContent 
                ? "AI-optimized for better readability" 
                : "Original extracted content"}
            </span>
          </div>
        </div>
        
        {optimizedContent && (
          <Alert className="mb-4 bg-soft-blue border-blue-200">
            <AlertDescription className="text-xs text-blue-800">
              This content has been processed by AI to highlight the most important concepts and improve readability.
            </AlertDescription>
          </Alert>
        )}
        
        <Textarea 
          className="font-[16px] leading-relaxed h-[300px] overflow-y-auto bg-soft-gray dark:bg-dark-charcoal border-gray-200" 
          value={displayContent}
          readOnly
          style={{ 
            fontSize: '0.95rem', 
            lineHeight: '1.5',
            color: optimizedContent ? '#403E43' : '#221F26',
            padding: '1rem',
            whiteSpace: 'pre-wrap'
          }}
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
        <Button
          onClick={onViewGuide}
          variant="default"
          className="flex-1 flex items-center justify-center"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          View Full Guide
        </Button>
      </div>
    </div>
  );
};
