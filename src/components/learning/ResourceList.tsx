
import React from 'react';
import { ContentItem } from '@/data/learningResources';
import { ResourceCard } from './ResourceCard';
import { EmptyResults } from './EmptyResults';

interface ResourceListProps {
  filteredContent: ContentItem[];
  handleOpenResource: (item: ContentItem) => void;
  onExtractResource?: (item: ContentItem) => void;
}

export const ResourceList: React.FC<ResourceListProps> = ({ 
  filteredContent, 
  handleOpenResource,
  onExtractResource
}) => {
  if (!filteredContent.length) {
    return <EmptyResults />;
  }

  return (
    <div className="space-y-4">
      {filteredContent.map((item, index) => (
        <ResourceCard 
          key={item.id} 
          item={item} 
          index={index} 
          handleOpenResource={handleOpenResource}
          onExtractResource={onExtractResource}
        />
      ))}
    </div>
  );
};
