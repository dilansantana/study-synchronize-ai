
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import QuizComponent from '@/components/QuizComponent';
import { QuizCreationModal } from '@/components/learning/QuizCreationModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Star, History, Users, Bookmark, Clock, BookOpen, Target } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { popularCertifications } from '@/data/certificationData';

const QuizPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState<string>("");
  const [activeTab, setActiveTab] = useState("practice");
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
    { id: "general", name: "General Knowledge" },
    ...popularCertifications.map(cert => ({ id: cert.id, name: cert.name }))
  ];

  const getCertificationName = () => {
    if (!selectedCertification || selectedCertification === "general") return undefined;
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

  useEffect(() => {
    // When certification changes, switch back to practice tab
    setActiveTab("practice");
  }, [selectedCertification]);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              {quizParams?.name ? quizParams.name : "Study with Quizzes"}
            </h1>
            <p className="text-muted-foreground">
              {quizParams ? `Test your knowledge with a ${quizParams.count}-question quiz` : "Ace your IT certifications with interactive quizzes"}
            </p>
          </div>
          <Button onClick={() => setShowQuizModal(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Quiz
          </Button>
        </div>

        {!quizParams && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quiz Sets</CardTitle>
                  <CardDescription>
                    Choose your certification focus
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={selectedCertification} onValueChange={handleCertificationChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select certification" />
                    </SelectTrigger>
                    <SelectContent>
                      {certificationOptions.map(cert => (
                        <SelectItem key={cert.id} value={cert.id}>
                          {cert.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="space-y-1 pt-2">
                    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary cursor-pointer">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Popular Quizzes</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary cursor-pointer">
                      <Bookmark className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Saved Quizzes</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary cursor-pointer">
                      <History className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Recent Quizzes</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary cursor-pointer">
                      <Users className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Community Quizzes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quiz Types</CardTitle>
                  <CardDescription>
                    Different ways to test your knowledge
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-1">
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary cursor-pointer">
                    <Target className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Practice Mode</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary cursor-pointer">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Timed Quiz</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary cursor-pointer">
                    <BookOpen className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Exam Simulation</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="practice">Practice</TabsTrigger>
                  <TabsTrigger value="learn">Learn</TabsTrigger>
                  <TabsTrigger value="test">Test</TabsTrigger>
                </TabsList>
                <TabsContent value="practice" className="mt-4">
                  <QuizComponent 
                    timeLimit={15} 
                    questionCount={10}
                    difficulty="mixed"
                    certificationName={getCertificationName()}
                    title={selectedCertification ? `${getCertificationName()} Practice Quiz` : "Practice Quiz"}
                  />
                </TabsContent>
                <TabsContent value="learn" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Learn Mode</CardTitle>
                      <CardDescription>
                        Focus on understanding concepts with detailed explanations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center p-12 text-center">
                      <p className="text-muted-foreground mb-6">
                        Learn mode helps you understand concepts by providing detailed explanations for each question.
                      </p>
                      <Button onClick={() => setActiveTab("practice")}>Start Learning</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="test" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Test Mode</CardTitle>
                      <CardDescription>
                        Simulate a real exam experience with time limits
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center p-12 text-center">
                      <p className="text-muted-foreground mb-6">
                        Test your knowledge under exam conditions with timed questions and performance analytics.
                      </p>
                      <Button onClick={() => setActiveTab("practice")}>Start Test</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
        
        {quizParams && (
          <QuizComponent 
            timeLimit={quizParams?.time || 15} 
            questionCount={quizParams?.count || 10}
            difficulty={quizParams?.difficulty || 'mixed'}
            certificationName={quizParams?.cert ? quizParams.cert : getCertificationName()}
            title={quizParams?.name || (selectedCertification ? `${getCertificationName()} Quiz` : "Practice Quiz")}
          />
        )}
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
