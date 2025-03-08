import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Shield, GraduationCap, BookOpen, Video, FlaskConical, CheckSquare, ArrowRight, Award } from 'lucide-react';
import Header from '@/components/Header';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

function Index() {
  const navigate = useNavigate();

  const certifications = [
    {
      id: 'comptia-security-plus',
      title: 'CompTIA Security+',
      description: 'Foundational cybersecurity certification validating core security skills.',
      icon: <Shield className="h-5 w-5" />,
      difficulty: 'Intermediate',
      examCost: '$350'
    },
    {
      id: 'comptia-network-plus',
      title: 'CompTIA Network+',
      description: 'Validates technical skills needed to securely establish, maintain and troubleshoot networks.',
      icon: <Shield className="h-5 w-5" />,
      difficulty: 'Intermediate',
      examCost: '$329'
    },
    {
      id: 'cisco-ccna',
      title: 'Cisco CCNA',
      description: 'Entry-level networking certification covering network fundamentals and security.',
      icon: <Award className="h-5 w-5" />,
      difficulty: 'Intermediate',
      examCost: '$300'
    },
    {
      id: 'aws-cloud-practitioner',
      title: 'AWS Cloud Practitioner',
      description: 'Foundational certification for understanding AWS Cloud services and terminology.',
      icon: <Award className="h-5 w-5" />,
      difficulty: 'Beginner',
      examCost: '$100'
    }
  ];

  const features = [
    {
      title: 'AI-Generated Study Guides',
      description: 'Create personalized study guides from various resources with one click',
      icon: <FlaskConical className="h-5 w-5 text-primary" />
    },
    {
      title: 'Interactive Flashcards',
      description: 'Learn key concepts with adaptive flashcards that focus on your weak areas',
      icon: <BookOpen className="h-5 w-5 text-primary" />
    },
    {
      title: 'Video Tutorials',
      description: 'Access curated video content from various sources in one place',
      icon: <Video className="h-5 w-5 text-primary" />
    },
    {
      title: 'Adaptive Practice Quizzes',
      description: 'Test your knowledge with quizzes that simulate the real certification exams',
      icon: <CheckSquare className="h-5 w-5 text-primary" />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="px-4 py-16 md:py-24 lg:py-32 bg-gradient-to-b from-secondary/50 to-background">
          <div className="container mx-auto max-w-5xl">
            <AnimatedTransition animation="fade" className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Master Your IT Certification Journey
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                AI-powered learning platform with personalized study paths, interactive resources, and practice exams for IT certifications.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" onClick={() => navigate('/dashboard')}>
                  Get Started
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/learning')}>
                  Browse Resources
                </Button>
              </div>
            </AnimatedTransition>
          </div>
        </section>

        <section className="px-4 py-16 container mx-auto max-w-5xl">
          <AnimatedTransition animation="fade" delay={200} className="space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Popular Certifications</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive study resources for today's most in-demand IT certifications
            </p>
          </AnimatedTransition>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <AnimatedTransition
                key={cert.id}
                animation="scale"
                delay={300 + (index * 100)}
              >
                <Card className="h-full flex flex-col transition-all hover:shadow-md hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      {cert.icon}
                      <span className="text-xs text-muted-foreground">{cert.difficulty}</span>
                    </div>
                    <CardTitle className="mt-3">{cert.title}</CardTitle>
                    <CardDescription>{cert.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto flex justify-between items-center pt-0">
                    <span className="text-sm font-medium">Exam: {cert.examCost}</span>
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto text-primary" 
                      onClick={() => navigate(`/certification/${cert.id}`)}
                    >
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </AnimatedTransition>
            ))}
          </div>
        </section>

        <section className="px-4 py-16 bg-secondary/20">
          <div className="container mx-auto max-w-5xl">
            <AnimatedTransition animation="fade" delay={600} className="space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Platform Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Innovative tools designed to optimize your certification preparation
              </p>
            </AnimatedTransition>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <AnimatedTransition
                  key={feature.title}
                  animation="slide"
                  delay={700 + (index * 100)}
                  className="flex gap-4 items-start"
                >
                  <div className="p-2 rounded-lg bg-primary/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </AnimatedTransition>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 container mx-auto max-w-5xl text-center">
          <AnimatedTransition animation="fade" delay={1000} className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Ready to Start Your Certification Journey?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of IT professionals using our platform to prepare smarter, not harder.
            </p>
            <Button 
              size="lg" 
              className="mt-4"
              onClick={() => navigate('/subscription')}
            >
              View Plans
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </AnimatedTransition>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2023 CertifyMaster. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Index;
