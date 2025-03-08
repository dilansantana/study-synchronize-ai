
import React, { useState } from 'react';
import { ContentItem } from "@/data/learningResources";
import { Info, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { optimizeContentWithGPT } from "@/utils/openAIUtils";
import { ApiKeyDialog } from './ApiKeyDialog';
import { GuideHeader } from './GuideHeader';
import { ContentDisplay } from './ContentDisplay';
import { GuideActions } from './GuideActions';

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
        title: "Processing content",
        description: <div className="flex items-center"><Info className="mr-2 h-4 w-4 text-blue-500" /> Sending to ChatGPT for optimization...</div>
      });
      
      const optimized = await optimizeContentWithGPT(
        generatedGuide.content,
        generatedGuide.title
      );
      
      setOptimizedContent(optimized);
      
      toast({
        title: "Content optimized",
        description: <div className="flex items-center"><CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Key points extracted successfully</div>
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
    <div className="space-y-3">
      <GuideHeader 
        guide={generatedGuide}
        isOptimizing={isOptimizing}
        optimizedContent={optimizedContent}
        onOptimize={handleOptimizeContent}
      />
      
      <div className="border rounded-lg overflow-hidden bg-card shadow-sm">
        <ContentDisplay 
          displayContent={displayContent}
          isOptimized={!!optimizedContent}
        />
      </div>
      
      <GuideActions
        onCreateFlashcards={onCreateFlashcards}
        onCreateQuiz={onCreateQuiz}
        onViewGuide={onViewGuide}
      />
      
      <ApiKeyDialog
        open={openAPIKeyDialog}
        onOpenChange={setOpenAPIKeyDialog}
        apiKey={apiKey}
        setApiKey={setApiKey}
        onSave={saveApiKey}
      />
    </div>
  );
};
