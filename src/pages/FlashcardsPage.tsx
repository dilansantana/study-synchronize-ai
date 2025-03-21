
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { InteractiveFlashcards } from '@/components/learning/InteractiveFlashcards';
import { Button } from '@/components/ui/button';
import { Plus, Bookmark, Users, History, Star } from 'lucide-react';
import { FlashcardCreationModal } from '@/components/learning/FlashcardCreationModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { popularCertifications } from '@/data/certificationData';

const FlashcardsPage: React.FC = () => {
  const { toast } = useToast();
  const [showFlashcardModal, setShowFlashcardModal] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState<string>("");
  
  const certificationOptions = [
    { id: "general", name: "General Knowledge" },
    ...popularCertifications.map(cert => ({ id: cert.id, name: cert.name }))
  ];

  const handleSaveFlashcard = (flashcard: any) => {
    try {
      const savedFlashcards = localStorage.getItem('customFlashcards');
      const existingFlashcards = savedFlashcards ? JSON.parse(savedFlashcards) : [];
      
      localStorage.setItem('customFlashcards', JSON.stringify([...existingFlashcards, flashcard]));
      
      toast({
        title: "Flashcard created",
        description: "Your custom flashcard has been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving custom flashcard:', error);
      toast({
        title: "Error saving flashcard",
        description: "There was an error saving your flashcard.",
        variant: "destructive",
      });
    }
  };

  const getCertificationName = () => {
    if (!selectedCertification || selectedCertification === "general") return undefined;
    const cert = popularCertifications.find(c => c.id === selectedCertification);
    return cert ? cert.name : undefined;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Flashcards</h1>
            <p className="text-muted-foreground">
              Master IT certification concepts through spaced repetition and active recall
            </p>
          </div>
          <Button onClick={() => setShowFlashcardModal(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Flashcard
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Study Sets</CardTitle>
                <CardDescription>
                  Focus your flashcard study
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedCertification} onValueChange={setSelectedCertification}>
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
                    <span className="text-sm">Popular Sets</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary cursor-pointer">
                    <Bookmark className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Saved Sets</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary cursor-pointer">
                    <History className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Recent Sets</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary cursor-pointer">
                    <Users className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Community Sets</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <InteractiveFlashcards 
              title={selectedCertification ? `${getCertificationName()} Flashcards` : "Study Flashcards"} 
              description={selectedCertification ? `Test your knowledge of ${getCertificationName()} concepts` : "Test your general IT knowledge"}
              certificationName={getCertificationName()}
            />
          </div>
        </div>
      </div>

      <FlashcardCreationModal
        open={showFlashcardModal}
        onOpenChange={setShowFlashcardModal}
        onSave={handleSaveFlashcard}
        certificationName={getCertificationName()}
      />
    </Layout>
  );
};

export default FlashcardsPage;
