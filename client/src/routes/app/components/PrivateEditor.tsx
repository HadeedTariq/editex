import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import PrivateFolderFileSturucture from "./PrivateFolderFileSturucture";

export function PrivateEditor() {
  useEffect(() => {
    toast({
      title: "You can only save code 1 times",
      description:
        "You can only send code merging request one time so after you full sure then send a merging request",
    });
  }, []);
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[91.7vh] min-w-full rounded-lg border">
      <ResizablePanel defaultSize={20} className="border-r-4">
        <PrivateFolderFileSturucture />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>
        <Outlet />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
