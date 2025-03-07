
import React from 'react';
import { Search } from 'lucide-react';

export const EmptyResults: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-secondary p-3">
        <Search className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-medium">No resources found</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Try adjusting your search or filter to find what you're looking for.
      </p>
    </div>
  );
};
