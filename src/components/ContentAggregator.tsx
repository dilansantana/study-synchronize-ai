import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AnimatedTransition from './AnimatedTransition';
import { SearchBar } from './learning/SearchBar';
import { ResourceFilters } from './learning/ResourceFilters';
import { ResourceList } from './learning/ResourceList';
import { useLearningSearch } from '@/hooks/useLearningSearch';
import { UltimateGuideGenerator } from './learning/UltimateGuideGenerator';
import { ContentItem } from '@/data/learningResources';
import { Button } from './ui/button';
import { PlusCircle, X } from 'lucide-react';

interface LocationState {
  certificationName?: string;
}

const ContentAggregator: React.FC = () => {
  const location = useLocation();
  const locationState = location.state as LocationState;
  const [showGuideGenerator, setShowGuideGenerator] = useState(false);
  const [selectedResources, setSelectedResources] = useState<ContentItem[]>([]);
  
  const {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    isSearching,
    searchedCertification,
    filteredContent,
    handleSearchForCertification,
    handleOpenResource
  } = useLearningSearch();
  
  // Initialize with certification name if provided via navigation
  useEffect(() => {
    if (locationState?.certificationName) {
      setSearchQuery(locationState.certificationName);
    }
  }, [locationState?.certificationName, setSearchQuery]);

  const handleExtractResource = (item: ContentItem) => {
    if (!selectedResources.some(resource => resource.id === item.id)) {
      setSelectedResources(prev => [...prev, item]);
      if (!showGuideGenerator) {
        setShowGuideGenerator(true);
      }
    }
  };

  const handleRemoveResource = (id: string) => {
    setSelectedResources(prev => prev.filter(resource => resource.id !== id));
  };

  return (
    <div className="space-y-6">
      <AnimatedTransition animation="fade" className="space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">Learning Resources</h2>
          <Button 
            onClick={() => setShowGuideGenerator(!showGuideGenerator)}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            {showGuideGenerator ? <X className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
            {showGuideGenerator ? "Hide Generator" : "Create Ultimate Guide"}
          </Button>
        </div>
        <p className="text-muted-foreground">
          AI-curated educational content from various sources to help you prepare for your certification
        </p>
      </AnimatedTransition>

      <AnimatedTransition animation="slide" delay={100} className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchForCertification={handleSearchForCertification}
          isSearching={isSearching}
        />
        
        <ResourceFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </AnimatedTransition>

      {searchedCertification && (
        <AnimatedTransition animation="fade" className="p-4 rounded-md bg-secondary">
          <p className="font-medium">Showing resources for: <span className="text-primary">{searchedCertification}</span></p>
          <p className="text-sm text-muted-foreground mt-1">Browse the curated resources below or create a study plan to prepare effectively.</p>
        </AnimatedTransition>
      )}

      {showGuideGenerator && (
        <AnimatedTransition animation="fade" className="space-y-4">
          {selectedResources.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 border rounded-md bg-secondary/20">
              <p className="w-full text-sm font-medium mb-2">Selected Resources:</p>
              {selectedResources.map(resource => (
                <div key={resource.id} className="flex items-center gap-1 text-xs bg-secondary px-2 py-1 rounded-full">
                  {resource.title.substring(0, 20)}{resource.title.length > 20 ? '...' : ''}
                  <button onClick={() => handleRemoveResource(resource.id)} className="ml-1 text-muted-foreground hover:text-foreground">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <UltimateGuideGenerator 
            availableResources={selectedResources.length ? selectedResources : filteredContent} 
          />
        </AnimatedTransition>
      )}

      <ResourceList
        filteredContent={filteredContent}
        handleOpenResource={handleOpenResource}
        onExtractResource={handleExtractResource}
      />
    </div>
  );
};

export default ContentAggregator;
