
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ContentItem } from "@/data/learningResources";
import { FileText, BookOpen, ExternalLink, Lightbulb, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { optimizeContentWithGPT } from "@/utils/openAIUtils";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
  const [openAPIKeyDialog, setOpenAPIKeyDialog] = useState(false);
  const [apiKey, setApiKey] = useState<string>('');
  
  if (!generatedGuide) return null;
  
  const handleOptimizeContent = async () => {
    const storedApiKey = localStorage.getItem('openai_api_key');
    
    if (!storedApiKey) {
      setOpenAPIKeyDialog(true);
      return;
    }
    
    await optimizeWithGPT();
  };
  
  const optimizeWithGPT = async () => {
    setIsOptimizing(true);
    
    try {
      toast({
        title: "GPT analysis in progress",
        description: "Sending content to ChatGPT for optimization..."
      });
      
      const optimized = await optimizeContentWithGPT(
        generatedGuide.content,
        generatedGuide.title
      );
      
      setOptimizedContent(optimized);
      
      toast({
        title: "Content optimized",
        description: "ChatGPT has extracted the key information from your guide"
      });
    } catch (error) {
      console.error("Error optimizing with OpenAI:", error);
      toast({
        title: "Optimization failed",
        description: error instanceof Error ? error.message : "Failed to extract key information with ChatGPT",
        variant: "destructive"
      });
    } finally {
      setIsOptimizing(false);
    }
  };
  
  const saveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key",
        variant: "destructive"
      });
      return;
    }
    
    localStorage.setItem('openai_api_key', apiKey.trim());
    setOpenAPIKeyDialog(false);
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved to your browser"
    });
    
    // Proceed with optimization
    optimizeWithGPT();
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
            {optimizedContent ? "ChatGPT Optimized Content" : "Generated Content"}
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
                {isOptimizing ? "Processing with GPT..." : "Optimize with ChatGPT"}
              </Button>
            )}
            <span className="text-xs text-muted-foreground hidden sm:inline">
              {optimizedContent 
                ? "Optimized by ChatGPT for better learning" 
                : "Original extracted content"}
            </span>
          </div>
        </div>
        
        {optimizedContent && (
          <Alert className="mb-4 bg-soft-blue border-blue-200">
            <AlertDescription className="text-xs text-blue-800 flex items-center">
              <Info className="h-3 w-3 mr-1" />
              This content has been optimized by ChatGPT to enhance readability and highlight key learning points.
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
      
      {/* API Key Dialog */}
      <Dialog open={openAPIKeyDialog} onOpenChange={setOpenAPIKeyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter OpenAI API Key</DialogTitle>
            <DialogDescription>
              Your API key is required to use ChatGPT for guide optimization. 
              It will be stored in your browser and only used for this feature.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Input
                id="apiKey"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                You can get your API key from the <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary underline">OpenAI dashboard</a>
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAPIKeyDialog(false)}>Cancel</Button>
            <Button onClick={saveApiKey}>Save & Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

