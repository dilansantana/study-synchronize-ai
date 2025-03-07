
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchForCertification: (e: React.FormEvent) => void;
  isSearching: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearchForCertification,
  isSearching
}) => {
  return (
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
  );
};
