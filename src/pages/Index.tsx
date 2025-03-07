
import React from 'react';
import Layout from '@/components/Layout';
import AnimatedTransition from '@/components/AnimatedTransition';
import CertificationCard from '@/components/CertificationCard';
import { ArrowRight, Shield, Cpu, Network, Server, Star, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Index = () => {
  // Mock certification paths
  const certifications = [
    {
      title: 'CompTIA Security+',
      description: 'Master cybersecurity fundamentals and validate your skills with the industry-standard certification.',
      progress: 45,
      path: '/dashboard',
      colorClass: 'from-blue-500 to-blue-600'
    },
    {
      title: 'CompTIA Network+',
      description: 'Build essential networking skills and understand infrastructure, operations, and troubleshooting.',
      progress: 0,
      path: '/dashboard',
      colorClass: 'from-green-500 to-green-600'
    },
    {
      title: 'CompTIA A+',
      description: 'Learn core IT skills including hardware, software, networking, security, and troubleshooting.',
      progress: 12,
      path: '/dashboard',
      colorClass: 'from-amber-500 to-amber-600'
    },
    {
      title: 'Cisco CCNA',
      description: 'Develop foundational knowledge of networking and gain practical skills for network administration.',
      progress: 0,
      path: '/dashboard',
      colorClass: 'from-indigo-500 to-indigo-600'
    }
  ];

  const features = [
    {
      icon: <BookOpen className="w-10 h-10" />,
      title: 'Smart Learning Summaries',
      description: 'AI-generated concise summaries and flashcards from lengthy resources'
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: 'Practice Exams',
      description: 'Adaptive quizzes that simulate real certification exams with detailed feedback'
    },
    {
      icon: <Star className="w-10 h-10" />,
      title: 'Personalized Learning',
      description: 'Custom study schedules tailored to your knowledge gaps and learning pace'
    },
    {
      icon: <Server className="w-10 h-10" />,
      title: 'Content Aggregation',
      description: 'Curated resources from multiple sources organized by certification topics'
    }
  ];

  return (
    <Layout fullWidth>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/30 py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-1/2 h-full rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-1/2 h-full rounded-full bg-accent/5 blur-3xl" />
        </div>
        
        <div className="container relative mx-auto px-4 flex flex-col items-center text-center">
          <AnimatedTransition animation="fade" className="mb-6">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Powered by AI
            </span>
          </AnimatedTransition>
          
          <AnimatedTransition animation="slide" className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Master IT Certifications
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> Smarter & Faster</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              AI-powered learning platform that intelligently consolidates resources, creates study materials, and adapts to your progress for IT and cybersecurity certifications.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium bg-primary text-white hover:bg-primary/90 shadow-sm transition-all hover:shadow"
              >
                Start Learning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <Link
                to="/learning"
                className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
              >
                Explore Resources
              </Link>
            </div>
          </AnimatedTransition>
          
          <AnimatedTransition animation="scale" delay={200} className="mt-16 w-full max-w-5xl">
            <div className="overflow-hidden rounded-xl border shadow-lg">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="aspect-video bg-card border-b object-cover w-full"
              >
                {/* Placeholder for dashboard screenshot */}
                <div className="h-full w-full bg-gradient-to-br from-secondary to-background flex items-center justify-center">
                  <div className="text-center px-8">
                    <Cpu className="w-16 h-16 text-primary/60 mx-auto mb-4" />
                    <p className="text-xl font-medium">Interactive Learning Dashboard</p>
                    <p className="text-muted-foreground">Personalized study path and progress tracking</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedTransition>
        </div>
      </section>
      
      {/* Certification Paths Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <AnimatedTransition animation="fade">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Certification Paths</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose your certification journey and let our AI guide you through each step of the learning process.
            </p>
          </AnimatedTransition>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, index) => (
            <CertificationCard
              key={cert.title}
              title={cert.title}
              description={cert.description}
              progress={cert.progress}
              path={cert.path}
              colorClass={cert.colorClass}
            />
          ))}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <AnimatedTransition animation="fade">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Smart Features for Efficient Learning</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our AI-powered platform is designed to optimize your study time and maximize knowledge retention.
              </p>
            </AnimatedTransition>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <AnimatedTransition
                key={feature.title}
                animation="scale"
                delay={index * 100}
                className="relative p-6 rounded-xl border bg-card shadow-sm transition-all hover:shadow-md"
              >
                <div className="rounded-full w-16 h-16 flex items-center justify-center bg-primary/10 text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </AnimatedTransition>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 container mx-auto px-4">
        <div className="rounded-2xl bg-gradient-to-r from-primary/90 to-accent/90 shadow-lg overflow-hidden">
          <div className="px-6 py-16 sm:px-12 sm:py-20 grid gap-8 md:grid-cols-2 items-center">
            <div className="text-white">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to accelerate your certification journey?</h2>
              <p className="text-white/90 text-lg mb-8">
                Start learning today with our AI-powered platform and get certified faster than traditional methods.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium bg-white text-primary hover:bg-white/90 shadow-sm transition-all hover:shadow"
              >
                Start Learning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 rounded-full bg-white/10 blur-3xl" />
                <div className="relative flex items-center justify-center h-full">
                  <Network className="w-32 h-32 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
