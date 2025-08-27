import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate, useParams } from "react-router-dom";
import {
  FileJson,
  FilePlus,
  Folder,
  FolderPlus,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useFileFolderHandler } from "../../hooks/mutations/fileFolderCreationHandler";

type ProjectFilesFoldersType = {
  projectId: string;
  projectName: string;
};

type HandleFilesAndFoldersProps = {
  currentProjectFP: ProjectFilesFoldersType;
  items: ProjectItemTree[];
  fileId?: string;
};

// Main component
const HandleFilesAndFolders = ({
  currentProjectFP,
  items,
  fileId,
}: HandleFilesAndFoldersProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [newName, setNewName] = useState("");

  const {
    showInput,
    setShowInput,
    createFile,
    createFolder,
    isFolderCreating,
    isFileCreating,
  } = useFileFolderHandler({ projectId: currentProjectFP.projectId });

  const handleCreate = (
    e: React.KeyboardEvent<HTMLInputElement>,
    parentId: string | null
  ) => {
    if (e.key === "Enter") {
      if (!newName.trim()) return;
      let isProcessSucceed = false;
      if (showInput?.isFolder) {
        const { success } = createFolder(e, parentId || "", newName);
        isProcessSucceed = success;
      } else {
        const { success } = createFile(e, parentId || "", newName);
        isProcessSucceed = success;
      }

      if (isProcessSucceed) {
        setNewName("");
        setShowInput({
          isFolder: false,
          visible: false,
          parentId: "",
        });
      }
    }

    if (e.key === "Escape") {
      setNewName("");
      setShowInput({
        isFolder: false,
        visible: false,
        parentId: "",
      });
    }
  };

  const handleFileClick = (item: ProjectItemTree) => {
    if (item.type === "file") {
      navigate(`/project/${id}/js/${item.name}/${item._id}`);
    }
  };

  const TreeItem = ({
    item,
    level = 0,
  }: {
    item: ProjectItemTree;
    level?: number;
  }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isSelected = fileId === item._id;

    const paddingLeft = level * 16;

    if (item.type === "folder") {
      return (
        <div key={item._id} className="w-full">
          <Accordion type="single" collapsible className="border-none">
            <AccordionItem value={item._id} className="border-none">
              <div className="flex items-center gap-2 h-9 hover:bg-gray-50 dark:hover:bg-gray-800 rounded group relative">
                <div
                  className="flex items-center gap-2 flex-1 px-2"
                  style={{ paddingLeft: `${paddingLeft + 8}px` }}
                >
                  <AccordionTrigger className="p-0 w-4 h-4 hover:no-underline [&[data-state=open]>svg]:rotate-90">
                    <ChevronRight className="h-3 w-3" />
                  </AccordionTrigger>
                  <Folder className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                  <FilePlus
                    size={14}
                    className="cursor-pointer hover:text-blue-500 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowInput({
                        parentId: item._id,
                        isFolder: false,
                        visible: true,
                      });
                    }}
                    xlinkTitle="Add file"
                  />
                  <FolderPlus
                    size={14}
                    className="cursor-pointer hover:text-blue-500 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowInput({
                        parentId: item._id,
                        isFolder: true,
                        visible: true,
                      });
                    }}
                    xlinkTitle="Add folder"
                  />
                </div>
              </div>

              <AccordionContent className="pb-0">
                {/* Show input for new file/folder creation */}
                {showInput?.visible && showInput.parentId === item._id && (
                  <div
                    className="flex items-center gap-2 h-8 px-2"
                    style={{ paddingLeft: `${paddingLeft + 32}px` }}
                  >
                    {showInput.isFolder ? (
                      <Folder className="h-4 w-4 text-blue-500" />
                    ) : (
                      <FileJson className="h-4 w-4 text-green-500" />
                    )}
                    <Input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onKeyDown={(e) => handleCreate(e, item._id)}
                      autoFocus
                      className="h-6 text-xs border-none bg-transparent focus:bg-white dark:focus:bg-gray-900 rounded px-1"
                      placeholder={
                        showInput.isFolder ? "Folder name" : "File name"
                      }
                      disabled={isFolderCreating || isFileCreating}
                    />
                  </div>
                )}

                {/* Render children */}
                {hasChildren && (
                  <div className="space-y-1">
                    {item.children.map((child) => (
                      <TreeItem
                        key={child._id}
                        item={child}
                        level={level + 1}
                      />
                    ))}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      );
    }

    // Render file
    return (
      <div
        key={item._id}
        className={`flex items-center gap-2 h-8 cursor-pointer rounded transition-colors px-2 ${
          isSelected
            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
            : "hover:bg-gray-50 dark:hover:bg-gray-800"
        }`}
        style={{ paddingLeft: `${paddingLeft + 8}px` }}
        onClick={() => handleFileClick(item)}
      >
        <div className="w-4" /> {/* Space for accordion trigger alignment */}
        <FileJson className="h-4 w-4 text-green-500" />
        <span className="text-sm">{item.name}</span>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* so it is for handling the file folder creation with in the root  */}
      <div className="flex items-center justify-between p-3 border-b bg-gray-50 dark:bg-gray-900">
        <h3 className="font-semibold text-lg capitalize">
          {currentProjectFP.projectName}
        </h3>
        <div className="flex gap-2">
          <FilePlus
            size={18}
            className="cursor-pointer hover:text-blue-500 transition-colors"
            onClick={() =>
              setShowInput({ isFolder: false, visible: true, parentId: null })
            }
            xlinkTitle="Add file to root"
          />
          <FolderPlus
            size={18}
            className="cursor-pointer hover:text-blue-500 transition-colors"
            onClick={() =>
              setShowInput({ isFolder: true, visible: true, parentId: null })
            }
            xlinkTitle="Add folder to root"
          />
        </div>
      </div>

      {/* File tree content */}
      <div className="p-2 space-y-1">
        {/* Root level input for new files/folders yeah so for handling the root level file folder creation*/}
        {showInput?.visible && showInput.parentId === null && (
          <div className="flex items-center gap-2 h-8 px-2">
            {showInput.isFolder ? (
              <Folder className="h-4 w-4 text-blue-500" />
            ) : (
              <FileJson className="h-4 w-4 text-green-500" />
            )}
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => handleCreate(e, null)}
              autoFocus
              className="h-6 text-xs border-none bg-transparent focus:bg-white dark:focus:bg-gray-900 rounded px-1"
              placeholder={showInput.isFolder ? "Folder name" : "File name"}
              disabled={isFolderCreating || isFileCreating}
            />
          </div>
        )}

        {/* Render all items */}
        {items.map((item) => (
          <TreeItem key={item._id} item={item} level={0} />
        ))}

        {/* Empty state */}
        {items.length === 0 && !showInput?.visible && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Folder className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No files or folders yet</p>
            <p className="text-xs">Click the + icons above to get started</p>
          </div>
        )}
      </div>

      {/* Loading states */}
      {(isFolderCreating || isFileCreating) && (
        <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            {isFolderCreating ? "Creating folder..." : "Creating file..."}
          </div>
        </div>
      )}
    </div>
  );
};

export default HandleFilesAndFolders;
