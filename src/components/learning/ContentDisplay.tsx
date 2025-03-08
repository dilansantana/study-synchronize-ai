
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ContentFormatter } from './ContentFormatter';
import { Info, ChevronDown, ChevronUp } from "lucide-react";

interface ContentDisplayProps {
  displayContent: string;
  isOptimized: boolean;
}

export const ContentDisplay: React.FC<ContentDisplayProps> = ({
  displayContent,
  isOptimized
}) => {
  const [expandContent, setExpandContent] = useState(false);
  
  const contentPreview = expandContent ? 
    displayContent : 
    displayContent.slice(0, 350) + (displayContent.length > 350 ? '...' : '');
  
  return (
    <div className="p-4">
      {isOptimized ? (
        <ContentFormatter content={displayContent} />
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
  );
};
