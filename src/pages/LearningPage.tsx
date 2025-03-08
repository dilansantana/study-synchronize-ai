
import React from 'react';
import Layout from '@/components/Layout';
import ContentAggregator from '@/components/ContentAggregator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, FileText, GraduationCap, Trophy } from 'lucide-react';
import { popularCertifications } from '@/data/certificationData';
import { Link } from 'react-router-dom';

const LearningPage: React.FC = () => {
  const featuredCertifications = popularCertifications.slice(0, 4);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">IT Certification Study Center</h1>
          <p className="text-muted-foreground mt-2">
            Master any IT certification with custom flashcards, quizzes, and structured learning paths
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-500" />
                Flashcards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Master key concepts with spaced repetition</p>
            </CardContent>
            <CardFooter>
              <Link to="/flashcards">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  Start Studying <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Quizzes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Test your knowledge with practice exams</p>
            </CardContent>
            <CardFooter>
              <Link to="/quiz">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  Take a Quiz <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-purple-500" />
                Learning Guides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Follow structured learning paths</p>
            </CardContent>
            <CardFooter>
              <Link to="/guides">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  Browse Guides <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Find resources for popular IT certifications</p>
            </CardContent>
            <CardFooter>
              <Link to="/certification">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  View Paths <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="mb-6 mt-12">
          <h2 className="text-2xl font-bold">Popular IT Certifications</h2>
          <p className="text-muted-foreground mt-1">
            Start studying for these in-demand certifications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredCertifications.map((cert) => (
            <Link to={`/certification/${cert.id}`} key={cert.id}>
              <Card className="hover:shadow-md transition-shadow h-full cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{cert.name}</CardTitle>
                  <CardDescription>{cert.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>Flashcards available</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <BookOpen className="h-4 w-4" />
                    <span>Practice quizzes</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Start Studying
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        <ContentAggregator />
      </div>
    </Layout>
  );
};

export default LearningPage;
