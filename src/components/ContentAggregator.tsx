
import React from 'react';
import AnimatedTransition from './AnimatedTransition';
import { SearchBar } from './learning/SearchBar';
import { ResourceFilters } from './learning/ResourceFilters';
import { ResourceList } from './learning/ResourceList';
import { useLearningSearch } from '@/hooks/useLearningSearch';

const ContentAggregator: React.FC = () => {
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

  return (
    <div className="space-y-6">
      <AnimatedTransition animation="fade" className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Learning Resources</h2>
        <p className="text-muted-foreground">
          AI-curated educational content from various sources
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
          <p className="text-sm text-muted-foreground mt-1">Browse the curated resources below or refine your search.</p>
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
