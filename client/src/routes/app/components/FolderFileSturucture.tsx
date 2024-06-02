import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Navigate, useParams } from "react-router-dom";
import { useAppRouter } from "../hooks/useAppRouter";
import { FileJson, FilePlus, Folder, FolderPlus } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { setItemsCP } from "../reducer/appReducer";
import { v4 as uuid } from "uuid";

const FolderFileSturucture = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentProjectFP } = useAppRouter();
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });
  const [file, setFile] = useState("");
  const [folder, setFolder] = useState("");
  if (!id || id.length !== 24) return <Navigate to={"/"} />;
  if (!currentProjectFP) return <Navigate to={"/"} />;
  const createFile = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      dispatch(
        setItemsCP({
          id: uuid(),
          isFolder: false,
          items: [],
          name: file,
        })
      );
      setShowInput({ ...showInput, visible: false });
      setFile("");
    }
  };
  const createFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      dispatch(
        setItemsCP({
          id: uuid(),
          isFolder: true,
          items: [],
          name: folder,
        })
      );
      setShowInput({ ...showInput, visible: false });
      setFolder("");
    }
  };

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
                  onKeyDown={createFile}
                />
              </div>
            ))}
          <div className="flex flex-col gap-2 px-2">
            {currentProjectFP.items?.map((exp) => (
              <div className="flex flex-col ">
                {exp.isFolder ? (
                  <p className="flex items-center gap-2">
                    <Folder color="yellow" />
                    {exp.name}
                  </p>
                ) : (
                  <p className="flex items-center gap-2">
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
