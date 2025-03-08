
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { ContentItem } from "@/data/learningResources";
import { getSourceIcon } from './ResourceIcons';
import { Badge } from "@/components/ui/badge";

interface ResourceSelectionListProps {
  availableResources: ContentItem[];
  selectedResources: string[];
  onResourceToggle: (id: string) => void;
}

export const ResourceSelectionList: React.FC<ResourceSelectionListProps> = ({
  availableResources,
  selectedResources,
  onResourceToggle
}) => {
  const allSelected = availableResources.length > 0 && 
    availableResources.every(resource => selectedResources.includes(resource.id));
  
  const handleSelectAll = () => {
    if (allSelected) {
      // Deselect all resources
      availableResources.forEach(resource => {
        if (selectedResources.includes(resource.id)) {
          onResourceToggle(resource.id);
        }
      });
    } else {
      // Select all resources
      availableResources.forEach(resource => {
        if (!selectedResources.includes(resource.id)) {
          onResourceToggle(resource.id);
        }
      });
    }
  };

  return (
    <div>
      <label className="text-sm font-medium">Select Resources to Extract From</label>
      <div className="mt-2 space-y-2 max-h-80 overflow-y-auto border rounded-md p-2">
        {availableResources.length > 0 ? (
          <>
            <div className="flex items-start space-x-2 p-2 bg-secondary/20 rounded-md">
              <Checkbox 
                id="select-all"
                checked={allSelected}
                onCheckedChange={handleSelectAll}
              />
              <div className="flex-1">
                <label 
                  htmlFor="select-all"
                  className="text-sm font-medium cursor-pointer flex items-center gap-2"
                >
                  Select All Resources
                </label>
                <p className="text-xs text-muted-foreground">Toggle selection for all {availableResources.length} resources</p>
              </div>
            </div>
            <div className="h-px bg-border my-2" />
            {availableResources.map((resource) => (
              <div key={resource.id} className="flex items-start space-x-2 p-2 hover:bg-secondary/50 rounded-md">
                <Checkbox 
                  id={`resource-${resource.id}`}
                  checked={selectedResources.includes(resource.id)}
                  onCheckedChange={() => onResourceToggle(resource.id)}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <label 
                      htmlFor={`resource-${resource.id}`}
                      className="text-sm font-medium cursor-pointer flex items-center gap-2"
                    >
                      {getSourceIcon(resource.source)}
                      {resource.title}
                    </label>
                    <Badge variant="outline" className="text-xs">
                      {resource.source}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{resource.description}</p>
                  {resource.author && (
                    <p className="text-xs text-muted-foreground mt-1">By: {resource.author}</p>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            <p>No resources available. Search for certification resources to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};
