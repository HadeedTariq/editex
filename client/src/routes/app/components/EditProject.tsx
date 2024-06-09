import { useAppRouter } from "../hooks/useAppRouter";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useFullApp } from "@/hooks/useFullApp";
import { projectApi } from "@/lib/axios";
import { Navigate } from "react-router-dom";

interface EditProjectType {
  projectId: string;
}

const EditProject = ({ projectId }: EditProjectType) => {
  const { projects } = useAppRouter();
  const { user } = useFullApp();
  const queryClient = useQueryClient();
  const project = projects.find((proj) => proj._id === projectId);
  const [name, setName] = useState(project?.name);
  const [password, setPassword] = useState(project?.password);
  const [publicProject, setPublicProject] = useState(
    project?.public ? true : false
  );
  const { mutate: editProject, isPending } = useMutation({
    mutationKey: [`editProject${project?._id}`],
    mutationFn: async () => {
      if (!user) {
        toast({
          title: "Authentication required",
        });
        return;
      }

      const { data } = await projectApi.put(`/${project?._id}`, {
        name,
        public: publicProject,
        password: password ? password : null,
      });
      return data;
    },
    onSuccess(data: any) {
      toast({
        title: data.message || "Project updated successfully",
      });
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
  if (!project) return <p>Project not found</p>;

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <Button variant={"edit"} className="w-full">
          Edit Project
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="gap-4">
          <AlertDialogTitle>Edit your project</AlertDialogTitle>
          <Input
            placeholder="Edit Project..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="col-span-3"
          />
          <div className="flex items-center gap-2">
            <h3>Public</h3>
            <label
              htmlFor="AcceptConditions"
              className={`relative h-6 w-12 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent]  ${
                publicProject ? "bg-green-500" : ""
              }`}>
              <input
                type="checkbox"
                id="AcceptConditions"
                className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
                onClick={() => setPublicProject((prev: boolean) => !prev)}
              />

              <span
                className={`absolute inset-y-0 start-0 z-10 m-1 inline-flex size-5 items-center justify-center rounded-full bg-white text-gray-400 transition-all ${
                  publicProject ? "start-6 text-green-600" : ""
                }`}>
                {publicProject && <Check />}
                {!publicProject && <X />}
              </span>
            </label>
          </div>
          {!publicProject && (
            <Input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="project password"
              type="password"
              className="col-span-3"
            />
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button disabled={isPending} onClick={() => editProject()}>
            Edit
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditProject;
