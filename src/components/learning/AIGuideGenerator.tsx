import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ContentItem, ultimateGuides } from "@/data/learningResources";
import { Loader2, Brain, BrainCircuit, AlertTriangle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { ApiKeyDialog } from './ApiKeyDialog';
import { optimizeContentWithGPT } from "@/utils/openAIUtils";
import { GenerationProgress } from './GenerationProgress';

const AIGuideGenerator: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [openAPIKeyDialog, setOpenAPIKeyDialog] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [apiError, setApiError] = useState<string | null>(null);

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
    
    if (!storedApiKey && !apiKey) {
      setOpenAPIKeyDialog(true);
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setApiError(null);
    
    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 5;
          return newProgress <= 95 ? newProgress : 95;
        });
      }, 1000);

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
      
      try {
        const generatedContent = await optimizeContentWithGPT(prompt, topic);
        clearInterval(progressInterval);
        createAndSaveGuide(generatedContent);
      } catch (error) {
        clearInterval(progressInterval);
        console.error('Error optimizing content with GPT:', error);
        
        if (error instanceof Error && error.message.includes("quota")) {
          setApiError("OpenAI API quota exceeded. Using fallback method to generate guide.");
          generateFallbackGuide();
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error generating guide:', error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "An error occurred while generating your guide. Please try again.",
        variant: "destructive"
      });
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const generateFallbackGuide = () => {
    const fallbackContent = `# Ultimate Guide to ${topic}

## Introduction
This is an auto-generated guide about ${topic}. ${additionalInfo ? `With a focus on: ${additionalInfo}` : ''}

## Key Concepts
- Understanding the basics of ${topic}
- Important terminology
- Core principles

## Best Practices
- Start with the fundamentals
- Practice regularly
- Join communities related to ${topic}

## Learning Path
1. Begin with introductory materials
2. Build practical experience
3. Advance to more complex topics
4. Join specialized communities

## Recommended Resources
- Books: Look for beginner-friendly books on ${topic}
- Online Courses: Platforms like Coursera, Udemy, and LinkedIn Learning offer courses on ${topic}
- Communities: Find forums and discussion groups
- Practice Projects: Build real-world projects to apply your knowledge

*Note: This guide was generated using a fallback system when the AI generation service was unavailable. For a more detailed guide, please try again later.*`;

    createAndSaveGuide(fallbackContent);
  };

  const createAndSaveGuide = (content: string) => {
    const guideId = `guide-${Date.now()}`;
    
    const newGuide: ContentItem = {
      id: guideId,
      title: `AI-Generated Guide: ${topic}`,
      source: 'guide',
      description: `AI-generated ultimate guide covering essential topics for ${topic}.`,
      url: '#',
      date: new Date().toISOString().split('T')[0],
      author: 'AI Assistant',
      rating: 5.0,
      content: content
    };

    ultimateGuides[guideId] = newGuide;
    
    setTimeout(() => {
      toast({
        title: "Guide generated successfully",
        description: `Your guide on "${topic}" is now ready to view.`
      });
      
      navigate(`/guide/${guideId}`);
      setIsGenerating(false);
      setProgress(0);
    }, 100);
  };

  const saveApiKey = () => {
    localStorage.setItem('openai_api_key', apiKey.trim());
    setOpenAPIKeyDialog(false);
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved to your browser"
    });
    
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
          
          {apiError && (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-800">{apiError}</p>
                <p className="text-xs text-amber-700 mt-1">A simplified guide will be generated instead.</p>
              </div>
            </div>
          )}
          
          {isGenerating && (
            <GenerationProgress isGenerating={isGenerating} progress={progress} />
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
