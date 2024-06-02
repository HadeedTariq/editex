import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import FolderFileSturucture from "./FolderFileSturucture";
import { Outlet } from "react-router-dom";

export function Editor() {
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
