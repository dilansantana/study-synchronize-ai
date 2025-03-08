
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ContentItem } from "@/data/learningResources";
import { 
  FileText, 
  BookOpen, 
  ExternalLink, 
  Lightbulb, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { optimizeContentWithGPT } from "@/utils/openAIUtils";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  const [expandContent, setExpandContent] = useState(false);
  
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
  const contentPreview = expandContent ? displayContent : displayContent.slice(0, 350) + (displayContent.length > 350 ? '...' : '');
  
  // Function to render content with appropriate formatting
  const renderFormattedContent = (content: string) => {
    // Basic markdown-style parsing to add structure
    const sections = content.split(/\n#{2,3} /);
    
    if (sections.length <= 1) {
      // No headers found, return the content with paragraph formatting
      return (
        <div className="space-y-3 text-[15px] leading-relaxed">
          {content.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      );
    }
    
    return (
      <Accordion type="single" collapsible className="w-full">
        {sections.map((section, index) => {
          if (index === 0 && !section.trim().startsWith('#')) {
            // This is intro content before any headers
            return (
              <div key="intro" className="mb-3 text-[15px] leading-relaxed">
                {section}
              </div>
            );
          }
          
          const lines = section.split('\n');
          const title = lines[0].replace(/^#+\s*/, '');
          const content = lines.slice(1).join('\n');
          
          return (
            <AccordionItem key={index} value={`section-${index}`}>
              <AccordionTrigger className="text-base font-medium py-2">
                {title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-[15px] leading-relaxed pl-2 border-l-2 border-gray-200">
                  {content.split('\n\n').map((paragraph, i) => {
                    if (paragraph.trim().startsWith('- ')) {
                      // This is a bullet list
                      return (
                        <ul key={i} className="list-disc pl-5 space-y-1">
                          {paragraph.split('\n').map((item, j) => (
                            <li key={j}>{item.replace(/^- /, '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={i}>{paragraph}</p>;
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  };
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-bold">{generatedGuide.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
              {generatedGuide.source}
            </Badge>
            <span className="text-sm text-muted-foreground">{generatedGuide.author}</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{generatedGuide.date}</span>
          </div>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden bg-card shadow-sm">
        <div className="p-3 bg-muted/30 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-md">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <span className="font-medium text-sm">
              {optimizedContent ? "AI-Enhanced Summary" : "Generated Content"}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {!optimizedContent && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleOptimizeContent}
                disabled={isOptimizing}
                className="h-8 gap-1 text-xs"
              >
                <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                {isOptimizing ? "Processing..." : "Extract Key Points"}
              </Button>
            )}
          </div>
        </div>
        
        {optimizedContent && (
          <Alert className="m-3 bg-blue-50 border-blue-200">
            <AlertDescription className="text-xs text-blue-800 flex items-center">
              <Info className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
              This content has been processed by ChatGPT to highlight key learning points and improve readability.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="p-4">
          {optimizedContent ? (
            renderFormattedContent(optimizedContent)
          ) : (
            <div className="space-y-2">
              <p className="text-[15px] leading-relaxed">
                {contentPreview}
              </p>
              {displayContent.length > 350 && !expandContent && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setExpandContent(true)}
                  className="text-xs flex items-center mt-1 h-7"
                >
                  Show more <ChevronDown className="ml-1 h-3.5 w-3.5" />
                </Button>
              )}
              {expandContent && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setExpandContent(false)}
                  className="text-xs flex items-center mt-1 h-7"
                >
                  Show less <ChevronUp className="ml-1 h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-3">
        <Button
          onClick={onCreateFlashcards}
          size="sm"
          variant="outline"
          className="h-9 gap-1.5"
        >
          <FileText className="h-4 w-4 text-orange-500" />
          Create Flashcards
        </Button>
        <Button
          onClick={onCreateQuiz}
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
      </div>
      
      {/* API Key Dialog */}
      <Dialog open={openAPIKeyDialog} onOpenChange={setOpenAPIKeyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter OpenAI API Key</DialogTitle>
            <DialogDescription>
              Your API key is required to use ChatGPT for content optimization. 
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
