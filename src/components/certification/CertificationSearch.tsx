
import React, { useState, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getSimilarityCertifications } from '@/utils/certificationUtils';

interface CertificationSearchProps {
  certificationQuery: string;
  setCertificationQuery: (query: string) => void;
  validCertifications: string[];
  certificationNames: Record<string, string>;
  suggestions: string[];
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  handleCertificationSearch: (e: React.FormEvent) => void;
  handleSuggestionClick: (certId: string) => void;
}

const CertificationSearch: React.FC<CertificationSearchProps> = ({
  certificationQuery,
  setCertificationQuery,
  validCertifications,
  certificationNames,
  suggestions,
  showSuggestions,
  setShowSuggestions,
  handleCertificationSearch,
  handleSuggestionClick
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCertificationQuery(value);
    
    // Show suggestions when typing at least 2 characters
    if (value.length >= 2) {
      const matchingSuggestions = getSimilarityCertifications(
        value, 
        validCertifications,
        certificationNames
      );
      
      setShowSuggestions(matchingSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  return (
    <form onSubmit={handleCertificationSearch} className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Enter a certification name (e.g., CompTIA Security+, CISSP, AWS, Okta Professional)..."
          className="pl-10"
          value={certificationQuery}
          onChange={handleInputChange}
          onFocus={() => {
            if (certificationQuery.length >= 2) {
              const matchingSuggestions = getSimilarityCertifications(
                certificationQuery, 
                validCertifications, 
                certificationNames
              );
              setShowSuggestions(matchingSuggestions.length > 0);
            }
          }}
          onBlur={() => {
            // Delay hiding suggestions to allow clicking on them
            setTimeout(() => setShowSuggestions(false), 200);
          }}
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-background border border-input rounded-md shadow-md">
            <ul className="py-1">
              {suggestions.map((certId) => (
                <li 
                  key={certId}
                  className="px-3 py-2 hover:bg-muted cursor-pointer text-sm"
                  onClick={() => handleSuggestionClick(certId)}
                  onMouseDown={(e) => e.preventDefault()} // Prevent blur from hiding suggestion
                >
                  {certificationNames[certId] || certId}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Button type="submit">Explore</Button>
    </form>
  );
};

export default CertificationSearch;
