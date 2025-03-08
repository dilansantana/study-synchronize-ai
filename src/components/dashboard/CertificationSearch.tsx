
import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import AnimatedTransition from '../AnimatedTransition';
import { useToast } from "@/hooks/use-toast";

interface CertificationSearchProps {
  addCertification: (name: string) => void;
  recordActivity: (activity: string) => void;
}

const CertificationSearch: React.FC<CertificationSearchProps> = ({ 
  addCertification,
  recordActivity
}) => {
  const [certificationQuery, setCertificationQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleGatherResources = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!certificationQuery.trim()) {
      toast({
        title: "Input required",
        description: "Please enter a certification to search for",
        variant: "destructive"
      });
      return;
    }
    
    setIsSearching(true);
    
    // Simulate an API call to gather resources
    setTimeout(() => {
      setIsSearching(false);
      
      // Add certification to user progress
      addCertification(certificationQuery);
      
      toast({
        title: "Resources gathered",
        description: `We've started gathering resources for ${certificationQuery}. Check the Learning page for updates.`,
      });
      
      // Reset the input after searching
      setCertificationQuery('');
      
      // Record this activity
      recordActivity(`Started gathering resources for ${certificationQuery}`);
    }, 2000);
  };

  return (
    <AnimatedTransition animation="scale" delay={150} className="rounded-lg border bg-card shadow-sm p-6">
      <h3 className="text-lg font-medium mb-4">Search for Certification Resources</h3>
      <form onSubmit={handleGatherResources} className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            className="h-10 w-full rounded-md border border-input pl-10 pr-4 py-2 bg-transparent text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Enter certification (e.g., CompTIA A+, CCNA, Security+)"
            value={certificationQuery}
            onChange={(e) => setCertificationQuery(e.target.value)}
            disabled={isSearching}
          />
        </div>
        <button 
          type="submit" 
          className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:pointer-events-none"
          disabled={isSearching}
        >
          {isSearching ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Gathering
            </>
          ) : (
            "Gather Resources"
          )}
        </button>
      </form>
      <p className="text-xs text-muted-foreground mt-2">
        Our AI will gather relevant videos, articles, flashcards, and practice materials for your certification.
      </p>
    </AnimatedTransition>
  );
};

export default CertificationSearch;
