
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResourceList } from '@/components/learning/ResourceList';
import { PersonalizedPath } from '@/components/learning/PersonalizedPath';
import { CertificationRoadmap } from '@/components/learning/CertificationRoadmap';
import { AIAssistant } from '@/components/learning/AIAssistant';
import { InteractiveFlashcards } from '@/components/learning/InteractiveFlashcards';
import { UltimateGuideGenerator } from '@/components/learning/UltimateGuideGenerator';
import { NotificationCenter } from '@/components/learning/NotificationCenter';
import { generateResourcesForCertification } from '@/utils/resourceGenerator';
import { useUserProgress } from '@/utils/progressUtils';
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, BarChart, CreditCard, Calendar, Shield, CheckCircle, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CertificationDetailsPage: React.FC = () => {
  const { certificationId } = useParams<{ certificationId: string }>();
  const { toast } = useToast();
  const { addCertification } = useUserProgress();
  const [activeTab, setActiveTab] = useState<string>("overview");
  
  // This would normally come from an API based on the certificationId
  const certificationName = certificationId?.includes('comptia') 
    ? 'CompTIA Security+' 
    : certificationId?.includes('ccna') 
    ? 'Cisco CCNA' 
    : certificationId || 'Certification';
  
  const resources = generateResourcesForCertification(certificationName);
  
  const handleEnroll = () => {
    addCertification(certificationName);
    
    toast({
      title: "Successfully enrolled!",
      description: `You've been enrolled in the ${certificationName} learning path.`,
      duration: 5000,
    });
  };
  
  const handleOpenResource = (resource: any) => {
    window.open(resource.url, '_blank');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="h-7 w-7 text-primary" />
              {certificationName}
            </h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive learning resources and study path
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
              <Award className="h-3.5 w-3.5 text-yellow-500" />
              Industry Recognized
            </Badge>
            <Button onClick={handleEnroll}>
              Enroll Now
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Duration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">60 - 90 days</p>
              <p className="text-sm text-muted-foreground">Recommended study period</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                Difficulty
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Intermediate</p>
              <p className="text-sm text-muted-foreground">Prior IT experience recommended</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Exam Cost
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">$350 USD</p>
              <p className="text-sm text-muted-foreground">Official certification exam fee</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="path">Learning Path</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {certificationName}</CardTitle>
                    <CardDescription>Overview and industry relevance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      {certificationName === 'CompTIA Security+' 
                        ? 'CompTIA Security+ is a global certification that validates the baseline skills necessary to perform core security functions and pursue an IT security career. It is the first security certification IT professionals should earn.'
                        : certificationName === 'Cisco CCNA'
                        ? 'The Cisco CCNA certification validates your skills and knowledge in network fundamentals, network access, IP connectivity, IP services, security fundamentals, and automation and programmability.'
                        : 'This certification validates your baseline skills and knowledge in the relevant domain and provides a solid foundation for an IT career.'}
                    </p>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Key Knowledge Areas:</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        {certificationName === 'CompTIA Security+' ? (
                          <>
                            <li>Threats, Attacks and Vulnerabilities</li>
                            <li>Technologies and Tools</li>
                            <li>Architecture and Design</li>
                            <li>Identity and Access Management</li>
                            <li>Risk Management</li>
                            <li>Cryptography and PKI</li>
                          </>
                        ) : certificationName === 'Cisco CCNA' ? (
                          <>
                            <li>Network Fundamentals</li>
                            <li>Network Access</li>
                            <li>IP Connectivity</li>
                            <li>IP Services</li>
                            <li>Security Fundamentals</li>
                            <li>Automation and Programmability</li>
                          </>
                        ) : (
                          <>
                            <li>Fundamental Concepts</li>
                            <li>Core Technologies</li>
                            <li>Security Best Practices</li>
                            <li>Practical Implementations</li>
                            <li>Troubleshooting Methodologies</li>
                          </>
                        )}
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Job Roles:</h3>
                      <div className="flex flex-wrap gap-2">
                        {certificationName === 'CompTIA Security+' ? (
                          <>
                            <Badge variant="secondary">Security Administrator</Badge>
                            <Badge variant="secondary">Security Specialist</Badge>
                            <Badge variant="secondary">Security Consultant</Badge>
                            <Badge variant="secondary">Systems Administrator</Badge>
                            <Badge variant="secondary">Network Administrator</Badge>
                            <Badge variant="secondary">Junior IT Auditor</Badge>
                          </>
                        ) : certificationName === 'Cisco CCNA' ? (
                          <>
                            <Badge variant="secondary">Network Administrator</Badge>
                            <Badge variant="secondary">Network Engineer</Badge>
                            <Badge variant="secondary">Network Specialist</Badge>
                            <Badge variant="secondary">Network Analyst</Badge>
                            <Badge variant="secondary">Systems Engineer</Badge>
                          </>
                        ) : (
                          <>
                            <Badge variant="secondary">IT Specialist</Badge>
                            <Badge variant="secondary">Systems Administrator</Badge>
                            <Badge variant="secondary">Network Engineer</Badge>
                            <Badge variant="secondary">Security Analyst</Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <CertificationRoadmap certificationName={certificationName} />
              </div>
              
              <div className="space-y-6">
                <NotificationCenter />
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Exam Information
                    </CardTitle>
                    <CardDescription>What to expect on test day</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold">Exam Details:</h3>
                      <p className="text-sm">
                        {certificationName === 'CompTIA Security+' 
                          ? 'Exam Code: SY0-601 | 90 questions | 90 minutes'
                          : certificationName === 'Cisco CCNA'
                          ? 'Exam Code: 200-301 | 100-120 questions | 120 minutes'
                          : 'Standard certification exam format with multiple-choice and performance-based questions'}
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold">Passing Score:</h3>
                      <p className="text-sm">
                        {certificationName === 'CompTIA Security+' 
                          ? '750 on a scale of 100-900'
                          : certificationName === 'Cisco CCNA'
                          ? '825 on a scale of 300-1000'
                          : 'Varies by exam, typically 70-80%'}
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold">Exam Format:</h3>
                      <p className="text-sm">Multiple choice and performance-based questions</p>
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold">Certification Validity:</h3>
                      <p className="text-sm">
                        {certificationName === 'CompTIA Security+' 
                          ? '3 years (renewable through continuing education)'
                          : certificationName === 'Cisco CCNA'
                          ? '3 years (renewable through examination)'
                          : 'Typically 2-3 years, renewable through continuing education or re-examination'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-6">
            <ResourceList 
              filteredContent={resources}
              handleOpenResource={handleOpenResource}
              onExtractResource={undefined}
            />
            
            <UltimateGuideGenerator availableResources={resources} />
          </TabsContent>
          
          <TabsContent value="path" className="space-y-6">
            <PersonalizedPath certificationName={certificationName} />
          </TabsContent>
          
          <TabsContent value="practice" className="space-y-6">
            <InteractiveFlashcards 
              title={`${certificationName} Flashcards`}
              description="Test your knowledge with interactive flashcards"
              certificationName={certificationName}
            />
          </TabsContent>
          
          <TabsContent value="assistant" className="space-y-6">
            <AIAssistant certificationContext={certificationName} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CertificationDetailsPage;
