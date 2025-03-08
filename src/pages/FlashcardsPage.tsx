
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { InteractiveFlashcards } from '@/components/learning/InteractiveFlashcards';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
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
    { id: "general", name: "General Knowledge" }, // Changed empty string to "general"
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
    if (!selectedCertification || selectedCertification === "general") return undefined; // Update to handle "general"
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
              Create and review flashcards to test your knowledge
            </p>
          </div>
          <Button onClick={() => setShowFlashcardModal(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Flashcard
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Study by Certification</CardTitle>
            <CardDescription>
              Select a certification to focus your study or leave blank for general knowledge
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedCertification} onValueChange={setSelectedCertification}>
              <SelectTrigger className="w-full md:w-[300px]">
                <SelectValue placeholder="Select certification or leave blank" />
              </SelectTrigger>
              <SelectContent>
                {certificationOptions.map(cert => (
                  <SelectItem key={cert.id} value={cert.id}>
                    {cert.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        <InteractiveFlashcards 
          title={selectedCertification ? `${getCertificationName()} Flashcards` : "Study Flashcards"} 
          description={selectedCertification ? `Test your knowledge of ${getCertificationName()} concepts` : "Test your general IT knowledge"}
          certificationName={getCertificationName()}
        />
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
