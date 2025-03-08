
import { useState } from 'react';
import { ContentItem, initialContentItems } from '@/data/learningResources';
import { useToast } from "@/hooks/use-toast";
import { useResourceFiltering } from './useResourceFiltering';
import { generateResourcesForCertification } from '@/utils/resourceGenerator';

export const useLearningSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchedCertification, setSearchedCertification] = useState('');
  const [contentItems, setContentItems] = useState<ContentItem[]>(initialContentItems);
  const { toast } = useToast();
  
  // Use the filtering hook
  const {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filteredContent
  } = useResourceFiltering(contentItems);

  const handleSearchForCertification = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast({
        title: "Search required",
        description: "Please enter a certification to search for",
        variant: "destructive"
      });
      return;
    }
    
    setIsSearching(true);
    setSearchedCertification(searchQuery);
    
    // Simulate an API call to gather resources
    setTimeout(() => {
      // Generate resources based on the search query
      const newResources = generateResourcesForCertification(searchQuery);
      
      // Update content items with new resources
      setContentItems([...newResources, ...initialContentItems]);
      setIsSearching(false);
      
      toast({
        title: "Resources found",
        description: `We've gathered resources for ${searchQuery} certification. Displaying results now.`,
      });
    }, 2000);
  };

  const handleOpenResource = (item: ContentItem) => {
    // Open the URL in a new tab
    window.open(item.url, '_blank', 'noopener,noreferrer');
    
    // Show a toast notification
    toast({
      title: "Resource opened",
      description: `Opening ${item.title} in a new tab`,
    });
  };

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    isSearching,
    searchedCertification,
    filteredContent,
    handleSearchForCertification,
    handleOpenResource
  };
};
