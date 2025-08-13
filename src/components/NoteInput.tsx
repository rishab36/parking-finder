
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface NoteInputProps {
  initialNote: string;
  onSave: (note: string) => void;
  onCancel: () => void;
}

const NoteInput = ({ initialNote, onSave, onCancel }: NoteInputProps) => {
  const [note, setNote] = useState(initialNote || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(note.trim());
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800/50 rounded-xl p-4 mb-4 shadow-md animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Add a note for your parking spot
        </h3>
        <button 
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g., Level 3, Row B, Spot 45"
          className="w-full"
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            size="sm"
          >
            Save Note
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NoteInput;
