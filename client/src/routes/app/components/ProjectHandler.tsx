import { useFullApp } from "@/hooks/useFullApp";

import ProjectCreationComponents from "./my-projects/ProjectCreationComponents";
import { Navigate } from "react-router-dom";

const ProjectHandler = () => {
  const { user } = useFullApp();

  if (!user) return <Navigate to={"/"} />;

  return <ProjectCreationComponents />;
};

export default ProjectHandler;
