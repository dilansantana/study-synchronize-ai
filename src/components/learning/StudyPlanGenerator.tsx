
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Calendar, BookOpen, CheckSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generateStudyPlan } from '@/utils/studyPlanUtils';

const StudyPlanGenerator: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [certification, setCertification] = useState("");
  const [timeAvailable, setTimeAvailable] = useState("4");
  const [examDate, setExamDate] = useState("");
  const [notes, setNotes] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!certification.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter the certification name",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const studyPlan = await generateStudyPlan({
        certification, 
        timeAvailable: Number(timeAvailable), 
        examDate, 
        notes
      });
      
      toast({
        title: "Study Plan Generated",
        description: "Your personalized study plan has been created!"
      });
      
      // Slight delay to show the success message before redirecting
      setTimeout(() => {
        // Navigate to flashcards with the study plan
        navigate("/flashcards", { 
          state: { 
            certificationName: certification,
            studyPlan 
          } 
        });
      }, 1500);
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Could not generate your study plan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create Your Study Plan</CardTitle>
          <CardDescription>
            Generate a personalized study plan based on your certification goals and schedule.
            We'll create flashcards and quizzes to help you prepare effectively.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="certification">Certification Name</Label>
              <Input
                id="certification"
                placeholder="e.g. AWS Solutions Architect, CompTIA Security+"
                value={certification}
                onChange={(e) => setCertification(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeAvailable">Hours Available per Week</Label>
                <Select
                  value={timeAvailable}
                  onValueChange={setTimeAvailable}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">1-2 hours</SelectItem>
                    <SelectItem value="4">3-5 hours</SelectItem>
                    <SelectItem value="8">6-10 hours</SelectItem>
                    <SelectItem value="15">10+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="examDate">Target Exam Date (Optional)</Label>
                <Input
                  id="examDate"
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any specific topics you want to focus on or additional information"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="flex flex-col space-y-4">
              <Button type="submit" disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Plan...
                  </>
                ) : (
                  "Generate Study Plan"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col space-y-2">
          <div className="text-sm text-muted-foreground">
            Your plan will include:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-primary" />
              <span className="text-sm">Weekly schedule</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4 text-primary" />
              <span className="text-sm">Recommended resources</span>
            </div>
            <div className="flex items-center">
              <CheckSquare className="mr-2 h-4 w-4 text-primary" />
              <span className="text-sm">Custom flashcards & quizzes</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StudyPlanGenerator;
