import { Navigate, useParams } from "react-router-dom";
import { useAppRouter } from "../hooks/useAppRouter";
import { Editor } from "../components/Editor";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCurrentProjectFP } from "../reducer/appReducer";

const ProjectPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { projects } = useAppRouter();
  if (!id || id.length !== 24) return <Navigate to={"/"} />;
  const project = projects.find((proj) => proj._id === id);
  if (!project) return <Navigate to={"/"} />;
  useEffect(() => {
    dispatch(
      setCurrentProjectFP({
        projectName: project.name,
        projectId: project._id,
        items: [],
      })
    );
  }, []);

  return <Editor />;
};

export default ProjectPage;
