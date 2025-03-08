
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ContentItem, ultimateGuides } from "@/data/learningResources";
import { Loader2, Brain, BrainCircuit } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { ApiKeyDialog } from './ApiKeyDialog';
import { optimizeContentWithGPT } from "@/utils/openAIUtils";

const AIGuideGenerator: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [openAPIKeyDialog, setOpenAPIKeyDialog] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const generateGuide = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a topic for your guide",
        variant: "destructive"
      });
      return;
    }

    const storedApiKey = localStorage.getItem('openai_api_key');
    
    if (!storedApiKey) {
      setOpenAPIKeyDialog(true);
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    
    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 5;
          return newProgress <= 95 ? newProgress : 95;
        });
      }, 1000);

      // Prepare the prompt for the AI
      const prompt = `Generate a comprehensive ultimate study guide about "${topic}".
      ${additionalInfo ? `Consider the following additional information: ${additionalInfo}` : ''}
      
      The guide should include:
      - A thorough introduction to ${topic}
      - Key concepts and terminology
      - Best practices and common challenges
      - Step-by-step learning path
      - Recommended resources for further learning
      
      Format the content in markdown with clear headings, subheadings, and bullet points.`;

      toast({
        title: "Generating guide",
        description: "Please wait while ChatGPT generates your guide..."
      });
      
      // Generate content using OpenAI
      const generatedContent = await optimizeContentWithGPT(prompt, topic);
      clearInterval(progressInterval);
      
      // Create a new guide
      const newGuide: ContentItem = {
        id: `guide-${Date.now()}`,
        title: `AI-Generated Guide: ${topic}`,
        source: 'guide',
        description: `AI-generated ultimate guide covering essential topics for ${topic}.`,
        url: '#',
        date: new Date().toISOString().split('T')[0],
        author: 'AI Assistant',
        rating: 5.0,
        content: generatedContent
      };

      // Save the guide
      ultimateGuides[newGuide.id] = newGuide;
      
      toast({
        title: "Guide generated successfully",
        description: `Your guide on "${topic}" is now ready to view.`
      });
      
      // Navigate to the new guide
      navigate(`/guide/${newGuide.id}`);
    } catch (error) {
      console.error('Error generating guide:', error);
      toast({
        title: "Generation failed",
        description: "An error occurred while generating your guide. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const saveApiKey = () => {
    localStorage.setItem('openai_api_key', apiKey.trim());
    setOpenAPIKeyDialog(false);
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved to your browser"
    });
    
    // Proceed with guide generation
    generateGuide();
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-primary" />
            Generate Ultimate Guide with AI
          </CardTitle>
          <CardDescription>
            Use ChatGPT to create a comprehensive study guide on any topic
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="topic" className="text-sm font-medium mb-1.5 block">Guide Topic</label>
            <Input
              id="topic"
              placeholder="Enter a topic (e.g., AWS Lambda, Kubernetes Security, Network Protocols)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="additionalInfo" className="text-sm font-medium mb-1.5 block">
              Additional Information (optional)
            </label>
            <Textarea
              id="additionalInfo"
              placeholder="Add specific requirements, areas to focus on, or experience level (e.g., beginner, intermediate, advanced)"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          {isGenerating && (
            <div className="space-y-2">
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500 ease-in-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Generating your guide... This may take a minute or two.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={generateGuide}
            disabled={isGenerating || !topic.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Generate Ultimate Guide
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
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

export default AIGuideGenerator;
