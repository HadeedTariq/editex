import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAppRouter } from "../hooks/useAppRouter";
import { FileJson, Folder } from "lucide-react";

const PrivateFolderFileSturucture = () => {
  const { id, filename } = useParams();
  const { currentProjectFP } = useAppRouter();
  if (!id || id.length !== 24) return <Navigate to={"/"} />;
  if (!currentProjectFP) return <Navigate to={"/"} />;

  const navigate = useNavigate();
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <div className="flex items-center gap-3 relative w-full p-2">
          <p className="capitalize text-[16px]">Private Project</p>
          <AccordionTrigger className="absolute right-0 top-[12px] text-2xl" />{" "}
        </div>
        <AccordionContent>
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
                    onClick={() => navigate(`js/${exp.name}/${exp._id}`)}>
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

export default PrivateFolderFileSturucture;
