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

  // --- Mutations ---
  const {
    mutate: folderCreation,
    isPending: isFolderCreating,
    isError: isFolderCreationError,
  } = useMutation({
    mutationKey: [`createFolder`],
    mutationFn: async ({
      parentId,
      folderName,
    }: {
      parentId: string;
      folderName: string;
    }) => {
      const { data } = await projectItemApi.post(`/createFolder`, {
        name: folderName,
        projectId,
        parentId,
      });
      return { ...data, parentId };
    },
    onSuccess(data: any) {
      setShowInput({ ...showInput, visible: false, parentId: data.parentId });
      queryClient.invalidateQueries([
        `getProjectFileFolders${projectId}`,
      ] as InvalidateQueryFilters);
    },
    onError(err: ServerError) {
      toast({ title: err.response.data.message, variant: "destructive" });
    },
  });

  const {
    mutate: fileCreation,
    isPending: isFileCreating,
    isError: isFileCreationError,
  } = useMutation({
    mutationKey: [`createFile`],
    mutationFn: async ({
      parentId,
      fileName,
    }: {
      parentId: string;
      fileName: string;
    }) => {
      const { data } = await projectItemApi.post(`/createFile`, {
        name: fileName,
        projectId,
        parentId,
      });
      return { ...data, parentId };
    },
    onSuccess(data: any) {
      setShowInput({ ...showInput, visible: false, parentId: data.parentId });
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
    parentId: string,
    fileName: string,
    parentIndex: number
  ) => {
    if (e.key !== "Enter") return { success: false };

    const realFile = fileName.split(".")[1];
    if (!realFile || realFile !== "js") {
      toast({
        title: "File extension must include .js",
        variant: "destructive",
      });
      return { success: false };
    }
    // ~ so this is only checking for the root so for checking in that particular hierarchuy it doesn't exist we have to check with in the parent id that with in the parent the file don't exist same for the folder
    let files: ProjectItemTree[] | undefined;
    if (!parentId) {
      files = currentProjectFP?.items.filter((item) => item.type === "file");
    } else if (parentId) {
      // ~ so as the things are in different hierarchy how does I find with in the children so for that If I utilize the parent Index
      files = currentProjectFP?.items[parentIndex].children.filter(
        (item) => item.type === "file"
      );
    }
    const fileAlreadyExist = files?.find((f) => f.name === fileName);
    if (fileAlreadyExist) {
      toast({ title: "File already exists", variant: "destructive" });
      return { success: false };
    }
    // ~ so this state related stuff also have to be fixed
    // dispatch(
    //   setItemsCP({
    //     _id: uuid(),
    //     type: "file",
    //     children: [],
    //     name: fileName,
    //     creatorId: user?.id || "",
    //     projectId,
    //   })
    // );
    fileCreation({ parentId, fileName });
    return { success: !isFileCreationError };
  };

  const createFolder = (
    e: React.KeyboardEvent<HTMLInputElement>,
    parentId: string,
    folderName: string
  ) => {
    if (e.key !== "Enter") return { success: false };

    const projectFolders = currentProjectFP?.items.filter(
      (fold) => fold.type === "folder"
    );
    const isFolderAlreadyExist = projectFolders?.find(
      (fold) => fold.name === folderName
    );

    if (isFolderAlreadyExist) {
      toast({ title: "Folder already exists", variant: "destructive" });
      return { success: false };
    }

    // dispatch(
    //   setItemsCP({
    //     _id: uuid(),
    //     type: "folder",
    //     children: [],
    //     name: folderName,
    //     creatorId: user?.id || "",
    //     projectId,
    //   })
    // );
    folderCreation({ parentId, folderName });
    return { success: !isFolderCreationError };
  };

  // --- Hook API ---
  return {
    // state
    showInput,
    setShowInput,
    showFolderFile,
    setShowFolderFile,
    // handlers
    createFile,
    createFolder,
    // mutation status
    isFolderCreating,
    isFileCreating,
  };
};
