
import { useState } from 'react';
import { ContentItem, initialContentItems, additionalResources } from '@/data/learningResources';
import { useToast } from "@/hooks/use-toast";

export const useLearningSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchedCertification, setSearchedCertification] = useState('');
  const [contentItems, setContentItems] = useState<ContentItem[]>(initialContentItems);
  const { toast } = useToast();

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
      const certKey = searchQuery.toLowerCase();
      let newResources: ContentItem[] = [];
      
      // Check if we have predefined resources for this certification
      if (certKey.includes('aws')) {
        newResources = additionalResources.aws;
      } else if (certKey.includes('okta')) {
        newResources = additionalResources.okta;
      } else if (certKey.includes('azure')) {
        newResources = additionalResources.azure;
      }
      
      // If no predefined resources, generate generic ones based on search query
      if (newResources.length === 0) {
        const capitalizedSearch = searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1);
        newResources = [
          {
            id: `gen1-${Date.now()}`,
            title: `${capitalizedSearch} Certification Complete Guide`,
            source: 'youtube',
            description: `Comprehensive guide to passing the ${capitalizedSearch} certification exam.`,
            url: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(searchQuery + ' certification'),
            duration: '6h 20m',
            author: 'Tech Tutorials',
            date: new Date().toISOString().split('T')[0],
            rating: 4.5
          },
          {
            id: `gen2-${Date.now()}`,
            title: `${capitalizedSearch} Study Materials and Resources`,
            source: 'document',
            description: `Curated study materials for ${capitalizedSearch} certification preparation.`,
            url: 'https://www.google.com/search?q=' + encodeURIComponent(searchQuery + ' certification study guide'),
            author: 'Certification Guides',
            date: new Date().toISOString().split('T')[0],
            rating: 4.3
          },
          {
            id: `gen3-${Date.now()}`,
            title: `${capitalizedSearch} Certification Exam Tips`,
            source: 'forum',
            description: `Community discussion on how to pass the ${capitalizedSearch} certification exam.`,
            url: 'https://www.reddit.com/search/?q=' + encodeURIComponent(searchQuery + ' certification'),
            author: 'r/certifications',
            date: new Date().toISOString().split('T')[0],
            rating: 4.2
          }
        ];
      }
      
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
    isSearching,
    searchedCertification,
    filteredContent,
    handleSearchForCertification,
    handleOpenResource
  };
};
