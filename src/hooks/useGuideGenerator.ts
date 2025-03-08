
import { useState } from 'react';
import { ContentItem, ultimateGuides } from "@/data/learningResources";
import { useToast } from "@/hooks/use-toast";
import { extractYouTubeVideoId, fetchYouTubeCaptions } from '@/utils/youtubeUtils';

export const useGuideGenerator = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedGuide, setGeneratedGuide] = useState<ContentItem | null>(null);
  const [captionsMap, setCaptionsMap] = useState<Record<string, string>>({});
  const [extractedContent, setExtractedContent] = useState<Record<string, string>>({});

  const extractContentFromResource = (resource: ContentItem, guideName: string): string => {
    let extractedInfo = '';
    
    // If we already have YouTube captions, use those
    if (resource.source === 'youtube' && captionsMap[resource.id]) {
      // Extract the most important parts from captions (simplified for demo)
      const captions = captionsMap[resource.id];
      const sentences = captions.split(/[.!?]+/).filter(Boolean);
      
      // Get "important" sentences (every 5th sentence for demo purposes)
      const importantSentences = sentences.filter((_, index) => index % 5 === 0 || index < 5);
      extractedInfo = importantSentences.join('. ');
      
      if (extractedInfo.length > 500) {
        extractedInfo = extractedInfo.substring(0, 500) + '...';
      }
      
      return `### Key Points from Video:\n${extractedInfo}\n\n`;
    }
    
    // Handle different resource types
    switch (resource.source) {
      case 'youtube':
        return `### Key Video Concepts:\n- Understanding core concepts presented by ${resource.author || 'the instructor'}\n- Visual demonstrations of practical implementation\n- Step-by-step tutorial approach for learning ${guideName}\n\n`;
      
      case 'article':
        return `### Article Summary:\n- In-depth explanation of ${guideName} fundamentals\n- Practical examples and code snippets\n- Best practices recommended by ${resource.author || 'experts'}\n- Latest trends and approaches in the field\n\n`;
      
      case 'document':
        return `### Document Analysis:\n- Comprehensive coverage of ${guideName} architecture\n- Technical specifications and requirements\n- Implementation guidelines and configuration tips\n- Official documentation insights and recommendations\n\n`;
      
      case 'forum':
        return `### Community Insights:\n- Common challenges reported by practitioners\n- Crowdsourced solutions and workarounds\n- Real-world implementation experiences\n- Expert recommendations from the community\n\n`;
      
      case 'quizlet':
        return `### Key Flashcard Concepts:\n- Important terminology and definitions\n- Core frameworks and methodologies\n- Memory aids for complex concepts\n- Practice questions and answers\n\n`;
      
      default:
        return `### Content from ${resource.title}:\n- Multiple approaches to implementing ${guideName}\n- Core principles and fundamentals\n- Advanced techniques for practitioners\n\n`;
    }
  };

  const generateGuideContent = (
    resources: ContentItem[], 
    extractedData: Record<string, string>,
    guideName: string
  ): string => {
    let content = `# ${guideName} - Ultimate Study Guide\n\n`;
    content += `## Overview\nThis comprehensive guide combines information from ${resources.length} resources to provide you with everything you need to know about ${guideName}.\n\n`;
    content += `## Table of Contents\n`;
    
    resources.forEach((resource, index) => {
      content += `${index + 1}. [${resource.title}](#section-${index + 1})\n`;
    });
    
    content += `\n---\n\n`;
    
    resources.forEach((resource, index) => {
      content += `## Section ${index + 1}: ${resource.title} <a name="section-${index + 1}"></a>\n`;
      content += `Source: ${resource.source.toUpperCase()} | Author: ${resource.author || 'Unknown'}\n\n`;
      
      if (extractedData[resource.id]) {
        content += extractedData[resource.id];
      } else {
        content += `Content extracted from ${resource.title}:\n\n`;
        content += `- Key points about ${guideName}\n`;
        content += `- Important concepts and methodologies\n`;
        content += `- Practical implementation tips\n\n`;
      }
      
      content += `\n---\n\n`;
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

  const handleGenerateGuide = async (
    guideName: string,
    selectedResources: string[],
    availableResources: ContentItem[]
  ) => {
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
    setExtractedContent({});

    try {
      const selectedResourcesList = availableResources.filter(resource => selectedResources.includes(resource.id));
      const youtubeResources = selectedResourcesList.filter(resource => resource.source === 'youtube');
      
      const captionsData: Record<string, string> = {};
      const extractedData: Record<string, string> = {};
      
      // Phase 1: Extract YouTube captions (0-40%)
      if (youtubeResources.length > 0) {
        for (let i = 0; i < youtubeResources.length; i++) {
          const resource = youtubeResources[i];
          const videoId = extractYouTubeVideoId(resource.url);
          
          if (videoId) {
            setProgress(Math.floor((i / youtubeResources.length) * 30));
            
            const captions = await fetchYouTubeCaptions(videoId);
            if (captions) {
              captionsData[resource.id] = captions;
              toast({
                title: "Captions extracted",
                description: `Successfully extracted captions from "${resource.title}"`,
                duration: 2000,
              });
            }
          }
          
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }
      
      setCaptionsMap(captionsData);
      
      // Phase 2: Extract content from all resources (40-70%)
      for (let i = 0; i < selectedResourcesList.length; i++) {
        const resource = selectedResourcesList[i];
        const progressPercent = 30 + Math.floor((i / selectedResourcesList.length) * 40);
        setProgress(progressPercent);
        
        const extractedInfo = extractContentFromResource(resource, guideName);
        extractedData[resource.id] = extractedInfo;
        
        toast({
          title: "Information extracted",
          description: `Analyzed and extracted key points from "${resource.title}"`,
          duration: 2000,
        });
        
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      setExtractedContent(extractedData);
      
      // Phase 3: Compile guide (70-100%)
      for (let i = 1; i <= 6; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        const progressPercent = 70 + (i * 5);
        setProgress(Math.min(progressPercent, 100));
      }

      const newGuide: ContentItem = {
        id: `guide-${Date.now()}`,
        title: guideName,
        source: 'guide',
        description: `Ultimate guide created from ${selectedResources.length} resources covering essential topics for ${guideName}.`,
        url: '#',
        date: new Date().toISOString().split('T')[0],
        author: 'AI Assistant',
        rating: 5.0,
        content: generateGuideContent(selectedResourcesList, extractedData, guideName)
      };

      ultimateGuides[newGuide.id] = newGuide;
      setGeneratedGuide(newGuide);
      
      toast({
        title: "Guide generated",
        description: `Successfully created "${guideName}" ultimate guide`,
        duration: 3000,
      });
      
      return newGuide;
    } catch (error) {
      console.error('Error generating guide:', error);
      toast({
        title: "Generation failed",
        description: "An error occurred while generating your guide.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsGenerating(false);
      setProgress(100);
    }
  };

  return {
    isGenerating,
    progress,
    generatedGuide,
    setGeneratedGuide,
    handleGenerateGuide
  };
};
