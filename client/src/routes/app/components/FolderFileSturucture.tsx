import { Navigate, useParams } from "react-router-dom";
import { useAppRouter } from "../hooks/useAppRouter";

const FolderFileSturucture = () => {
  const { id } = useParams();

  const { currentProjectFP } = useAppRouter();

  if (!id || id.length !== 24) return <Navigate to={"/"} />;
  if (!currentProjectFP) return <Navigate to={"/"} />;

  return <></>;
};

export default FolderFileSturucture;
