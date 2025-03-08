
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CertificationSearch from '@/components/certification/CertificationSearch';
import PopularCertifications from '@/components/certification/PopularCertifications';
import { validCertifications, certificationNames, popularCertifications } from '@/data/certificationData';
import { getSimilarityCertifications } from '@/utils/certificationUtils';

const CertificationPathwayPage: React.FC = () => {
  const [certificationQuery, setCertificationQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const suggestions = useMemo(() => {
    return getSimilarityCertifications(certificationQuery, validCertifications, certificationNames);
  }, [certificationQuery]);

  const handleCertificationSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!certificationQuery.trim()) {
      toast({
        title: "Input required",
        description: "Please enter a certification to explore",
        variant: "destructive"
      });
      return;
    }
    
    const certificationId = certificationQuery.toLowerCase().replace(/\s+/g, '-');
    
    const isValidCertification = validCertifications.some(cert => 
      certificationId.includes(cert) || cert.includes(certificationId)
    );
    
    if (isValidCertification) {
      navigate(`/certification/${certificationId}`);
    } else {
      if (suggestions.length > 0) {
        setShowSuggestions(true);
        toast({
          title: "Did you mean...",
          description: "We found similar certifications. Click on a suggestion below or try a different search.",
          variant: "default"
        });
      } else {
        toast({
          title: "Certification not found",
          description: "This certification isn't in our database yet. Please try another one or select from popular certifications below.",
          variant: "destructive"
        });
      }
    }
  };

  const handleSelectCertification = (certificationId: string) => {
    navigate(`/certification/${certificationId}`);
  };

  const handleSuggestionClick = (certId: string) => {
    const certName = certificationNames[certId] || certId;
    setCertificationQuery(certName);
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
            <CardDescription>Search for any IT certification to explore its learning path</CardDescription>
          </CardHeader>
          <CardContent>
            <CertificationSearch
              certificationQuery={certificationQuery}
              setCertificationQuery={setCertificationQuery}
              validCertifications={validCertifications}
              certificationNames={certificationNames}
              suggestions={suggestions}
              showSuggestions={showSuggestions}
              setShowSuggestions={setShowSuggestions}
              handleCertificationSearch={handleCertificationSearch}
              handleSuggestionClick={handleSuggestionClick}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Popular Certifications</CardTitle>
            <CardDescription>Explore commonly pursued IT certifications</CardDescription>
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
