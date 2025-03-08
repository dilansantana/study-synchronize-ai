
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { ContentItem, ultimateGuides } from "@/data/learningResources";
import { Progress } from "@/components/ui/progress";
import { getSourceIcon } from './ResourceIcons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';

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

    // Simulate extraction process
    for (let i = 1; i <= 10; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setProgress(i * 10);
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
      content: generateMockContent(selectedResources, availableResources)
    };

    // Store the guide
    ultimateGuides[newGuide.id] = newGuide;
    setGeneratedGuide(newGuide);
    setIsGenerating(false);
    setActiveTab('preview');

    toast({
      title: "Guide generated",
      description: `Successfully created "${guideName}" ultimate guide`
    });
  };

  const generateMockContent = (resourceIds: string[], resources: ContentItem[]): string => {
    const selectedResourcesList = resources.filter(resource => resourceIds.includes(resource.id));
    
    let content = `# ${guideName} - Ultimate Study Guide\n\n`;
    content += `## Overview\nThis comprehensive guide combines information from ${selectedResourcesList.length} resources to provide you with everything you need to know about ${guideName}.\n\n`;
    
    selectedResourcesList.forEach((resource, index) => {
      content += `## Section ${index + 1}: ${resource.title}\n`;
      content += `Source: ${resource.source.toUpperCase()} | Author: ${resource.author || 'Unknown'}\n\n`;
      
      // Generate mock extracted content based on resource type
      switch (resource.source) {
        case 'youtube':
          content += `Key points from this video:\n`;
          content += `- Understanding core concepts of ${guideName} presented by ${resource.author}\n`;
          content += `- Practical demonstrations of implementation techniques\n`;
          content += `- Best practices for real-world scenarios\n`;
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
    
    // In a real implementation, we would pass the guide content to the flashcards page
    navigate('/flashcards', { state: { guideContent: generatedGuide.content } });
  };

  const handleCreateQuiz = () => {
    if (!generatedGuide) return;
    
    toast({
      title: "Creating quiz",
      description: "Redirecting to quiz generator with pre-populated content"
    });
    
    // In a real implementation, we would pass the guide content to the quiz page
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
              <div>
                <label className="text-sm font-medium">Guide Name</label>
                <Input
                  value={guideName}
                  onChange={(e) => setGuideName(e.target.value)}
                  placeholder="e.g., AWS Solutions Architect Ultimate Guide"
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Select Resources to Extract From</label>
                <div className="mt-2 space-y-2 max-h-80 overflow-y-auto border rounded-md p-2">
                  {availableResources.length > 0 ? (
                    availableResources.map((resource) => (
                      <div key={resource.id} className="flex items-start space-x-2 p-2 hover:bg-secondary/50 rounded-md">
                        <Checkbox 
                          id={`resource-${resource.id}`}
                          checked={selectedResources.includes(resource.id)}
                          onCheckedChange={() => handleResourceToggle(resource.id)}
                        />
                        <div className="flex-1">
                          <label 
                            htmlFor={`resource-${resource.id}`}
                            className="text-sm font-medium cursor-pointer flex items-center gap-2"
                          >
                            {getSourceIcon(resource.source)}
                            {resource.title}
                          </label>
                          <p className="text-xs text-muted-foreground">{resource.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      <p>No resources available. Search for certification resources to get started.</p>
                    </div>
                  )}
                </div>
              </div>
              
              {isGenerating && (
                <div className="space-y-2">
                  <p className="text-sm">Extracting information from selected resources...</p>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-4">
            {generatedGuide && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold">{generatedGuide.title}</h3>
                  <p className="text-sm text-muted-foreground">{generatedGuide.description}</p>
                </div>
                
                <div className="border rounded-md p-4 bg-secondary/20">
                  <Textarea 
                    className="font-mono h-[300px] overflow-y-auto" 
                    value={generatedGuide.content}
                    readOnly
                  />
                </div>
                
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                  <Button
                    onClick={handleCreateFlashcards}
                    variant="outline"
                    className="flex-1"
                  >
                    Create Flashcards
                  </Button>
                  <Button
                    onClick={handleCreateQuiz}
                    variant="outline"
                    className="flex-1"
                  >
                    Create Quiz
                  </Button>
                </div>
              </div>
            )}
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
