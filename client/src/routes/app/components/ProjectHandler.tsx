import { useFullApp } from "@/hooks/useFullApp";
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
import ProjectHandlerToggleBar from "./ProjectHandlerToggleBar";
import { SquarePlus } from "lucide-react";
import { useAppRouter } from "../hooks/useAppRouter";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { projectApi } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import Projects from "../pages/Projects";
import { X } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ProjectHandler = () => {
  const [isAlert, setIsALert] = useState(true);
  const queryClient = useQueryClient();
  const { user } = useFullApp();
  const { isProjectPublic } = useAppRouter();

  const nameRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);

  const { mutate: createProject, isPending } = useMutation({
    mutationKey: ["createProject"],
    mutationFn: async () => {
      if (!user) {
        toast({
          title: "Authentication required",
        });
        return;
      }
      if (!isProjectPublic && !passwordRef.current?.value) {
        toast({
          title: "Password required",
        });
        return;
      }

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
    },
    onError(err: ServerError) {
      toast({
        title: err.response.data.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div>
      {isAlert && (
        <Alert variant={"destructive"}>
          <X size={25} onClick={() => setIsALert(false)} />
          <AlertTitle>Important Note!</AlertTitle>
          <AlertDescription>
            Your public projects are available to all the users of the app and
            anyone can directly change the code
          </AlertDescription>
        </Alert>
      )}
      <AlertDialog>
        <AlertDialogTrigger className="w-fit p-4">
          <div className="dark:bg-gray-600 bg-gray-200 hover:bg-zinc-300  rounded-md dark:hover:bg-gray-700 transition duration-300 gap-2 flex items-center justify-center w-[200px] h-[200px]">
            <SquarePlus size={30} className="text-rose-500" />
            <h4 className="text-[20px] font-semibold text-rose-500">
              Create Project
            </h4>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader className="gap-4">
            <AlertDialogTitle>Create your project</AlertDialogTitle>
            <Input
              placeholder="New Project..."
              ref={nameRef}
              className="col-span-3"
            />
            <ProjectHandlerToggleBar />
            {!isProjectPublic && (
              <Input
                ref={passwordRef}
                placeholder="project password"
                type="password"
                className="col-span-3"
              />
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button disabled={isPending} onClick={() => createProject()}>
              Create
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Projects />
    </div>
  );
};

export default ProjectHandler;
