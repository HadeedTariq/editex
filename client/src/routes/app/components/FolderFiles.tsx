import { FileJson } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

type FolderFilesType = {
  folderFiles: { name: string; isFolder: boolean; _id?: string }[];
  folderName: string;
};
const FolderFiles = ({ folderFiles }: FolderFilesType) => {
  const navigate = useNavigate();
  const { fileId } = useParams();
  return (
    <>
      {folderFiles?.map((folderFile) => (
        <p
          key={folderFile._id}
          className={`flex items-center gap-2 cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-300 transition duration-300 ml-2 mt-2
            ${fileId === folderFile._id && "bg-gray-300 dark:bg-gray-700"}
            `}
          onClick={() => navigate(`js/${folderFile.name}/${folderFile._id}`)}
        >
          <FileJson color="green" />
          {folderFile.name}
        </p>
      ))}
    </>
  );
};

export default FolderFiles;
