import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import QuizComponent from '@/components/QuizComponent';
import { QuizCreationModal } from '@/components/learning/QuizCreationModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { popularCertifications } from '@/data/certificationData';

const QuizPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState<string>("");
  const [quizParams, setQuizParams] = useState<{
    name?: string;
    time?: number;
    count?: number;
    difficulty?: string;
    cert?: string;
  } | null>(null);
  
  // Parse query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name');
    const time = searchParams.get('time');
    const count = searchParams.get('count');
    const difficulty = searchParams.get('difficulty');
    const cert = searchParams.get('cert');
    
    if (name) {
      setQuizParams({
        name,
        time: time ? parseInt(time) : 15,
        count: count ? parseInt(count) : 10,
        difficulty: difficulty || 'mixed',
        cert: cert || undefined
      });
      
      if (cert) {
        setSelectedCertification(cert);
      }
    }
  }, [location.search]);
  
  const certificationOptions = [
    { id: "", name: "General Knowledge" },
    ...popularCertifications.map(cert => ({ id: cert.id, name: cert.name }))
  ];

  const getCertificationName = () => {
    if (!selectedCertification) return undefined;
    const cert = popularCertifications.find(c => c.id === selectedCertification);
    return cert ? cert.name : undefined;
  };
  
  const handleCertificationChange = (value: string) => {
    setSelectedCertification(value);
    // Reset quiz params when certification changes
    setQuizParams(null);
    // Update URL to remove params
    navigate('/quiz');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              {quizParams?.name ? quizParams.name : "Quizzes"}
            </h1>
            <p className="text-muted-foreground">
              {quizParams ? `Test your knowledge with a ${quizParams.count}-question quiz` : "Create and take quizzes to test your knowledge"}
            </p>
          </div>
          <Button onClick={() => setShowQuizModal(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Quiz
          </Button>
        </div>

        {!quizParams && (
          <Card>
            <CardHeader>
              <CardTitle>Study by Certification</CardTitle>
              <CardDescription>
                Select a certification to focus your quiz or leave blank for general knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedCertification} onValueChange={handleCertificationChange}>
                <SelectTrigger className="w-full md:w-[300px]">
                  <SelectValue placeholder="Select certification or leave blank" />
                </SelectTrigger>
                <SelectContent>
                  {certificationOptions.map(cert => (
                    <SelectItem key={cert.id} value={cert.id}>
                      {cert.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}
        
        <QuizComponent 
          timeLimit={quizParams?.time || 15} 
          questionCount={quizParams?.count || 10}
          difficulty={quizParams?.difficulty || 'mixed'}
          certificationName={quizParams?.cert ? quizParams.cert : getCertificationName()}
          title={quizParams?.name || (selectedCertification ? `${getCertificationName()} Quiz` : "Practice Quiz")}
        />
      </div>

      <QuizCreationModal
        open={showQuizModal}
        onOpenChange={setShowQuizModal}
        certificationName={getCertificationName()}
      />
    </Layout>
  );
};

export default QuizPage;
