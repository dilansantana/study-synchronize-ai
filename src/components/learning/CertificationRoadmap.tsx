
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Milestone } from 'lucide-react';

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  keyTopics: string[];
  estimatedStudyTime: string;
  resourceCount: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface CertificationRoadmapProps {
  certificationName: string;
}

export const CertificationRoadmap: React.FC<CertificationRoadmapProps> = ({ certificationName }) => {
  // This would normally come from an API
  const roadmapSteps: RoadmapStep[] = [
    {
      id: '1',
      title: 'Security Fundamentals',
      description: 'Learn basic security concepts, principles, and terminology',
      keyTopics: ['CIA Triad', 'Security Controls', 'Risk Management'],
      estimatedStudyTime: '2 weeks',
      resourceCount: 12,
      difficulty: 'beginner'
    },
    {
      id: '2',
      title: 'Network Security',
      description: 'Understand network security technologies and implementations',
      keyTopics: ['Firewalls', 'VPNs', 'Network Protocols', 'Wireless Security'],
      estimatedStudyTime: '3 weeks',
      resourceCount: 18,
      difficulty: 'intermediate'
    },
    {
      id: '3',
      title: 'Cryptography',
      description: 'Master encryption, hashing, and PKI concepts',
      keyTopics: ['Symmetric vs Asymmetric', 'Hashing Algorithms', 'Digital Certificates'],
      estimatedStudyTime: '2 weeks',
      resourceCount: 14,
      difficulty: 'intermediate'
    },
    {
      id: '4',
      title: 'Identity and Access Management',
      description: 'Learn authentication, authorization, and access control',
      keyTopics: ['MFA', 'SSO', 'Privilege Management', 'Account Types'],
      estimatedStudyTime: '2 weeks',
      resourceCount: 10,
      difficulty: 'intermediate'
    },
    {
      id: '5',
      title: 'Compliance and Operational Security',
      description: 'Understand legal requirements, policies, and procedures',
      keyTopics: ['Regulations', 'Data Privacy', 'Incident Response'],
      estimatedStudyTime: '2 weeks',
      resourceCount: 15,
      difficulty: 'advanced'
    },
    {
      id: '6',
      title: 'Application Security',
      description: 'Learn how to secure software and applications',
      keyTopics: ['SDLC', 'OWASP Top 10', 'Code Analysis'],
      estimatedStudyTime: '2 weeks',
      resourceCount: 12,
      difficulty: 'advanced'
    },
    {
      id: '7',
      title: 'Final Exam Preparation',
      description: 'Review all domains and take practice exams',
      keyTopics: ['Practice Tests', 'Weak Areas Review', 'Exam Strategies'],
      estimatedStudyTime: '1 week',
      resourceCount: 8,
      difficulty: 'advanced'
    }
  ];
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{certificationName} Certification Roadmap</CardTitle>
        <CardDescription>
          Your complete study guide from beginner to certification-ready
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-muted-foreground/20"></div>
          
          {/* Steps */}
          <div className="space-y-8">
            {roadmapSteps.map((step, index) => (
              <div key={step.id} className="relative pl-10">
                {/* Milestone indicator */}
                <div className="absolute left-[0.45rem] flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground">
                  {index + 1}
                </div>
                
                {/* Content */}
                <div className={`p-4 border rounded-md ${getDifficultyColor(step.difficulty)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <Badge variant="outline" className="bg-background">
                      {step.estimatedStudyTime}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                  
                  <div className="mb-2">
                    <span className="text-xs text-muted-foreground">Key Topics:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {step.keyTopics.map(topic => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    {step.resourceCount} learning resources available
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
