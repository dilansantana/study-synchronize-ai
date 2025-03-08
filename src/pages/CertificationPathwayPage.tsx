
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Search, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CertificationSearch from '@/components/certification/CertificationSearch';
import PopularCertifications from '@/components/certification/PopularCertifications';
import { validCertifications, certificationNames, popularCertifications } from '@/data/certificationData';
import { getSimilarityCertifications, searchCertificationsOnline } from '@/utils/certificationUtils';

const CertificationPathwayPage: React.FC = () => {
  const [certificationQuery, setCertificationQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchingOnline, setIsSearchingOnline] = useState(false);
  const [onlineResults, setOnlineResults] = useState<any[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const suggestions = useMemo(() => {
    const localSuggestions = getSimilarityCertifications(certificationQuery, validCertifications, certificationNames);
    return localSuggestions;
  }, [certificationQuery]);

  const allSuggestions = useMemo(() => {
    return [...suggestions, ...onlineResults.map(result => result.id)];
  }, [suggestions, onlineResults]);

  const allCertificationNames = useMemo(() => {
    const online = Object.fromEntries(onlineResults.map(result => [result.id, result.name]));
    return { ...certificationNames, ...online };
  }, [onlineResults]);

  useEffect(() => {
    // Clear online results when the query changes
    setOnlineResults([]);
  }, [certificationQuery]);

  const handleCertificationSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!certificationQuery.trim()) {
      toast({
        title: "Input required",
        description: "Please enter a certification to explore",
        variant: "destructive"
      });
      return;
    }
    
    // Check if the search query matches any known certification directly
    const matchingCertId = validCertifications.find(certId => {
      const certName = certificationNames[certId] || certId;
      return certName.toLowerCase() === certificationQuery.toLowerCase() || 
             certId.toLowerCase() === certificationQuery.toLowerCase();
    });
    
    if (matchingCertId) {
      // Direct match found, navigate to that certification
      console.log("Direct match found:", matchingCertId);
      navigate(`/certification/${matchingCertId}`);
      return;
    } 
    
    if (suggestions.length > 0) {
      // If we have suggestions, navigate to the first one
      console.log("Using first suggestion:", suggestions[0]);
      navigate(`/certification/${suggestions[0]}`);
      return;
    }
    
    // No matches and no suggestions - search online
    setIsSearchingOnline(true);
    try {
      toast({
        title: "Searching online",
        description: "Looking for certifications that match your search...",
      });
      
      const results = await searchCertificationsOnline(certificationQuery);
      setOnlineResults(results);
      
      if (results.length > 0) {
        toast({
          title: "Online results found",
          description: `Found ${results.length} certification(s) from online sources.`,
        });
        
        // Navigate to the first online result
        navigate(`/certification/${results[0].id}`);
      } else {
        toast({
          title: "Certification not found",
          description: "We couldn't find this certification in our database or online. Please try another search.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error searching online:", error);
      toast({
        title: "Search error",
        description: "An error occurred while searching online. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearchingOnline(false);
    }
  };

  const handleSelectCertification = (certificationId: string) => {
    navigate(`/certification/${certificationId}`);
  };

  const handleSuggestionClick = (certId: string) => {
    console.log("Suggestion clicked:", certId);
    setCertificationQuery(allCertificationNames[certId] || certId);
    setShowSuggestions(false);
    navigate(`/certification/${certId}`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Award className="h-7 w-7 text-primary" />
            Certification Pathway Explorer
          </h1>
          <p className="text-muted-foreground mt-1">
            Find resources and learning paths for any IT certification
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Find Your Certification</CardTitle>
            <CardDescription>
              Search for any IT certification by name, vendor, or abbreviation - we'll search the internet if it's not in our database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CertificationSearch
              certificationQuery={certificationQuery}
              setCertificationQuery={setCertificationQuery}
              validCertifications={validCertifications}
              certificationNames={allCertificationNames}
              suggestions={allSuggestions}
              showSuggestions={showSuggestions}
              setShowSuggestions={setShowSuggestions}
              handleCertificationSearch={handleCertificationSearch}
              handleSuggestionClick={handleSuggestionClick}
              isSearchingOnline={isSearchingOnline}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Popular Certifications</CardTitle>
              <CardDescription>Explore commonly pursued IT certifications</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <PopularCertifications 
              certifications={popularCertifications}
              onSelect={handleSelectCertification}
            />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CertificationPathwayPage;
