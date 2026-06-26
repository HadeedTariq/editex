import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { AlertCircle, SquarePlus } from "lucide-react";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { projectApi } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAppRouter } from "../../hooks/useAppRouter";
import ProjectHandlerToggleBar from "../ProjectHandlerToggleBar";
import Projects from "../../pages/Projects";

const ProjectCreationComponents = () => {
  const [isAlert, setIsALert] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { isProjectPublic } = useAppRouter();

  const nameRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);

  const { mutate: createProject, isPending } = useMutation({
    mutationKey: ["createProject"],
    mutationFn: async () => {
      const { data } = await projectApi.post("/create", {
        name: nameRef.current?.value,
        public: isProjectPublic,
        password: passwordRef.current?.value,
      });
      return data;
    },
    onSuccess(data: any) {
      toast({
        title: data.message || "Project created successfully",
      });
      if (nameRef.current?.value) {
        if (passwordRef.current?.value) {
          passwordRef.current.value = "";
        }
        nameRef.current.value = "";
      }
      queryClient.invalidateQueries([
        "getMyProjects",
        0,
      ] as InvalidateQueryFilters);
      setIsDialogOpen(false);
    },
    onError(err: ServerError) {
      toast({
        title: err.response.data.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="space-y-6 flex flex-col justify-center items-center">
      {isAlert && (
        <Alert
          variant="destructive"
          className="relative flex items-start gap-4 rounded-xl border px-5 py-4 shadow-sm"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

          <div className="flex-1">
            <AlertTitle className="text-sm font-semibold">
              Important Note
            </AlertTitle>

            <AlertDescription className="mt-1 text-sm leading-6">
              Your public projects are available to all the users of the app.
            </AlertDescription>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => setIsALert(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </Alert>
      )}

      <AlertDialog
        open={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(open)}
      >
        <AlertDialogTrigger asChild>
          <button className="group flex h-56 w-56 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card transition-all duration-300 hover:border-primary hover:bg-accent/30 hover:shadow-lg">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/15">
              <SquarePlus className="h-8 w-8 text-primary" />
            </div>

            <h3 className="mt-6 text-lg font-semibold">Create Project</h3>

            <p className="mt-2 max-w-[170px] text-center text-sm text-muted-foreground">
              Start a new collaborative coding project.
            </p>
          </button>
        </AlertDialogTrigger>

        <AlertDialogContent className="sm:max-w-lg rounded-2xl p-0 overflow-hidden">
          <AlertDialogHeader className="border-b px-8 py-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <SquarePlus className="h-5 w-5 text-primary" />
              </div>

              <div>
                <AlertDialogTitle className="text-xl font-semibold">
                  Create Project
                </AlertDialogTitle>

                <p className="text-sm text-muted-foreground">
                  Configure your project details before creating it.
                </p>
              </div>
            </div>
          </AlertDialogHeader>

          <div className="space-y-6 px-8 py-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Name</label>

              <Input
                ref={nameRef}
                placeholder="Enter project name..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    createProject();
                  }
                }}
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Visibility</label>

              <ProjectHandlerToggleBar />
            </div>

            {!isProjectPublic && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Password</label>

                <Input
                  ref={passwordRef}
                  type="password"
                  placeholder="Enter project password..."
                />
              </div>
            )}
          </div>

          <AlertDialogFooter className="border-t bg-muted/20 px-8 py-5">
            <AlertDialogCancel className="min-w-28">Cancel</AlertDialogCancel>

            <Button
              disabled={isPending}
              onClick={() => createProject()}
              className="min-w-36 gap-2"
            >
              <SquarePlus className="h-4 w-4" />
              {isPending ? "Creating..." : "Create Project"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Projects />
    </div>
  );
};

export default ProjectCreationComponents;
