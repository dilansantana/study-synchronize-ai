
import React from 'react';
import { Filter, Globe, Youtube, FileText, MessageSquare } from 'lucide-react';
import { cn } from "@/lib/utils";

export interface FilterOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface ResourceFiltersProps {
  activeFilter: string | null;
  setActiveFilter: (filter: string | null) => void;
}

export const ResourceFilters: React.FC<ResourceFiltersProps> = ({ activeFilter, setActiveFilter }) => {
  const filters: FilterOption[] = [
    { id: 'all', label: 'All Sources', icon: <Globe className="w-4 h-4" /> },
    { id: 'youtube', label: 'Videos', icon: <Youtube className="w-4 h-4" /> },
    { id: 'article', label: 'Articles', icon: <FileText className="w-4 h-4" /> },
    { id: 'forum', label: 'Forums', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'document', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
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
  );
};
