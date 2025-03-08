
import React from 'react';
import { Input } from "@/components/ui/input";

interface GuideNameInputProps {
  guideName: string;
  onChange: (name: string) => void;
}

export const GuideNameInput: React.FC<GuideNameInputProps> = ({
  guideName,
  onChange
}) => {
  return (
    <div>
      <label className="text-sm font-medium">Guide Name</label>
      <Input
        value={guideName}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., AWS Solutions Architect Ultimate Guide"
        className="mt-1"
      />
    </div>
  );
};
