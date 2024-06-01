import { Navigate, useParams } from "react-router-dom";
import { useAppRouter } from "../hooks/useAppRouter";
import { Editor } from "../components/Editor";

const ProjectPage = () => {
  const { id } = useParams();
  const { projects } = useAppRouter();
  if (!id || id.length !== 24) return <Navigate to={"/"} />;
  const project = projects.find((proj) => proj._id === id);
  if (!project) return <Navigate to={"/"} />;

  return <Editor />;
};

export default ProjectPage;
