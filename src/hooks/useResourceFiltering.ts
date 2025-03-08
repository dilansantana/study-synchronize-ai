
import { useState } from 'react';
import { ContentItem } from '@/data/learningResources';

export const useResourceFiltering = (contentItems: ContentItem[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredContent = contentItems.filter(item => {
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by content type
    const matchesFilter = activeFilter === null || activeFilter === 'all' || item.source === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filteredContent
  };
};
