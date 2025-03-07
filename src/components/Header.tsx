import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, Home, FlaskConical, FileText, Brain } from 'lucide-react';
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <Brain className="w-4 h-4" /> },
    { name: 'Learning', path: '/learning', icon: <Book className="w-4 h-4" /> },
    { name: 'Flashcards', path: '/flashcards', icon: <FileText className="w-4 h-4" /> },
    { name: 'Quiz', path: '/quiz', icon: <FlaskConical className="w-4 h-4" /> },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="relative flex h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-primary to-accent">
              <span className="flex h-full w-full items-center justify-center text-white font-bold text-xl">
                A
              </span>
            </span>
            <span className="font-semibold text-xl">AI Certification Master</span>
          </Link>

          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  "flex items-center space-x-1",
                  location.pathname === item.path
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            {/* Mobile menu button - we'll keep it simple for now */}
            <button className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50">
              <span className="sr-only">Open menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
