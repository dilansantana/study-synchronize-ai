
import React, { ReactNode } from 'react';
import { Search } from 'lucide-react';

interface EmptyResultsProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
}

export const EmptyResults: React.FC<EmptyResultsProps> = ({ 
  title = "No resources found", 
  description = "Try adjusting your search or filter to find what you're looking for.",
  icon = <Search className="h-6 w-6 text-muted-foreground" />
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-secondary p-3">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-medium">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
};
