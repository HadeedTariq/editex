import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAppRouter } from "../hooks/useAppRouter";
import { FileJson, FilePlus, Folder, FolderPlus } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { setItemsCP } from "../reducer/appReducer";
import { v4 as uuid } from "uuid";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { itemApi } from "@/lib/axios";

const FolderFileSturucture = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { id, filename } = useParams();
  const { currentProjectFP } = useAppRouter();
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });
  const [file, setFile] = useState("");
  const [folder, setFolder] = useState("");
  if (!id || id.length !== 24) return <Navigate to={"/"} />;
  if (!currentProjectFP) return <Navigate to={"/"} />;

  const { mutate: folderCreation, isPending: isFolderCreating } = useMutation({
    mutationKey: [`createFolder`],
    mutationFn: async () => {
      const { data } = await itemApi.post(`/createFolder`, {
        name: folder,
        isFolder: true,
        projectId: id,
      });
      return data;
    },
    onSuccess() {
      setShowInput({ ...showInput, visible: false });
      setFolder("");
    },
    onError(err: ServerError) {
      toast({
        title: err.response.data.message,
        variant: "destructive",
      });
    },
  });

  const { mutate: fileCreation, isPending: isFileCreating } = useMutation({
    mutationKey: [`createFile`],
    mutationFn: async () => {
      const { data } = await itemApi.post(`/createFile`, {
        name: file,
        isFolder: false,
        projectId: id,
      });
      return data;
    },
    onSuccess() {
      setShowInput({ ...showInput, visible: false });
      setFile("");
      queryClient.invalidateQueries([
        `getProjectFileFolders${id}`,
        0,
      ] as InvalidateQueryFilters);
    },
    onError(err: ServerError) {
      toast({
        title: err.response.data.message,
        variant: "destructive",
      });
    },
  });

  const createFile = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      const realFile = file.split(".")[1];
      if (!realFile || realFile !== "html") {
        toast({
          title: "File Extrension must include html",
          variant: "destructive",
        });
        return;
      }

      const files = currentProjectFP.items.filter(
        (project) => project.isFolder === false
      );

      const isFileAlreadyExist = files.find(
        (projectFile) => projectFile.name === file
      );

      if (isFileAlreadyExist) {
        toast({
          title: "File already Exist",
          variant: "destructive",
        });
        return;
      }

      dispatch(
        setItemsCP({
          _id: uuid(),
          isFolder: false,
          items: [],
          name: file,
        })
      );
      fileCreation();
    }
  };
  const createFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      dispatch(
        setItemsCP({
          _id: uuid(),
          isFolder: true,
          items: [],
          name: folder,
        })
      );
      folderCreation();
    }
  };

  const navigate = useNavigate();
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <div className="flex items-center gap-3 relative w-full p-2">
          <p className="capitalize text-[16px]">
            {currentProjectFP.projectName}
          </p>
          <AccordionTrigger
            data-state="open"
            id={"n"}
            className="[&[data-state=open]>svg]:rotate-0">
            <FilePlus
              cursor={"pointer"}
              onClick={() => setShowInput({ isFolder: false, visible: true })}
            />
          </AccordionTrigger>
          <AccordionTrigger
            data-state="open"
            id={"n"}
            className="[&[data-state=open]>svg]:rotate-0">
            <FolderPlus
              cursor={"pointer"}
              onClick={() => setShowInput({ isFolder: true, visible: true })}
            />
          </AccordionTrigger>
          <AccordionTrigger className="absolute right-0 top-[12px] text-2xl" />{" "}
        </div>
        <AccordionContent>
          {showInput.visible &&
            (showInput.isFolder ? (
              <div className="flex items-center gap-2">
                <Folder color="yellow" />
                <Input
                  value={folder}
                  className="border-none outline-none"
                  autoFocus
                  onBlur={() => setShowInput({ ...showInput, visible: false })}
                  onChange={(e) => setFolder(e.target.value)}
                  disabled={isFolderCreating}
                  onKeyDown={createFolder}
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FileJson color="green" />
                <Input
                  value={file}
                  className="border-none outline-none"
                  autoFocus
                  onBlur={() => setShowInput({ ...showInput, visible: false })}
                  onChange={(e) => setFile(e.target.value)}
                  disabled={isFileCreating}
                  onKeyDown={createFile}
                />
              </div>
            ))}
          <div className="flex flex-col gap-2 px-2">
            {currentProjectFP.items?.map((exp) => (
              <div className="flex flex-col " key={exp._id}>
                {exp.isFolder ? (
                  <p className="flex items-center gap-2">
                    <Folder color="yellow" />
                    {exp.name}
                  </p>
                ) : (
                  <p
                    className={`flex items-center gap-2 cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-300 transition duration-300 ${
                      filename === exp.name && "bg-gray-300 dark:bg-gray-700"
                    }`}
                    onClick={() => navigate(`html/${exp.name}/${exp._id}`)}>
                    <FileJson color="green" />
                    {exp.name}
                  </p>
                )}
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FolderFileSturucture;
