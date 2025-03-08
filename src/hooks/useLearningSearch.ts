
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
      } else if (certKey.includes('comptia') || certKey.includes('security+') || certKey.includes('a+') || certKey.includes('network+')) {
        // Add CompTIA specific resources
        const examType = certKey.includes('security') ? 'Security+' : 
                        certKey.includes('network') ? 'Network+' : 
                        certKey.includes('a+') ? 'A+' : 'CompTIA';
        
        newResources = [
          {
            id: `comptia1-${Date.now()}`,
            title: `${examType} Complete Course`,
            source: 'youtube',
            description: `Full course covering all ${examType} exam objectives with practice questions.`,
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(examType + ' full course')}`,
            duration: '11h 30m',
            author: 'Professor Messer',
            date: new Date().toISOString().split('T')[0],
            rating: 4.9
          },
          {
            id: `comptia2-${Date.now()}`,
            title: `${examType} Official Study Guide`,
            source: 'document',
            description: `CompTIA's official study materials for the ${examType} certification.`,
            url: `https://www.comptia.org/training/books`,
            author: 'CompTIA',
            date: new Date().toISOString().split('T')[0],
            rating: 4.8
          },
          {
            id: `comptia3-${Date.now()}`,
            title: `${examType} Practice Tests`,
            source: 'document',
            description: `Practice exams with detailed explanations for each question.`,
            url: `https://www.google.com/search?q=${encodeURIComponent(examType + ' practice tests')}`,
            author: 'Various',
            date: new Date().toISOString().split('T')[0],
            rating: 4.7
          }
        ];
      } else if (certKey.includes('cisco') || certKey.includes('ccna')) {
        // Add Cisco specific resources
        newResources = [
          {
            id: `cisco1-${Date.now()}`,
            title: `CCNA Complete Course 2023`,
            source: 'youtube',
            description: `Comprehensive CCNA course covering all exam topics with practical demonstrations.`,
            url: 'https://www.youtube.com/results?search_query=ccna+complete+course',
            duration: '15h 45m',
            author: 'Jeremy IT Lab',
            date: new Date().toISOString().split('T')[0],
            rating: 4.9
          },
          {
            id: `cisco2-${Date.now()}`,
            title: `Cisco CCNA Official Cert Guide`,
            source: 'document',
            description: `Official certification guide with exam preparation materials.`,
            url: 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html',
            author: 'Cisco Press',
            date: new Date().toISOString().split('T')[0],
            rating: 4.8
          },
          {
            id: `cisco3-${Date.now()}`,
            title: `CCNA Packet Tracer Labs`,
            source: 'document',
            description: `Hands-on lab exercises using Cisco Packet Tracer.`,
            url: 'https://www.google.com/search?q=ccna+packet+tracer+labs',
            author: 'Various',
            date: new Date().toISOString().split('T')[0],
            rating: 4.7
          }
        ];
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
          },
          {
            id: `gen4-${Date.now()}`,
            title: `${capitalizedSearch} Practice Exams`,
            source: 'document',
            description: `Practice tests with detailed explanations to prepare for the ${capitalizedSearch} exam.`,
            url: 'https://www.google.com/search?q=' + encodeURIComponent(searchQuery + ' practice exams'),
            author: 'Test Prep',
            date: new Date().toISOString().split('T')[0],
            rating: 4.6
          },
          {
            id: `gen5-${Date.now()}`,
            title: `${capitalizedSearch} Certification Bootcamp`,
            source: 'youtube',
            description: `Intensive bootcamp-style training for ${capitalizedSearch} certification.`,
            url: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(searchQuery + ' certification bootcamp'),
            duration: '8h 15m',
            author: 'Certification Academy',
            date: new Date().toISOString().split('T')[0],
            rating: 4.7
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

  const handleCreateStudyPlan = (certification: string) => {
    toast({
      title: "Create Study Plan",
      description: `Switching to Study Plan Generator for ${certification}`,
    });
    
    // Clear existing search and set the certification name
    setSearchQuery(certification);
    
    // The StudyPlanGenerator component will handle the actual plan creation
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
    handleOpenResource,
    handleCreateStudyPlan
  };
};
