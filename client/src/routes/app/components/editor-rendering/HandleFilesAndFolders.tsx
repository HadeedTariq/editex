import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate, useParams } from "react-router-dom";

import { FileJson, FilePlus, Folder, FolderPlus } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";

import { v4 as uuid } from "uuid";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { projectItemApi } from "@/lib/axios";

import { useFullApp } from "@/hooks/useFullApp";
type FolderFile = {
  visible: boolean;
  isFolder: boolean;
  folderId: string;
};

const HandleFilesAndFolders = () => {
  const navigate = useNavigate();
  const { user } = useFullApp();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { id, fileId } = useParams();
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });
  const [showFolderFile, setShowFolderFile] = useState<FolderFile>({
    visible: false,
    isFolder: false,
    folderId: "",
  });
  const [file, setFile] = useState("");
  const [folder, setFolder] = useState("");
  const { mutate: folderCreation, isPending: isFolderCreating } = useMutation({
    mutationKey: [`createFolder`],
    mutationFn: async () => {
      const { data } = await projectItemApi.post(`/createFolder`, {
        name: folder,
        isFolder: true,
        projectId: id,
      });
      return data;
    },
    onSuccess() {
      setShowInput({ ...showInput, visible: false });
      setFolder("");
    },
    onError(err: ServerError) {
      toast({
        title: err.response.data.message,
        variant: "destructive",
      });
    },
  });

  const { mutate: fileCreation, isPending: isFileCreating } = useMutation({
    mutationKey: [`createFile`],
    mutationFn: async () => {
      const { data } = await projectItemApi.post(`/createFile`, {
        name: file,
        isFolder: false,
        projectId: id,
      });
      return data;
    },
    onSuccess() {
      setShowInput({ ...showInput, visible: false });
      setFile("");
      queryClient.invalidateQueries([
        `getProjectFileFolders${id}`,
        0,
      ] as InvalidateQueryFilters);
    },
    onError(err: ServerError) {
      toast({
        title: err.response.data.message,
        variant: "destructive",
      });
    },
  });

  const createFile = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" || e.key === "Enter") {
      const realFile = file.split(".")[1];
      if (!realFile || realFile !== "js") {
        toast({
          title: "File Extrension must include js",
          variant: "destructive",
        });
        return;
      }

      const files = currentProjectFP.items.filter(
        (project) => project.type === "folder"
      );

      const fileAlreadyExist = files.find(
        (projectFile) => projectFile.name === file
      );

      if (fileAlreadyExist) {
        toast({
          title: "File already Exist",
          variant: "destructive",
        });
        return;
      }

      dispatch(
        setItemsCP({
          _id: uuid(),
          type: "file",
          children: [],
          name: folder,
          creatorId: user?.id || "",
          projectId: currentProjectFP.projectId,
        })
      );
      fileCreation();
    }
  };
  const createFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const projectFolder = currentProjectFP.items.filter(
      (fold) => fold.type === "folder"
    );

    const isFolderAlreadyExist = projectFolder.find(
      (fold) => fold.name === folder
    );
    if (isFolderAlreadyExist) {
      toast({
        title: "Folder already exist",
        variant: "destructive",
      });
      return;
    }
    if (e.code === "Enter" || e.key === "Enter") {
      dispatch(
        setItemsCP({
          _id: uuid(),
          type: "folder",
          children: [],
          name: folder,
          creatorId: user?.id || "",
          projectId: currentProjectFP.projectId,
        })
      );
      folderCreation();
    }
  };

  const { mutate: fileCreationInFolder, isPending: isFileCreatingInFolder } =
    useMutation({
      mutationKey: [`createFileInFolder`],
      mutationFn: async () => {
        const { data } = await projectItemApi.patch(
          `/updateFolder/${showFolderFile.folderId}`,
          {
            name: file,
          }
        );
        return data;
      },
      onSuccess(data) {
        setShowFolderFile({ ...showFolderFile, visible: false, folderId: "" });
        setFile("");
        queryClient.invalidateQueries([
          `getProjectFileFolders${id}`,
          0,
        ] as InvalidateQueryFilters);
        toast({
          title: data.message,
        });
      },
      onError(err: ServerError) {
        toast({
          title: err.response.data.message,
          variant: "destructive",
        });
      },
    });
  const createFileInFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" || e.key === "Enter") {
      const realFile = file.split(".")[1];
      if (!realFile || realFile !== "js") {
        toast({
          title: "File Extrension must include js",
          variant: "destructive",
        });
        return;
      }
      const projectFolder = currentProjectFP.items.find(
        (fold) => fold._id === showFolderFile.folderId
      );

      // const isFileAlreadyExistInFolder = projectFolder?.items.find(
      //   (folderFile) => folderFile.name === file
      // );
      // if (isFileAlreadyExistInFolder) {
      //   toast({
      //     title: "File already exist in folder",
      //     variant: "destructive",
      //   });
      //   return;
      // }
      fileCreationInFolder();
    }
  };
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <div className="flex items-center gap-3 relative w-full p-2 h-12">
          <p className="capitalize text-[16px]">
            {currentProjectFP.projectName}
          </p>
          <AccordionTrigger
            data-state="open"
            id={"n"}
            className="[&[data-state=open]>svg]:rotate-0"
          >
            <FilePlus
              cursor={"pointer"}
              onClick={() => setShowInput({ isFolder: false, visible: true })}
            />
          </AccordionTrigger>
          <AccordionTrigger
            data-state="open"
            id={"n"}
            className="[&[data-state=open]>svg]:rotate-0"
          >
            <FolderPlus
              cursor={"pointer"}
              onClick={() => setShowInput({ isFolder: true, visible: true })}
            />
          </AccordionTrigger>
          <AccordionTrigger className="absolute right-0 top-[5px] text-2xl" />{" "}
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default HandleFilesAndFolders;
type FileFolderContentProps = {
  items: ProjectItemTree[];
  fileId?: string;
  onCreateFile: (parentId: string | null, name: string) => void;
  onCreateFolder: (parentId: string | null, name: string) => void;
};

