import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Editor } from "../components/Editor";

import { useDispatch } from "react-redux";
import { setCurrentProjectFP } from "../reducer/appReducer";
import { useQuery } from "@tanstack/react-query";

import Loading from "@/components/ui/loading";
import { projectItemApi } from "@/lib/axios";
import ProjectErrorState from "../components/ProjectErrorState";
import { useAppRouter } from "../hooks/useAppRouter";
import { useEffect } from "react";

const ProjectPage = () => {
  const dispatch = useDispatch();
  const { currentProjectOpenFile } = useAppRouter();
  const navigate = useNavigate();
  const { id, fileName } = useParams();
  const [searchParams] = useSearchParams();
  const fileId = searchParams.get("fileId");
  const parentId = searchParams.get("parentId");

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
          currentProjectFp: {
            projectName: data.projectName,
            projectId: data.projectId,
            items: data.hierarchy,
          },
          parentId: parentId,
          fileId: fileId || undefined,
          fileName: fileName,
        })
      ).payload;
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  });
  useEffect(() => {
    if (!isLoading && !currentProjectOpenFile) {
      navigate(`/projects/${id}`);
    }
  }, [currentProjectOpenFile]);

  if (isLoading) return <Loading />;
  if (isError) return <ProjectErrorState error={error} />;

  return <Editor />;
};

export default ProjectPage;
