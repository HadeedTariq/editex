import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import FolderFileSturucture from "./FolderFileSturucture";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import {
  setCurrentProjectFP,
  setCurrentProjectOpenFilesEmpty,
  setProjectCode,
} from "../reducer/appReducer";
import { useQuery } from "@tanstack/react-query";
import { itemApi } from "@/lib/axios";
import Loading from "@/components/ui/loading";

export function Editor() {
  const dispatch = useDispatch();

  const { isLoading } = useQuery({
    queryKey: [`getProjectFileFolders${id}`],
    queryFn: async () => {
      const { data } = await itemApi.get(`/${id}`);

      const filesCode = data.map((file: any) => {
        const code = file.code ? file.code : "";

        const fileId = file._id;
        if (file.items.length > 0) {
          let folderFiles = file.items?.filter(
            (folderFile: any) => folderFile.code && folderFile.code !== ""
          );
          folderFiles = folderFiles?.map((folderFile: any) => {
            const fileId = folderFile._id;
            const code = folderFile.code;
            return { fileId, code };
          });
          if (folderFiles.length > 0) {
            dispatch(
              setProjectCode({
                projectId: id,
                filesCode: folderFiles || [],
              })
            );
          }
        }

        return { code, fileId };
      });

      dispatch(
        setCurrentProjectFP({
          projectName: project.name,
          projectId: project._id,
          items: data,
        })
      );
      dispatch(setCurrentProjectOpenFilesEmpty());
      dispatch(
        setProjectCode({
          projectId: id,
          filesCode: filesCode || [],
        })
      );
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isLoading) return <Loading />;
  useEffect(() => {
    toast({
      title: "Save the code",
      description: "Please save the code So that you don't lose it",
    });
  }, []);
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[91.7vh] min-w-full rounded-lg border"
    >
      <ResizablePanel defaultSize={20} className="border-r-4">
        <FolderFileSturucture />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>
        <Outlet />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
