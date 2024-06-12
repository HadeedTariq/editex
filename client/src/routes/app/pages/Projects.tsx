import { projectApi } from "@/lib/axios";
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import ProjectSkeleton from "../components/ProjectSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useFullApp } from "@/hooks/useFullApp";
import { toast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { setProjects } from "../reducer/appReducer";
import EditProject from "../components/EditProject";
import { useNavigate } from "react-router-dom";
import ShareCode from "../components/ShareCode";

const Projects = () => {
  const dispatch = useDispatch();
  const { user } = useFullApp();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteProject, isPending } = useMutation({
    mutationKey: [`deleteProject${user?.id}`],
    mutationFn: async (id: string) => {
      if (!user) {
        toast({
          title: "Authentication required",
        });
        return;
      }

      const { data } = await projectApi.delete(`/delete?id=${id}`);
      return data;
    },
    onSuccess(data: any) {
      toast({
        title: data.message || "Project deleted successfully",
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

  const { data: myProjects, isLoading } = useQuery({
    queryKey: ["getMyProjects"],
    queryFn: async () => {
      const { data } = await projectApi.get("/");
      dispatch(setProjects(data));
      return data as ProjectsType[];
    },
  });

  if (isLoading) return <ProjectSkeleton />;
  return (
    <>
      <div className="flex flex-wrap items-center gap-2 px-4">
        {myProjects?.map((project) => (
          <Card key={project._id} className="w-[300px] p-2 shadow-md">
            <CardContent className="p-0 flex flex-col items-start gap-2">
              <div className="flex items-center justify-between gap-3 w-full">
                <p className="text-[20px] font-semibold capitalize">
                  {project.name}
                </p>
                <Badge variant={project.public ? "payment" : "default"}>
                  {project.public ? "Public" : "Private"}
                </Badge>
              </div>
              <p className="text-[18px] font-[400] text-yellow-500">
                Created at: {format(new Date(project.createdAt), "dd/MM/yyyy")}
              </p>
              <Button
                className="w-full"
                variant={"project"}
                onClick={() => navigate(`${project._id}`)}>
                See Full
              </Button>
              <Button
                disabled={isPending}
                className="w-full"
                variant={"destructive"}
                onClick={() => deleteProject(project._id)}>
                Delete Project
              </Button>
              <EditProject projectId={project._id} />
              {project.public === false && (
                <ShareCode projectId={project._id} />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Projects;
