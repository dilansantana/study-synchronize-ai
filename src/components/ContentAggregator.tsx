
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AnimatedTransition from './AnimatedTransition';
import { SearchBar } from './learning/SearchBar';
import { ResourceFilters } from './learning/ResourceFilters';
import { ResourceList } from './learning/ResourceList';
import { useLearningSearch } from '@/hooks/useLearningSearch';

interface LocationState {
  certificationName?: string;
}

const ContentAggregator: React.FC = () => {
  const location = useLocation();
  const locationState = location.state as LocationState;
  
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

  return (
    <div className="space-y-6">
      <AnimatedTransition animation="fade" className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Learning Resources</h2>
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

      <ResourceList
        filteredContent={filteredContent}
        handleOpenResource={handleOpenResource}
      />
    </div>
  );
};

export default ContentAggregator;
