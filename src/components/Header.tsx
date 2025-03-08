
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, Book, BookOpen, GraduationCap, CreditCard, Award, BookMarked } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from './ui/badge';

export default function Header() {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const links = [
    { to: '/learning', label: 'Learning Resources', icon: <Book className="w-4 h-4 mr-2" /> },
    { to: '/guides', label: 'My Guides', icon: <BookMarked className="w-4 h-4 mr-2" /> },
    { to: '/certification', label: 'Certification Pathway', icon: <Award className="w-4 h-4 mr-2" /> },
    { to: '/flashcards', label: 'Flashcards', icon: <BookOpen className="w-4 h-4 mr-2" /> },
    { to: '/quiz', label: 'Quiz', icon: <GraduationCap className="w-4 h-4 mr-2" /> },
    { to: '/subscription', label: 'Subscription', icon: <CreditCard className="w-4 h-4 mr-2" /> },
  ];

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center">
          <NavLink to="/learning" className="flex items-center gap-2 font-bold">
            <GraduationCap className="h-5 w-5" />
            <span className="text-xl font-semibold">CertifyMaster</span>
          </NavLink>
          
          {!isMobile && (
            <nav className="ml-8 hidden md:block">
              <ul className="flex gap-6">
                {links.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `text-sm font-medium transition-colors hover:text-primary ${
                          isActive ? 'text-primary' : 'text-muted-foreground'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative rounded-full h-8 w-8 p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-primary/10 text-primary">U</AvatarFallback>
                </Avatar>
                <Badge className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary p-0 text-[10px] text-primary-foreground">3</Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <NavLink to="/subscription" className="flex w-full">Subscription</NavLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <nav className="border-t py-4 px-4 sm:px-8 bg-background">
          <ul className="space-y-3">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center py-2 text-sm font-medium transition-colors hover:text-primary ${
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
