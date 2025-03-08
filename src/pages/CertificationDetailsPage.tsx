
import React, { useState, useEffect } from 'react';
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

interface CertificationInfo {
  name: string;
  duration: string;
  difficulty: string;
  examCost: string;
  examCode: string;
  passingScore: string;
  validity: string;
}

const CertificationDetailsPage: React.FC = () => {
  const { certificationId } = useParams<{ certificationId: string }>();
  const { toast } = useToast();
  const { addCertification } = useUserProgress();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [certificationInfo, setCertificationInfo] = useState<CertificationInfo>({
    name: '',
    duration: '60 - 90 days',
    difficulty: 'Intermediate',
    examCost: '$350 USD',
    examCode: '',
    passingScore: '',
    validity: '3 years'
  });
  
  useEffect(() => {
    // Set certification details based on the certification ID
    if (certificationId) {
      let info: CertificationInfo = {
        name: formatCertificationName(certificationId),
        duration: '60 - 90 days',
        difficulty: 'Intermediate',
        examCost: '$350 USD',
        examCode: '',
        passingScore: '',
        validity: '3 years'
      };
      
      // Set specific details based on certification type
      if (certificationId.includes('comptia')) {
        if (certificationId.includes('security-plus')) {
          info = {
            ...info,
            name: 'CompTIA Security+',
            examCost: '$392 USD',
            examCode: 'SY0-601',
            passingScore: '750 on a scale of 100-900',
            validity: '3 years (renewable through continuing education)'
          };
        } else if (certificationId.includes('network-plus')) {
          info = {
            ...info,
            name: 'CompTIA Network+',
            examCost: '$358 USD',
            examCode: 'N10-008',
            passingScore: '720 on a scale of 100-900',
            validity: '3 years (renewable through continuing education)'
          };
        } else if (certificationId.includes('a-plus')) {
          info = {
            ...info,
            name: 'CompTIA A+',
            examCost: '$239 USD per exam (2 exams required)',
            examCode: '220-1101 & 220-1102',
            passingScore: '675/700 on a scale of 100-900',
            validity: '3 years (renewable through continuing education)'
          };
        }
      } else if (certificationId.includes('cisco') || certificationId.includes('ccna')) {
        info = {
          ...info,
          name: 'Cisco CCNA',
          examCost: '$300 USD',
          examCode: '200-301',
          passingScore: '825 on a scale of 300-1000',
          validity: '3 years (renewable through examination)'
        };
      } else if (certificationId.includes('aws')) {
        if (certificationId.includes('solutions-architect')) {
          info = {
            ...info,
            name: 'AWS Solutions Architect',
            examCost: '$150 USD (Associate) / $300 USD (Professional)',
            examCode: 'SAA-C03 (Associate) / SAP-C02 (Professional)',
            passingScore: 'Scaled score of 720 out of 1000',
            validity: '3 years (renewable through examination)'
          };
        } else {
          info = {
            ...info,
            name: 'AWS Certification',
            examCost: '$100-$300 USD (varies by level)',
            validity: '3 years (renewable through examination)'
          };
        }
      } else if (certificationId.includes('microsoft') || certificationId.includes('azure')) {
        info = {
          ...info,
          name: 'Microsoft Azure Administrator',
          examCost: '$165 USD',
          examCode: 'AZ-104',
          passingScore: '700 on a scale of 1-1000',
          validity: 'Does not expire'
        };
      } else if (certificationId.includes('pmp')) {
        info = {
          ...info,
          name: 'Project Management Professional (PMP)',
          examCost: '$405 USD (PMI member) / $555 USD (non-member)',
          examCode: 'PMP',
          passingScore: 'Performance-based (not a numerical score)',
          validity: '3 years (renewable through PDUs)'
        };
      } else if (certificationId.includes('splunk')) {
        info = {
          ...info,
          name: 'Splunk Certification',
          examCost: '$125-$300 USD (varies by level)',
          examCode: 'Varies by certification track',
          difficulty: 'Beginner to Advanced (depends on level)',
          passingScore: 'Typically 70-80%',
          validity: '3 years'
        };
      } else if (certificationId.includes('cissp')) {
        info = {
          ...info,
          name: 'CISSP (Certified Information Systems Security Professional)',
          examCost: '$749 USD',
          examCode: 'CISSP',
          difficulty: 'Advanced',
          passingScore: 'Scaled score of 700 out of 1000',
          validity: '3 years (renewable through CPEs)'
        };
      } else if (certificationId.includes('ceh')) {
        info = {
          ...info,
          name: 'Certified Ethical Hacker (CEH)',
          examCost: '$950-$1,199 USD',
          examCode: '312-50',
          difficulty: 'Intermediate to Advanced',
          passingScore: '70% or higher',
          validity: '3 years (renewable through ECE credits)'
        };
      }
      
      setCertificationInfo(info);
    }
  }, [certificationId]);
  
  const formatCertificationName = (id: string): string => {
    return id
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  const resources = generateResourcesForCertification(certificationInfo.name);
  
  const handleEnroll = () => {
    addCertification(certificationInfo.name);
    
    toast({
      title: "Successfully enrolled!",
      description: `You've been enrolled in the ${certificationInfo.name} learning path.`,
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
              {certificationInfo.name}
            </h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive learning resources and certification pathway
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
              <p className="text-2xl font-bold">{certificationInfo.duration}</p>
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
              <p className="text-2xl font-bold">{certificationInfo.difficulty}</p>
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
              <p className="text-2xl font-bold">{certificationInfo.examCost}</p>
              <p className="text-sm text-muted-foreground">Official certification exam fee</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="path">Learning Path</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {certificationInfo.name}</CardTitle>
                    <CardDescription>Overview and industry relevance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      {certificationInfo.name === 'CompTIA Security+' 
                        ? 'CompTIA Security+ is a global certification that validates the baseline skills necessary to perform core security functions and pursue an IT security career. It is the first security certification IT professionals should earn.'
                        : certificationInfo.name === 'Cisco CCNA'
                        ? 'The Cisco CCNA certification validates your skills and knowledge in network fundamentals, network access, IP connectivity, IP services, security fundamentals, and automation and programmability.'
                        : certificationInfo.name === 'Splunk Certification'
                        ? 'Splunk certifications validate your ability to use Splunk for data analysis, management, and security. These certifications range from core user to architect levels, and help professionals demonstrate proficiency with Splunk tools and technologies.'
                        : certificationInfo.name === 'CISSP'
                        ? 'CISSP is a globally recognized certification for information security professionals. It covers eight domains of cybersecurity knowledge and requires at least five years of cumulative, paid work experience in two or more of these domains.'
                        : certificationInfo.name === 'Certified Ethical Hacker'
                        ? 'CEH is a certification that demonstrates proficiency in ethical hacking methodologies, tools, and techniques. It validates your ability to identify vulnerabilities in systems using the same knowledge and tools as malicious hackers.'
                        : 'This certification validates your baseline skills and knowledge in the relevant domain and provides a solid foundation for an IT career.'}
                    </p>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Key Knowledge Areas:</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        {certificationInfo.name === 'CompTIA Security+' ? (
                          <>
                            <li>Threats, Attacks and Vulnerabilities</li>
                            <li>Technologies and Tools</li>
                            <li>Architecture and Design</li>
                            <li>Identity and Access Management</li>
                            <li>Risk Management</li>
                            <li>Cryptography and PKI</li>
                          </>
                        ) : certificationInfo.name === 'Cisco CCNA' ? (
                          <>
                            <li>Network Fundamentals</li>
                            <li>Network Access</li>
                            <li>IP Connectivity</li>
                            <li>IP Services</li>
                            <li>Security Fundamentals</li>
                            <li>Automation and Programmability</li>
                          </>
                        ) : certificationInfo.name === 'Splunk Certification' ? (
                          <>
                            <li>Data Ingestion and Processing</li>
                            <li>Search and Reporting</li>
                            <li>Dashboards and Visualizations</li>
                            <li>Advanced Analytics</li>
                            <li>Splunk Administration</li>
                            <li>Security Monitoring</li>
                          </>
                        ) : certificationInfo.name === 'CISSP' ? (
                          <>
                            <li>Security and Risk Management</li>
                            <li>Asset Security</li>
                            <li>Security Architecture and Engineering</li>
                            <li>Communication and Network Security</li>
                            <li>Identity and Access Management</li>
                            <li>Security Assessment and Testing</li>
                            <li>Security Operations</li>
                            <li>Software Development Security</li>
                          </>
                        ) : certificationInfo.name === 'Certified Ethical Hacker' ? (
                          <>
                            <li>Reconnaissance Techniques</li>
                            <li>System Hacking</li>
                            <li>Network and Perimeter Hacking</li>
                            <li>Web Application Hacking</li>
                            <li>Wireless Network Hacking</li>
                            <li>Mobile Platform, IoT, and OT Hacking</li>
                            <li>Cloud Computing</li>
                            <li>Cryptography</li>
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
                        {certificationInfo.name === 'CompTIA Security+' ? (
                          <>
                            <Badge variant="secondary">Security Administrator</Badge>
                            <Badge variant="secondary">Security Specialist</Badge>
                            <Badge variant="secondary">Security Consultant</Badge>
                            <Badge variant="secondary">Systems Administrator</Badge>
                            <Badge variant="secondary">Network Administrator</Badge>
                            <Badge variant="secondary">Junior IT Auditor</Badge>
                          </>
                        ) : certificationInfo.name === 'Cisco CCNA' ? (
                          <>
                            <Badge variant="secondary">Network Administrator</Badge>
                            <Badge variant="secondary">Network Engineer</Badge>
                            <Badge variant="secondary">Network Specialist</Badge>
                            <Badge variant="secondary">Network Analyst</Badge>
                            <Badge variant="secondary">Systems Engineer</Badge>
                          </>
                        ) : certificationInfo.name === 'Splunk Certification' ? (
                          <>
                            <Badge variant="secondary">Splunk Administrator</Badge>
                            <Badge variant="secondary">Data Analyst</Badge>
                            <Badge variant="secondary">Security Analyst</Badge>
                            <Badge variant="secondary">DevOps Engineer</Badge>
                            <Badge variant="secondary">IT Operations Specialist</Badge>
                          </>
                        ) : certificationInfo.name === 'CISSP' ? (
                          <>
                            <Badge variant="secondary">Security Manager</Badge>
                            <Badge variant="secondary">Security Architect</Badge>
                            <Badge variant="secondary">Security Director</Badge>
                            <Badge variant="secondary">Security Analyst</Badge>
                            <Badge variant="secondary">Security Consultant</Badge>
                            <Badge variant="secondary">CISO</Badge>
                          </>
                        ) : certificationInfo.name === 'Certified Ethical Hacker' ? (
                          <>
                            <Badge variant="secondary">Penetration Tester</Badge>
                            <Badge variant="secondary">Security Consultant</Badge>
                            <Badge variant="secondary">Security Analyst</Badge>
                            <Badge variant="secondary">Security Engineer</Badge>
                            <Badge variant="secondary">Security Specialist</Badge>
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
                
                <CertificationRoadmap certificationName={certificationInfo.name} />
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
                        {certificationInfo.examCode 
                          ? `Exam Code: ${certificationInfo.examCode} | ${certificationInfo.name.includes('A+') ? 'Two exams required' : '90-120 questions'} | 90-120 minutes`
                          : 'Standard certification exam format with multiple-choice and performance-based questions'}
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold">Passing Score:</h3>
                      <p className="text-sm">
                        {certificationInfo.passingScore || 'Varies by exam, typically 70-80%'}
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold">Exam Format:</h3>
                      <p className="text-sm">Multiple choice and performance-based questions</p>
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold">Certification Validity:</h3>
                      <p className="text-sm">
                        {certificationInfo.validity || 'Typically 2-3 years, renewable through continuing education or re-examination'}
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
            <PersonalizedPath certificationName={certificationInfo.name} />
          </TabsContent>
          
          <TabsContent value="practice" className="space-y-6">
            <InteractiveFlashcards 
              title={`${certificationInfo.name} Flashcards`}
              description="Test your knowledge with interactive flashcards"
              certificationName={certificationInfo.name}
            />
          </TabsContent>
          
          <TabsContent value="assistant" className="space-y-6">
            <AIAssistant certificationContext={certificationInfo.name} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CertificationDetailsPage;
