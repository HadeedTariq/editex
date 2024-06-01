import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Navigate, useParams } from "react-router-dom";
import { useAppRouter } from "../hooks/useAppRouter";
import { FilePlus, FolderPlus } from "lucide-react";

const FolderFileSturucture = () => {
  const { id } = useParams();
  const { projects } = useAppRouter();
  if (!id || id.length !== 24) return <Navigate to={"/"} />;
  const project = projects.find((proj) => proj._id === id);
  if (!project) return <Navigate to={"/"} />;
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <div className="flex items-center gap-3 relative w-full p-2">
          <p className="capitalize text-[16px]">{project.name}</p>
          <AccordionTrigger data-state="closed" id={"n"}>
            <FilePlus cursor={"pointer"} />
          </AccordionTrigger>
          <AccordionTrigger data-state="closed" id={"n"}>
            <FolderPlus cursor={"pointer"} />
          </AccordionTrigger>
          <AccordionTrigger className="absolute right-0 top-[12px] text-2xl" />{" "}
        </div>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FolderFileSturucture;
