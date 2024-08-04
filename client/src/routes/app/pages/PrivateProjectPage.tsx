import { Navigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setCurrentProjectFP,
  setCurrentProjectOpenFilesEmpty,
  setProjectCode,
} from "../reducer/appReducer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { itemApi, projectApi } from "@/lib/axios";
import Loading from "@/components/ui/loading";
import { PrivateEditor } from "../components/PrivateEditor";
import { useAppRouter } from "../hooks/useAppRouter";
import { useFullApp } from "@/hooks/useFullApp";

const PrivateProjectPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { projects } = useAppRouter();
  const { user } = useFullApp();
  if (!id || id.length !== 24) return <Navigate to={"/"} />;
  const project = projects.find((proj) => proj._id === id);
  if (!project || (project.public === false && project.creator !== user?.id))
    return <Navigate to={"/"} />;
  const { isPending, mutate } = useMutation({
    mutationKey: [`getProjectFileFolders${id}`],
    mutationFn: async () => {
      const { data } = await itemApi.get(`/${id}`);

      const filesCode = data.map((file: any) => {
        const code = file.code ? file.code : "";
        const fileId = file._id;
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
  });
  const { isLoading: isUserCheckingLoading, isError } = useQuery({
    queryKey: ["checkUserInContributors"],
    queryFn: async () => {
      const { data } = await projectApi.post("checkUserInContributors", {
        projectId: id,
      });
      mutate();
      return data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  if (isUserCheckingLoading) return <Loading />;
  if (isError) return <Navigate to={"/"} />;

  if (isPending) return <Loading />;

  return <PrivateEditor />;
};

export default PrivateProjectPage;
