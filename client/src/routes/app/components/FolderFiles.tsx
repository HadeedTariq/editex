import { FileJson } from "lucide-react";

type FolderFilesType = {
  folderFiles: { name: string; isFolder: boolean; _id?: string }[];
};
const FolderFiles = ({ folderFiles }: FolderFilesType) => {
  return (
    <>
      {folderFiles?.map((folderFile) => (
        <p
          key={folderFile._id}
          className={`flex items-center gap-2 cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-300 transition duration-300 ml-2`}
        >
          <FileJson color="green" />
          {folderFile.name}
        </p>
      ))}
    </>
  );
};

export default FolderFiles;
