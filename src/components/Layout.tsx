
import React from 'react';
import Header from './Header';
import { cn } from "@/lib/utils";
import AnimatedTransition from './AnimatedTransition';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  className,
  fullWidth = false,
}) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className={cn(
        "flex-1 px-4 pb-12",
        !fullWidth && "container mx-auto",
        className
      )}>
        <AnimatedTransition animation="fade">
          {children}
        </AnimatedTransition>
      </main>
      <footer className="py-6 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AI Certification Master. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
