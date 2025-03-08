
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface CertificationItem {
  id: string;
  name: string;
  category: string;
}

interface PopularCertificationsProps {
  certifications: CertificationItem[];
  onSelect: (id: string) => void;
}

const PopularCertifications: React.FC<PopularCertificationsProps> = ({ 
  certifications,
  onSelect
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {certifications.map(cert => (
        <Card 
          key={cert.id} 
          className="cursor-pointer hover:bg-muted/50 transition-colors" 
          onClick={() => onSelect(cert.id)}
        >
          <CardContent className="p-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{cert.name}</h3>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{cert.category}</span>
              </div>
              <p className="text-xs text-muted-foreground">Click to explore</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PopularCertifications;
