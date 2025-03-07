
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { ArrowRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CertificationCardProps {
  title: string;
  description: string;
  progress?: number;
  image?: string;
  colorClass?: string;
  path: string;
  className?: string;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  title,
  description,
  progress = 0,
  image,
  colorClass = "from-primary to-primary/70",
  path,
  className,
}) => {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl border shadow-sm card-hover-effect",
        "bg-card text-card-foreground",
        className
      )}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-full flex flex-col">
        <div className={cn(
          "h-2 w-full bg-gradient-to-r",
          colorClass
        )} />
        
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary text-primary">
              {image ? (
                <img 
                  src={image} 
                  alt={title} 
                  className="w-8 h-8 object-contain" 
                />
              ) : (
                <Award className="w-6 h-6" />
              )}
            </div>
          </div>
          
          <h3 className="text-xl font-semibold tracking-tight mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-6 flex-1">{description}</p>
          
          {progress > 0 && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-progress"
                  style={{ '--progress-width': `${progress}%` } as React.CSSProperties}
                />
              </div>
            </div>
          )}
          
          <Link
            to={path}
            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
          >
            {progress > 0 ? 'Continue Learning' : 'Start Learning'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificationCard;
