import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import {
  useMutation,
  useQueryClient,
  InvalidateQueryFilters,
} from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { projectItemApi } from "@/lib/axios";
import { useFullApp } from "@/hooks/useFullApp";
import { setItemsCP } from "../../reducer/appReducer";
import { useAppRouter } from "../useAppRouter";

type FolderFile = {
  visible: boolean;
  isFolder: boolean;
  folderId: string;
};

type Props = {
  projectId: string;
};

export const useFileFolderHandler = ({ projectId }: Props) => {
  const { user } = useFullApp();
  const { currentProjectFP } = useAppRouter();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const [showInput, setShowInput] = useState<{
    visible: boolean;
    isFolder: boolean;
    parentId: string | null;
  }>({
    visible: false,
    isFolder: false,
    parentId: null,
  });
  const [showFolderFile, setShowFolderFile] = useState<FolderFile>({
    visible: false,
    isFolder: false,
    folderId: "",
  });
  const [file, setFile] = useState("");
  const [folder, setFolder] = useState("");

  // --- Mutations ---
  const { mutate: folderCreation, isPending: isFolderCreating } = useMutation({
    mutationKey: [`createFolder`],
    mutationFn: async ({ parentId }: { parentId: string }) => {
      const { data } = await projectItemApi.post(`/createFolder`, {
        name: folder,
        projectId,
        parentId,
      });
      return { ...data, parentId };
    },
    onSuccess(data: any) {
      setShowInput({ ...showInput, visible: false, parentId: data.parentId });
      setFolder("");
      queryClient.invalidateQueries([
        `getProjectFileFolders${projectId}`,
      ] as InvalidateQueryFilters);
    },
    onError(err: ServerError) {
      toast({ title: err.response.data.message, variant: "destructive" });
    },
  });

  const { mutate: fileCreation, isPending: isFileCreating } = useMutation({
    mutationKey: [`createFile`],
    mutationFn: async ({ parentId }: { parentId: string }) => {
      const { data } = await projectItemApi.post(`/createFile`, {
        name: file,
        projectId,
        parentId,
      });
      return { ...data, parentId };
    },
    onSuccess(data: any) {
      setShowInput({ ...showInput, visible: false, parentId: data.parentId });
      setFile("");
      queryClient.invalidateQueries([
        `getProjectFileFolders${projectId}`,
      ] as InvalidateQueryFilters);
    },
    onError(err: ServerError) {
      toast({ title: err.response.data.message, variant: "destructive" });
    },
  });

  // --- Handlers ---
  const createFile = (
    e: React.KeyboardEvent<HTMLInputElement>,
    parentId: string
  ) => {
    if (e.key !== "Enter") return;

    const realFile = file.split(".")[1];
    if (!realFile || realFile !== "js") {
      toast({
        title: "File extension must include .js",
        variant: "destructive",
      });
      return;
    }

    const files = currentProjectFP?.items.filter(
      (project) => project.type === "file"
    );
    const fileAlreadyExist = files?.find((f) => f.name === file);
    if (fileAlreadyExist) {
      toast({ title: "File already exists", variant: "destructive" });
      return;
    }

    dispatch(
      setItemsCP({
        _id: uuid(),
        type: "file",
        children: [],
        name: file,
        creatorId: user?.id || "",
        projectId,
      })
    );
    fileCreation({ parentId });
  };

  const createFolder = (
    e: React.KeyboardEvent<HTMLInputElement>,
    parentId: string
  ) => {
    if (e.key !== "Enter") return;

    const projectFolders = currentProjectFP?.items.filter(
      (fold) => fold.type === "folder"
    );
    const isFolderAlreadyExist = projectFolders?.find(
      (fold) => fold.name === folder
    );

    if (isFolderAlreadyExist) {
      toast({ title: "Folder already exists", variant: "destructive" });
      return;
    }

    dispatch(
      setItemsCP({
        _id: uuid(),
        type: "folder",
        children: [],
        name: folder,
        creatorId: user?.id || "",
        projectId,
      })
    );
    folderCreation({ parentId });
  };

  // --- Hook API ---
  return {
    // state
    showInput,
    setShowInput,
    showFolderFile,
    setShowFolderFile,
    file,
    setFile,
    folder,
    setFolder,

    // handlers
    createFile,
    createFolder,

    // mutation status
    isFolderCreating,
    isFileCreating,
  };
};
