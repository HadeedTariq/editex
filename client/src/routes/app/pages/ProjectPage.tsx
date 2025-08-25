import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { useAppRouter } from "../hooks/useAppRouter";
import { Editor } from "../components/Editor";

import { useFullApp } from "@/hooks/useFullApp";

const ProjectPage = () => {
  const { id } = useParams();
  const [searchParam] = useSearchParams();
  const projectType = searchParam.get("projectType");
  const { projects, publicProjects } = useAppRouter();
  const { user } = useFullApp();

  if (!id || id.length !== 24) return <Navigate to={"/"} />;
  let project;
  if (projectType && projectType === "public") {
    project = publicProjects.find((proj) => proj._id === id);
  } else {
    project = projects.find((proj) => proj._id === id);
  }
  if (!project || (project.public === false && project.creator !== user?.id))
    return <Navigate to={"/"} />;

  return <Editor id={project._id} project={project} />;
};

export default ProjectPage;
