import { Navigate, useParams } from "react-router-dom";
import { useAppRouter } from "../hooks/useAppRouter";
import { Editor } from "../components/Editor";

import { useFullApp } from "@/hooks/useFullApp";

const ProjectPage = () => {
  const { id } = useParams();
  const { projects } = useAppRouter();
  const { user } = useFullApp();

  if (!id || id.length !== 24) return <Navigate to={"/"} />;
  const project = projects.find((proj) => proj._id === id);
  if (!project || (project.public === false && project.creator !== user?.id))
    return <Navigate to={"/"} />;

  return <Editor />;
};

export default ProjectPage;
