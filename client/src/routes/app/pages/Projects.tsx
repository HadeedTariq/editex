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
import {
  ArrowRight,
  CalendarDays,
  FolderKanban,
  Globe,
  Lock,
  Trash2,
} from "lucide-react";

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

  const {
    data: myProjects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getMyProjects"],
    queryFn: async () => {
      const { data } = await projectApi.get("/");

      dispatch(setProjects(data));
      return data as ProjectsType[];
    },
  });

  if (isLoading) return <ProjectSkeleton />;

  if (isError) return <h1>Failed to load the projects</h1>;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {myProjects?.map((project) => (
        <Card
          key={project._id}
          className="group overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <CardContent className="p-0">
            <div className="space-y-6 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                      <FolderKanban className="h-5 w-5 text-primary" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-semibold capitalize">
                        {project.name}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Software Project
                      </p>
                    </div>
                  </div>
                </div>

                <Badge
                  variant={project.public ? "payment" : "default"}
                  className="shrink-0"
                >
                  {project.public ? (
                    <div className="flex items-center gap-1">
                      <Globe className="h-3.5 w-3.5" />
                      Public
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Lock className="h-3.5 w-3.5" />
                      Private
                    </div>
                  )}
                </Badge>
              </div>

              <div className="rounded-xl border bg-muted/30 p-4">
                <div className="flex items-center gap-3 text-sm">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />

                  <div>
                    <p className="text-xs text-muted-foreground">Created On</p>

                    <p className="font-medium">
                      {format(new Date(project.createdAt), "dd MMM yyyy")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t bg-muted/20 p-6">
              <div className="space-y-3">
                <Button
                  className="w-full gap-2"
                  variant="project"
                  onClick={() => navigate(`${project._id}`)}
                >
                  <ArrowRight className="h-4 w-4" />
                  Open Project
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <EditProject projectId={project._id} />

                  <ShareCode projectId={project._id} />
                </div>

                <Button
                  disabled={isPending}
                  variant="destructive"
                  className="w-full gap-2"
                  onClick={() => deleteProject(project._id)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Project
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Projects;
