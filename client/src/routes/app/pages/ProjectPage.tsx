import { Navigate, useParams } from "react-router-dom";
import { Editor } from "../components/Editor";

import { useDispatch } from "react-redux";
import {
  setCurrentProjectFP,
  setCurrentProjectOpenFilesEmpty,
} from "../reducer/appReducer";
import { useQuery } from "@tanstack/react-query";

import Loading from "@/components/ui/loading";
import { projectItemApi } from "@/lib/axios";
import ProjectErrorState from "../components/ProjectErrorState";

const ProjectPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  if (!id || id.length !== 24) return <Navigate to={"/"} />;

  const { isLoading, error, isError } = useQuery({
    queryKey: [`getProjectFileFolders${id}`],
    queryFn: async () => {
      const {
        data,
      }: {
        data: {
          projectName: string;
          projectId: string;
          hierarchy: ProjectItemTree[];
        };
      } = await projectItemApi.get(`/${id}`);

      dispatch(
        setCurrentProjectFP({
          projectName: data.projectName,
          projectId: data.projectId,
          items: data.hierarchy,
        })
      );
      dispatch(setCurrentProjectOpenFilesEmpty());
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
    refetchInterval: 10000,
  });

  if (isLoading) return <Loading />;
  if (isError) return <ProjectErrorState error={error} />;

  return <Editor />;
};

export default ProjectPage;
