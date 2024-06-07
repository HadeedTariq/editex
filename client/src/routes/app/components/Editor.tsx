import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import FolderFileSturucture from "./FolderFileSturucture";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export function Editor() {
  useEffect(() => {
    toast({
      title: "Save the code",
      description: "Please save the code So that you don't lose it",
    });
  }, []);
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[91.7vh] min-w-full rounded-lg border">
      <ResizablePanel defaultSize={20} className="border-r-4">
        <FolderFileSturucture />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>
        <Outlet />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