const FileFolderContent = ({
  items,
  fileId,
  onCreateFile,
  onCreateFolder,
}: FileFolderContentProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [newName, setNewName] = useState("");
  const [showInput, setShowInput] = useState<{
    parentId: string | null;
    isFolder: boolean;
  } | null>(null);

  const handleCreate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!newName.trim()) return;
      if (showInput?.isFolder) {
        onCreateFolder(showInput.parentId, newName);
      } else {
        onCreateFile(showInput.parentId, newName);
      }
      setNewName("");
      setShowInput(null);
    }
  };

  const renderItems = (
    children: ProjectItem[],
    parentId: string | null = null
  ) => {
    return children.map((item) => {
      if (item.type === "folder") {
        return (
          <Accordion
            type="single"
            collapsible
            key={item._id}
            className="border-b-0 ml-2"
          >
            <AccordionItem value={item._id}>
              <div className="flex items-center gap-2 h-10 relative">
                <Folder color="yellow" />
                <span>{item.name}</span>
                <div className="flex gap-2 absolute right-0">
                  <FilePlus
                    size={16}
                    className="cursor-pointer"
                    onClick={() =>
                      setShowInput({ parentId: item._id, isFolder: false })
                    }
                  />
                  <FolderPlus
                    size={16}
                    className="cursor-pointer"
                    onClick={() =>
                      setShowInput({ parentId: item._id, isFolder: true })
                    }
                  />
                </div>
                <AccordionTrigger className="top-[12px] text-2xl" />
              </div>

              <AccordionContent className="ml-5">
                {showInput?.parentId === item._id && (
                  <div className="flex items-center gap-2">
                    {showInput.isFolder ? (
                      <Folder color="yellow" />
                    ) : (
                      <FileJson color="green" />
                    )}
                    <Input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onKeyDown={handleCreate}
                      autoFocus
                      className="border-none outline-none h-6"
                    />
                  </div>
                )}
                {item.children && renderItems(item.children, item._id)}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      }

      return (
        <div
          key={item._id}
          className={`flex items-center gap-2 ml-5 cursor-pointer p-1 rounded ${
            fileId === item._id
              ? "bg-gray-200 dark:bg-gray-700"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          onClick={() => navigate(`/project/${id}/js/${item.name}/${item._id}`)}
        >
          <FileJson color="green" />
          <span>{item.name}</span>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {showInput?.parentId === null && (
        <div className="flex items-center gap-2 ml-2">
          {showInput.isFolder ? (
            <Folder color="yellow" />
          ) : (
            <FileJson color="green" />
          )}
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleCreate}
            autoFocus
            className="border-none outline-none h-6"
          />
        </div>
      )}
      {renderItems(items)}
    </div>
  );
};
