import React, { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Award, Search } from 'lucide-react';

const CertificationPathwayPage: React.FC = () => {
  const [certificationQuery, setCertificationQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const validCertifications = [
    'comptia-security-plus',
    'cisco-ccna',
    'aws-solutions-architect',
    'microsoft-azure-administrator',
    'comptia-network-plus',
    'pmp',
    'comptia-a-plus',
    'splunk',
    'cissp',
    'ceh',
    'okta-certified-professional',
    'okta-certified-administrator'
  ];

  const certificationNames = {
    'comptia-security-plus': 'CompTIA Security+',
    'cisco-ccna': 'Cisco CCNA',
    'aws-solutions-architect': 'AWS Solutions Architect',
    'microsoft-azure-administrator': 'Microsoft Azure Administrator',
    'comptia-network-plus': 'CompTIA Network+',
    'pmp': 'Project Management Professional (PMP)',
    'comptia-a-plus': 'CompTIA A+',
    'splunk': 'Splunk Certification',
    'cissp': 'CISSP (Certified Information Systems Security Professional)',
    'ceh': 'Certified Ethical Hacker (CEH)',
    'okta-certified-professional': 'Okta Certified Professional',
    'okta-certified-administrator': 'Okta Certified Administrator'
  };

  const popularCertifications = [
    { id: 'comptia-security-plus', name: 'CompTIA Security+', category: 'Security' },
    { id: 'cisco-ccna', name: 'Cisco CCNA', category: 'Networking' },
    { id: 'aws-solutions-architect', name: 'AWS Solutions Architect', category: 'Cloud' },
    { id: 'microsoft-azure-administrator', name: 'Microsoft Azure Administrator', category: 'Cloud' },
    { id: 'comptia-network-plus', name: 'CompTIA Network+', category: 'Networking' },
    { id: 'pmp', name: 'Project Management Professional (PMP)', category: 'Management' },
  ];

  const getSimilarityCertifications = (query: string): string[] => {
    if (!query || query.length < 2) return [];
    
    const queryLower = query.toLowerCase();
    const results: [string, number][] = [];
    
    for (const certId of validCertifications) {
      const certName = certificationNames[certId as keyof typeof certificationNames] || certId;
      const nameLower = certName.toLowerCase();
      
      if (nameLower.includes(queryLower)) {
        results.push([certId, 3]);
        continue;
      }
      
      const queryWords = queryLower.split(/\s+/);
      const nameWords = nameLower.split(/\s+/);
      let matchScore = 0;
      
      for (const queryWord of queryWords) {
        if (queryWord.length < 2) continue;
        
        for (const nameWord of nameWords) {
          if (nameWord.startsWith(queryWord) || queryWord.startsWith(nameWord)) {
            matchScore += 2;
          } 
          else if (nameWord.includes(queryWord.substring(0, 2))) {
            matchScore += 1;
          }
        }
      }
      
      if (matchScore > 0) {
        results.push([certId, matchScore]);
      }
    }
    
    return results
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(item => item[0]);
  };

  const suggestions = useMemo(() => {
    return getSimilarityCertifications(certificationQuery);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCertificationQuery(value);
    setShowSuggestions(value.length > 2 && suggestions.length > 0);
  };

  const handleSuggestionClick = (certId: string) => {
    const certName = certificationNames[certId as keyof typeof certificationNames] || certId;
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
            <form onSubmit={handleCertificationSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Enter a certification name (e.g., CompTIA Security+, CISSP, AWS)..."
                  className="pl-10"
                  value={certificationQuery}
                  onChange={handleInputChange}
                  onFocus={() => setShowSuggestions(certificationQuery.length > 2 && suggestions.length > 0)}
                  onBlur={() => {
                    setTimeout(() => setShowSuggestions(false), 200);
                  }}
                />
                {showSuggestions && (
                  <div className="absolute z-10 mt-1 w-full bg-background border border-input rounded-md shadow-md">
                    <ul className="py-1">
                      {suggestions.map((certId) => (
                        <li 
                          key={certId}
                          className="px-3 py-2 hover:bg-muted cursor-pointer text-sm"
                          onClick={() => handleSuggestionClick(certId)}
                        >
                          {certificationNames[certId as keyof typeof certificationNames] || certId}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <Button type="submit">Explore</Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Popular Certifications</CardTitle>
            <CardDescription>Explore commonly pursued IT certifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularCertifications.map(cert => (
                <Card key={cert.id} className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => handleSelectCertification(cert.id)}>
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{cert.name}</h3>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{cert.category}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Click to explore</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CertificationPathwayPage;
