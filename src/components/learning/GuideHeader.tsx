
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ContentItem } from "@/data/learningResources";

interface GuideHeaderProps {
  guide: ContentItem;
  isOptimizing: boolean;
  optimizedContent: string;
  onOptimize: () => void;
}

export const GuideHeader: React.FC<GuideHeaderProps> = ({
  guide,
  isOptimizing,
  optimizedContent,
  onOptimize
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-bold">{guide.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
              {guide.source}
            </Badge>
            <span className="text-sm text-muted-foreground">{guide.author}</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{guide.date}</span>
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
                onClick={onOptimize}
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
      </div>
    </div>
  );
};
