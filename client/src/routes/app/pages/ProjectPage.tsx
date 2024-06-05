import { Navigate, useParams } from "react-router-dom";
import { useAppRouter } from "../hooks/useAppRouter";
import { Editor } from "../components/Editor";
import { useDispatch } from "react-redux";
import {
  setCurrentProjectFP,
  setCurrentProjectOpenFilesEmpty,
} from "../reducer/appReducer";
import { useQuery } from "@tanstack/react-query";
import { itemApi } from "@/lib/axios";
import Loading from "@/components/ui/loading";

const ProjectPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { projects } = useAppRouter();
  if (!id || id.length !== 24) return <Navigate to={"/"} />;
  const project = projects.find((proj) => proj._id === id);
  if (!project) return <Navigate to={"/"} />;

  const { isLoading } = useQuery({
    queryKey: [`getProjectFileFolders${id}`],
    queryFn: async () => {
      const { data } = await itemApi.get(`/${id}`);
      dispatch(
        setCurrentProjectFP({
          projectName: project.name,
          projectId: project._id,
          items: data,
        })
      );
      dispatch(setCurrentProjectOpenFilesEmpty());
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isLoading) return <Loading />;

  return <Editor />;
};

export default ProjectPage;
