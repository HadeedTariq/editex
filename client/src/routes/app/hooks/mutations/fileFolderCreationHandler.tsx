import { useState } from "react";

import {
  useMutation,
  useQueryClient,
  InvalidateQueryFilters,
} from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { projectItemApi } from "@/lib/axios";

import { useAppRouter } from "../useAppRouter";
import {
  findFolderAndCheckFiles,
  findFolderAndCheckFolders,
} from "@/lib/utils";

type Props = {
  projectId: string;
};

export const useFileFolderHandler = ({ projectId }: Props) => {
  const { currentProjectFP } = useAppRouter();
  const queryClient = useQueryClient();

  const [showInput, setShowInput] = useState<{
    visible: boolean;
    isFolder: boolean;
    parentId: string | null;
  }>({
    visible: false,
    isFolder: false,
    parentId: null,
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
    fileName: string
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
    const fileAlreadyExist = findFolderAndCheckFiles(
      currentProjectFP?.items || [],
      parentId,
      fileName
    );

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

    const isFolderAlreadyExist = findFolderAndCheckFolders(
      currentProjectFP?.items || [],
      parentId,
      folderName
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
    // handlers
    createFile,
    createFolder,
    // mutation status
    isFolderCreating,
    isFileCreating,
  };
};
