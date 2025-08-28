import { Input } from "@/components/ui/input";
import { useState } from "react";

type NewFileInputProps = {
  item: ProjectItemTree;
  handleCreate: (
    e: React.KeyboardEvent<HTMLInputElement>,
    parentId: string,
    name: string
  ) => void;
  isFolderCreating: boolean;
  isFileCreating: boolean;
  showInput: {
    visible: boolean;
    isFolder: boolean;
    parentId: string | null;
  };
};
export const NewFileInput = ({
  handleCreate,
  isFileCreating,
  isFolderCreating,
  showInput,
  item,
}: NewFileInputProps) => {
  const [newName, setNewName] = useState("");

  return (
    <Input
      value={newName}
      onChange={(e) => setNewName(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleCreate(e, item._id, newName);
        }
      }}
      autoFocus
      className="h-6 text-xs border-none bg-transparent focus:bg-white dark:focus:bg-gray-900 rounded px-1"
      placeholder={showInput.isFolder ? "Folder name" : "File name"}
      disabled={isFolderCreating || isFileCreating}
    />
  );
};
