
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ContentItem, ultimateGuides } from "@/data/learningResources";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { ResourceSelectionList } from './ResourceSelectionList';
import { GenerationProgress } from './GenerationProgress';
import { GuidePreview } from './GuidePreview';
import { GuideNameInput } from './GuideNameInput';
import { extractYouTubeVideoId, fetchYouTubeCaptions } from '@/utils/youtubeUtils';

interface UltimateGuideGeneratorProps {
  availableResources: ContentItem[];
}

export const UltimateGuideGenerator: React.FC<UltimateGuideGeneratorProps> = ({ availableResources }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [guideName, setGuideName] = useState('');
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedGuide, setGeneratedGuide] = useState<ContentItem | null>(null);
  const [activeTab, setActiveTab] = useState<string>('select');
  const [captionsMap, setCaptionsMap] = useState<Record<string, string>>({});

  const handleResourceToggle = (id: string) => {
    setSelectedResources(prev => 
      prev.includes(id)
        ? prev.filter(resourceId => resourceId !== id)
        : [...prev, id]
    );
  };

  const handleGenerateGuide = async () => {
    if (!guideName.trim()) {
      toast({
        title: "Guide name required",
        description: "Please enter a name for your ultimate guide",
        variant: "destructive"
      });
      return;
    }

    if (selectedResources.length === 0) {
      toast({
        title: "No resources selected",
        description: "Please select at least one resource to extract information from",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    try {
      // Gather YouTube captions first
      const selectedResourcesList = availableResources.filter(resource => selectedResources.includes(resource.id));
      const youtubeResources = selectedResourcesList.filter(resource => resource.source === 'youtube');
      
      // Create a map to store captions for each YouTube resource
      const captionsData: Record<string, string> = {};
      
      // Process each YouTube resource to fetch captions
      const totalSteps = 10;
      const youtubeStepsPercent = youtubeResources.length > 0 ? 40 : 0;
      const remainingStepsPercent = 100 - youtubeStepsPercent;
      
      // Fetch captions for YouTube videos
      if (youtubeResources.length > 0) {
        for (let i = 0; i < youtubeResources.length; i++) {
          const resource = youtubeResources[i];
          const videoId = extractYouTubeVideoId(resource.url);
          
          if (videoId) {
            // Update progress as we process each YouTube video
            setProgress(Math.floor((i / youtubeResources.length) * youtubeStepsPercent));
            
            // Fetch captions
            const captions = await fetchYouTubeCaptions(videoId);
            if (captions) {
              captionsData[resource.id] = captions;
            }
          }
          
          // Add a small delay to simulate processing
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }
      
      // Store the captions map
      setCaptionsMap(captionsData);
      
      // Simulate remaining extraction process
      for (let i = 1; i <= totalSteps; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        const progressPercent = youtubeStepsPercent + (i * (remainingStepsPercent / totalSteps));
        setProgress(Math.min(progressPercent, 100));
      }

      // Create the new guide
      const newGuide: ContentItem = {
        id: `guide-${Date.now()}`,
        title: guideName,
        source: 'guide',
        description: `Ultimate guide created from ${selectedResources.length} resources covering essential topics for ${guideName}.`,
        url: '#',
        date: new Date().toISOString().split('T')[0],
        author: 'AI Assistant',
        rating: 5.0,
        content: generateMockContent(selectedResources, availableResources, captionsData)
      };

      // Store the guide
      ultimateGuides[newGuide.id] = newGuide;
      setGeneratedGuide(newGuide);
      setActiveTab('preview');

      toast({
        title: "Guide generated",
        description: `Successfully created "${guideName}" ultimate guide`
      });
    } catch (error) {
      console.error('Error generating guide:', error);
      toast({
        title: "Generation failed",
        description: "An error occurred while generating your guide.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
      setProgress(100);
    }
  };

  const generateMockContent = (
    resourceIds: string[], 
    resources: ContentItem[], 
    captionsData: Record<string, string>
  ): string => {
    const selectedResourcesList = resources.filter(resource => resourceIds.includes(resource.id));
    
    let content = `# ${guideName} - Ultimate Study Guide\n\n`;
    content += `## Overview\nThis comprehensive guide combines information from ${selectedResourcesList.length} resources to provide you with everything you need to know about ${guideName}.\n\n`;
    
    selectedResourcesList.forEach((resource, index) => {
      content += `## Section ${index + 1}: ${resource.title}\n`;
      content += `Source: ${resource.source.toUpperCase()} | Author: ${resource.author || 'Unknown'}\n\n`;
      
      // Generate content based on resource type
      switch (resource.source) {
        case 'youtube':
          // Use the captions if available
          if (captionsData[resource.id]) {
            content += `Content extracted from YouTube captions:\n\n`;
            content += captionsData[resource.id];
            content += `\n\n`;
          } else {
            // Fallback if captions are not available
            content += `Key points from this video:\n`;
            content += `- Understanding core concepts of ${guideName} presented by ${resource.author}\n`;
            content += `- Practical demonstrations of implementation techniques\n`;
            content += `- Best practices for real-world scenarios\n`;
          }
          break;
        case 'article':
        case 'document':
          content += `Summary of the document:\n`;
          content += `- Detailed explanation of ${guideName} architecture and components\n`;
          content += `- Technical specifications and requirements\n`;
          content += `- Implementation guidelines and configuration tips\n`;
          break;
        case 'forum':
          content += `Community insights:\n`;
          content += `- Common challenges and solutions reported by practitioners\n`;
          content += `- Expert recommendations for optimizing performance\n`;
          content += `- Alternative approaches to consider based on use case\n`;
          break;
        case 'quizlet':
          content += `Key flashcards and concepts:\n`;
          content += `- Definition: ${guideName} - a comprehensive methodology for...\n`;
          content += `- Important terminology and frameworks related to the topic\n`;
          content += `- Practice questions with answers for self-assessment\n`;
          break;
        default:
          content += `Content extracted from ${resource.title}:\n`;
          content += `- Multiple approaches to implementing ${guideName}\n`;
          content += `- Core principles and fundamentals you should master\n`;
          content += `- Advanced techniques for experienced practitioners\n`;
      }
      
      content += `\n\n`;
    });
    
    content += `## Summary\n`;
    content += `This guide has consolidated information from multiple sources to provide a comprehensive overview of ${guideName}. `;
    content += `Use this as your primary reference when studying for certifications or implementing solutions in a production environment.\n\n`;
    content += `## Next Steps\n`;
    content += `- Create flashcards from the key concepts in this guide\n`;
    content += `- Practice with quizzes to test your knowledge\n`;
    content += `- Apply your knowledge in hands-on projects\n`;
    
    return content;
  };

  const handleCreateFlashcards = () => {
    if (!generatedGuide) return;
    
    toast({
      title: "Creating flashcards",
      description: "Redirecting to flashcards with pre-populated content"
    });
    
    // Navigate to flashcards page with guide content
    navigate('/flashcards', { state: { guideContent: generatedGuide.content } });
  };

  const handleCreateQuiz = () => {
    if (!generatedGuide) return;
    
    toast({
      title: "Creating quiz",
      description: "Redirecting to quiz generator with pre-populated content"
    });
    
    // Navigate to quiz page with guide content
    navigate('/quiz', { state: { guideContent: generatedGuide.content } });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ultimate Guide Generator</CardTitle>
        <CardDescription>
          Extract and combine information from multiple resources to create a comprehensive study guide
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="select">Select Resources</TabsTrigger>
            <TabsTrigger value="preview" disabled={!generatedGuide}>Preview Guide</TabsTrigger>
          </TabsList>
          
          <TabsContent value="select" className="space-y-4">
            <div className="space-y-4">
              <GuideNameInput 
                guideName={guideName}
                onChange={setGuideName}
              />
              
              <ResourceSelectionList
                availableResources={availableResources}
                selectedResources={selectedResources}
                onResourceToggle={handleResourceToggle}
              />
              
              <GenerationProgress 
                isGenerating={isGenerating}
                progress={progress}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-4">
            <GuidePreview
              generatedGuide={generatedGuide}
              onCreateFlashcards={handleCreateFlashcards}
              onCreateQuiz={handleCreateQuiz}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setActiveTab('select')}
          disabled={isGenerating || activeTab === 'select'}
        >
          Back
        </Button>
        <Button 
          onClick={handleGenerateGuide}
          disabled={isGenerating || !guideName || selectedResources.length === 0 || activeTab !== 'select'}
        >
          {isGenerating ? "Generating..." : "Generate Ultimate Guide"}
        </Button>
      </CardFooter>
    </Card>
  );
};
