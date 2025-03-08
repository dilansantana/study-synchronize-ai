
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Award, Search } from 'lucide-react';

const CertificationPathwayPage: React.FC = () => {
  const [certificationQuery, setCertificationQuery] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  // Define a list of valid certification IDs
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
    'ceh'
  ];

  const popularCertifications = [
    { id: 'comptia-security-plus', name: 'CompTIA Security+', category: 'Security' },
    { id: 'cisco-ccna', name: 'Cisco CCNA', category: 'Networking' },
    { id: 'aws-solutions-architect', name: 'AWS Solutions Architect', category: 'Cloud' },
    { id: 'microsoft-azure-administrator', name: 'Microsoft Azure Administrator', category: 'Cloud' },
    { id: 'comptia-network-plus', name: 'CompTIA Network+', category: 'Networking' },
    { id: 'pmp', name: 'Project Management Professional (PMP)', category: 'Management' },
  ];

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
    
    // Convert the query to a URL-friendly format
    const certificationId = certificationQuery.toLowerCase().replace(/\s+/g, '-');
    
    // Check if this is a valid certification
    const isValidCertification = validCertifications.some(cert => 
      certificationId.includes(cert) || cert.includes(certificationId)
    );
    
    if (isValidCertification) {
      navigate(`/certification/${certificationId}`);
    } else {
      toast({
        title: "Certification not found",
        description: "This certification isn't in our database yet. Please try another one or select from popular certifications below.",
        variant: "destructive"
      });
    }
  };

  const handleSelectCertification = (certificationId: string) => {
    navigate(`/certification/${certificationId}`);
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
                  onChange={(e) => setCertificationQuery(e.target.value)}
                />
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
