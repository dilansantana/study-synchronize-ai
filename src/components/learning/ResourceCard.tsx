
import React from 'react';
import { ArrowRight, Clock, Star } from './ResourceIcons';
import { getSourceIcon } from './ResourceIcons';
import { formatDate } from '@/utils/formatUtils';
import AnimatedTransition from '../AnimatedTransition';
import { ContentItem } from '@/data/learningResources';
import { Button } from '@/components/ui/button';

// Separate component for resource metadata
const ResourceMeta: React.FC<{ item: ContentItem }> = ({ item }) => (
  <div className="text-xs text-muted-foreground">
    <span>{item.author}</span>
    {item.date && <span className="mx-1">•</span>}
    {item.date && <span>{formatDate(item.date)}</span>}
  </div>
);

// Component for resource stats (duration, rating)
const ResourceStats: React.FC<{ duration?: string; rating: number }> = ({ duration, rating }) => (
  <div className="mt-1 sm:mt-0 flex items-center text-sm text-muted-foreground">
    {duration && (
      <span className="flex items-center mr-3">
        <Clock className="mr-1 h-3 w-3" />
        {duration}
      </span>
    )}
    <div className="flex items-center">
      <span className="flex items-center">
        <Star className="mr-1 h-3 w-3 text-yellow-400" />
        {rating}
      </span>
    </div>
  </div>
);

// Component for resource actions
const ResourceActions: React.FC<{ 
  item: ContentItem; 
  handleOpenResource: (item: ContentItem) => void;
  onExtractResource?: (item: ContentItem) => void;
}> = ({ item, handleOpenResource, onExtractResource }) => (
  <div className="flex flex-wrap gap-2 justify-end">
    <button 
      onClick={() => handleOpenResource(item)}
      className="inline-flex items-center text-sm font-medium text-primary hover:underline hover:bg-primary/10 px-2 py-1 rounded-md transition-colors"
    >
      View Resource
      <ArrowRight className="ml-1 h-3 w-3" />
    </button>
    
    {onExtractResource && (
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onExtractResource(item)}
        className="text-xs"
      >
        Extract Info
      </Button>
    )}
  </div>
);

interface ResourceCardProps {
  item: ContentItem;
  index: number;
  handleOpenResource: (item: ContentItem) => void;
  onExtractResource?: (item: ContentItem) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ 
  item, 
  index, 
  handleOpenResource, 
  onExtractResource 
}) => {
  return (
    <AnimatedTransition
      key={item.id}
      animation="scale"
      delay={150 + (index * 50)}
      className="group relative rounded-lg border p-4 shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex flex-col sm:flex-row sm:items-start">
        <div className="sm:mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground">
          {getSourceIcon(item.source)}
        </div>
        
        <div className="mt-3 sm:mt-0 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-medium">{item.title}</h3>
            <ResourceStats duration={item.duration} rating={item.rating} />
          </div>
          
          <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
          
          <div className="mt-3 flex items-center justify-between">
            <ResourceMeta item={item} />
            <ResourceActions 
              item={item} 
              handleOpenResource={handleOpenResource} 
              onExtractResource={onExtractResource} 
            />
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};
