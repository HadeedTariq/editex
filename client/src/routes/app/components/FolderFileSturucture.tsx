import { Navigate, useParams } from "react-router-dom";
import { useAppRouter } from "../hooks/useAppRouter";
import HandleFilesAndFolders from "./editor-rendering/HandleFilesAndFolders";

const FolderFileSturucture = () => {
  const { id } = useParams();

  const { currentProjectFP, currentProjectOpenFile } = useAppRouter();

  if (!id || id.length !== 24) return <Navigate to={"/"} />;
  if (!currentProjectFP) return <Navigate to={"/"} />;

  return (
    <HandleFilesAndFolders
      currentProjectFP={currentProjectFP}
      items={currentProjectFP.items}
      currentProjectOpenFile={currentProjectOpenFile}
    />
  );
};

export default FolderFileSturucture;
