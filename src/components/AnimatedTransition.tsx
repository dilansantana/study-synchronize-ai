
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface AnimatedTransitionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade' | 'slide' | 'scale' | 'blur';
  duration?: number;
  delay?: number;
}

export const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  children,
  className,
  animation = 'fade',
  duration = 500,
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10); // Small delay for the DOM to settle

    return () => clearTimeout(timer);
  }, []);

  const animationClasses = {
    fade: 'animate-fade-in',
    slide: 'animate-slide-up',
    scale: 'animate-scale-in',
    blur: 'animate-blur-in',
  };

  const style = {
    opacity: isVisible ? 1 : 0,
    transition: `opacity ${duration}ms ease-in-out ${delay}ms, transform ${duration}ms ease-in-out ${delay}ms`,
  };

  return (
    <div 
      className={cn(
        isVisible && animationClasses[animation],
        className
      )} 
      style={style}
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;
