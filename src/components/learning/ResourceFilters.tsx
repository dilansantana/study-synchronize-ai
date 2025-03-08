
import React from 'react';
import { Filter, Globe, Youtube, FileText, MessageSquare, BookOpenCheck, ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    { id: 'quizlet', label: 'Flashcards', icon: <BookOpenCheck className="w-4 h-4" /> },
  ];

  // Find the currently active filter
  const activeFilterObj = activeFilter ? filters.find(f => f.id === activeFilter) : filters[0];

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-md bg-secondary px-2.5 py-1.5 text-sm font-medium text-foreground">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter:</span>
            <span className="flex items-center gap-1.5">
              {activeFilterObj?.icon}
              <span>{activeFilterObj?.label || 'All Sources'}</span>
            </span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {filters.map(filter => (
            <DropdownMenuItem
              key={filter.id}
              onClick={() => setActiveFilter(filter.id === 'all' ? null : filter.id)}
              className={cn(
                "flex items-center gap-2",
                activeFilter === filter.id && "bg-primary/10"
              )}
            >
              {filter.icon}
              <span>{filter.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
