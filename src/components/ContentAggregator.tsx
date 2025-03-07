
import React, { useState } from 'react';
import { Search, Youtube, FileText, Globe, MessageSquare, Filter } from 'lucide-react';
import { cn } from "@/lib/utils";
import AnimatedTransition from './AnimatedTransition';
import { useToast } from "@/hooks/use-toast";

interface ContentItem {
  id: string;
  title: string;
  source: 'youtube' | 'article' | 'forum' | 'document';
  description: string;
  url: string;
  duration?: string;
  author?: string;
  date?: string;
  rating?: number;
}

const ContentAggregator: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchedCertification, setSearchedCertification] = useState('');
  const { toast } = useToast();
  
  // Mock content items
  const initialContentItems: ContentItem[] = [
    {
      id: '1',
      title: 'CompTIA Security+ Full Course',
      source: 'youtube',
      description: 'A comprehensive guide to Security+ certification covering all exam objectives.',
      url: 'https://www.youtube.com/watch?v=9NE33fpQuw8',
      duration: '8h 45m',
      author: 'Professor Messer',
      date: '2023-01-15',
      rating: 4.8
    },
    {
      id: '2',
      title: 'Network+ Study Guide: OSI Model Explained',
      source: 'article',
      description: 'Detailed breakdown of the OSI Model with diagrams and examples.',
      url: 'https://www.comptia.org/training/books/network-n10-008-study-guide',
      author: 'TechExams.net',
      date: '2023-03-22',
      rating: 4.5
    },
    {
      id: '3',
      title: 'How to pass CCNA on first attempt? Tips and resources',
      source: 'forum',
      description: 'Community discussion with valuable tips and recommended resources.',
      url: 'https://www.reddit.com/r/ccna/',
      author: 'r/ccna',
      date: '2023-04-10',
      rating: 4.2
    },
    {
      id: '4',
      title: 'CompTIA A+ 220-1101 & 220-1102 Official Study Guide',
      source: 'document',
      description: 'Official study material with practice questions and explanations.',
      url: 'https://www.comptia.org/training/books/a-220-1101-220-1102-study-guide',
      author: 'CompTIA',
      date: '2023-02-05',
      rating: 4.7
    },
    {
      id: '5',
      title: 'Security+ SY0-601 - Cryptography Concepts',
      source: 'youtube',
      description: 'Learn about symmetric and asymmetric encryption methods.',
      url: 'https://www.youtube.com/watch?v=GZ1bLT_uvYM',
      duration: '45m',
      author: 'IT Dojo',
      date: '2023-05-18',
      rating: 4.6
    }
  ];
  
  // Additional resources for different certifications
  const additionalResources = {
    aws: [
      {
        id: 'aws1',
        title: 'AWS Certified Solutions Architect Course',
        source: 'youtube',
        description: 'Comprehensive course covering all AWS Solutions Architect exam objectives.',
        url: 'https://www.youtube.com/watch?v=Ia-UEYYR44s',
        duration: '10h 15m',
        author: 'freeCodeCamp.org',
        date: '2023-06-12',
        rating: 4.9
      },
      {
        id: 'aws2',
        title: 'AWS Certified Cloud Practitioner Study Guide',
        source: 'document',
        description: 'Official study material with practice questions for AWS Cloud Practitioner.',
        url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
        author: 'Amazon Web Services',
        date: '2023-07-20',
        rating: 4.7
      },
      {
        id: 'aws3',
        title: 'How I passed all 3 AWS associate certs in 3 months',
        source: 'forum',
        description: 'Personal experience and study strategy for AWS certifications.',
        url: 'https://www.reddit.com/r/AWSCertifications/',
        author: 'r/AWSCertifications',
        date: '2023-05-05',
        rating: 4.5
      }
    ],
    okta: [
      {
        id: 'okta1',
        title: 'Okta Certified Professional Exam Prep',
        source: 'youtube',
        description: 'Preparation course for the Okta Certified Professional exam.',
        url: 'https://www.youtube.com/watch?v=8jU_SrkVX8E',
        duration: '4h 30m',
        author: 'Okta Developer',
        date: '2023-08-10',
        rating: 4.6
      },
      {
        id: 'okta2',
        title: 'Okta Identity and Access Management Guide',
        source: 'document',
        description: 'Comprehensive guide to Okta IAM concepts and implementation.',
        url: 'https://www.okta.com/resources/whitepaper/identity-and-access-management-guide/',
        author: 'Okta Inc.',
        date: '2023-04-15',
        rating: 4.8
      }
    ],
    azure: [
      {
        id: 'azure1',
        title: 'Microsoft Azure AZ-900 Certification Course',
        source: 'youtube',
        description: 'Full course for Azure Fundamentals certification.',
        url: 'https://www.youtube.com/watch?v=NKEFWyqJ5XA',
        duration: '3h 45m',
        author: 'Microsoft Learn',
        date: '2023-09-05',
        rating: 4.9
      },
      {
        id: 'azure2',
        title: 'Azure Administrator Study Notes AZ-104',
        source: 'article',
        description: 'Detailed study notes for the Azure Administrator certification.',
        url: 'https://docs.microsoft.com/en-us/learn/certifications/azure-administrator/',
        author: 'Microsoft',
        date: '2023-07-14',
        rating: 4.7
      }
    ]
  };

  const [contentItems, setContentItems] = useState<ContentItem[]>(initialContentItems);

  const filters = [
    { id: 'all', label: 'All Sources', icon: <Globe className="w-4 h-4" /> },
    { id: 'youtube', label: 'Videos', icon: <Youtube className="w-4 h-4" /> },
    { id: 'article', label: 'Articles', icon: <FileText className="w-4 h-4" /> },
    { id: 'forum', label: 'Forums', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'document', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
  ];

  const filteredContent = contentItems.filter(item => {
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by content type
    const matchesFilter = activeFilter === null || activeFilter === 'all' || item.source === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

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

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'youtube':
        return <Youtube className="w-4 h-4 text-red-500" />;
      case 'article':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'forum':
        return <MessageSquare className="w-4 h-4 text-green-500" />;
      case 'document':
        return <FileText className="w-4 h-4 text-amber-500" />;
      default:
        return <Globe className="w-4 h-4 text-gray-500" />;
    }
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

  return (
    <div className="space-y-6">
      <AnimatedTransition animation="fade" className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Learning Resources</h2>
        <p className="text-muted-foreground">
          AI-curated educational content from various sources
        </p>
      </AnimatedTransition>

      <AnimatedTransition animation="slide" delay={100} className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <form onSubmit={handleSearchForCertification} className="flex">
            <input
              type="text"
              placeholder="Search for certification resources (e.g., AWS, Okta, Azure)..."
              className="h-10 w-full rounded-md border border-input bg-transparent pl-10 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isSearching}
            />
            <button 
              type="submit" 
              className="ml-2 h-10 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium disabled:opacity-50 disabled:pointer-events-none"
              disabled={isSearching}
            >
              {isSearching ? "Searching..." : "Find Resources"}
            </button>
          </form>
        </div>
        
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
          <div className="flex items-center space-x-1 rounded-md bg-secondary px-2.5 py-1.5 text-sm font-medium text-foreground">
            <Filter className="mr-1 h-4 w-4" />
            <span>Filters:</span>
          </div>
          
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(activeFilter === filter.id ? null : filter.id)}
              className={cn(
                "flex items-center space-x-1 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors",
                activeFilter === filter.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              )}
            >
              {filter.icon}
              <span>{filter.label}</span>
            </button>
          ))}
        </div>
      </AnimatedTransition>

      {searchedCertification && (
        <AnimatedTransition animation="fade" className="p-4 rounded-md bg-secondary">
          <p className="font-medium">Showing resources for: <span className="text-primary">{searchedCertification}</span></p>
          <p className="text-sm text-muted-foreground mt-1">Browse the curated resources below or refine your search.</p>
        </AnimatedTransition>
      )}

      <div className="space-y-4">
        {filteredContent.length > 0 ? (
          filteredContent.map((item, index) => (
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
                    <div className="mt-1 sm:mt-0 flex items-center text-sm text-muted-foreground">
                      {item.duration && (
                        <span className="flex items-center mr-3">
                          <Clock className="mr-1 h-3 w-3" />
                          {item.duration}
                        </span>
                      )}
                      <div className="flex items-center">
                        <span className="flex items-center">
                          <Star className="mr-1 h-3 w-3 text-yellow-400" />
                          {item.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      <span>{item.author}</span>
                      {item.date && <span className="mx-1">•</span>}
                      {item.date && <span>{formatDate(item.date)}</span>}
                    </div>
                    
                    <button 
                      onClick={() => handleOpenResource(item)}
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline hover:bg-primary/10 px-2 py-1 rounded-md transition-colors"
                    >
                      View Resource
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedTransition>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-secondary p-3">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No resources found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
};

const Clock = ({ className }: { className?: string }) => {
  return <div className={className}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>;
};

const Star = ({ className }: { className?: string }) => {
  return <div className={className}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>;
};

const ArrowRight = ({ className }: { className?: string }) => {
  return <div className={className}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></div>;
};

export default ContentAggregator;
