
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface ApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  onSave: () => void;
}

export const ApiKeyDialog: React.FC<ApiKeyDialogProps> = ({
  open,
  onOpenChange,
  apiKey,
  setApiKey,
  onSave,
}) => {
  const { toast } = useToast();
  
  const handleSave = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key",
        variant: "destructive"
      });
      return;
    }
    
    onSave();
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enter OpenAI API Key</DialogTitle>
          <DialogDescription>
            Your API key is required to use ChatGPT for content optimization. 
            It will be stored in your browser and only used for this feature.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Input
              id="apiKey"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              You can get your API key from the <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary underline">OpenAI dashboard</a>
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save & Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
