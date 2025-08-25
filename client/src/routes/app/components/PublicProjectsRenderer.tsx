import Loading from "@/components/ui/loading";
import { projectApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPublicProjects } from "../reducer/appReducer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, User, Heart, ExternalLink } from "lucide-react";

const PublicProjectsRenderer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, data: publicProjects } = useQuery({
    queryKey: [`getPublicProjets`],
    queryFn: async () => {
      const { data } = await projectApi.get(`/publicProjects`);
      dispatch(setPublicProjects(data));
      return data as PublicProjectsType[];
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isLoading) return <Loading />;

  return (
    <>
      {publicProjects?.map((project) => (
        <Card
          key={project._id}
          className="w-[320px] group hover:shadow-lg transition-all duration-300 border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border hover:bg-card/80"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold capitalize text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {project.name}
              </h3>
              <Badge
                variant={project.public ? "default" : "secondary"}
                className={
                  project.public
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                }
              >
                {project.public ? "Public" : "Private"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Creator Info */}
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30 border border-border/30">
              <Avatar className="h-10 w-10 border-2 border-background">
                <AvatarImage
                  src={project.creator.avatar}
                  alt={project.creator.username}
                />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {project.creator.username?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                  <User className="h-3 w-3 opacity-60" />
                  <span className="truncate">{project.creator.username}</span>
                </div>
                {project.creator.passion && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Heart className="h-3 w-3 opacity-60" />
                    <span className="truncate capitalize">
                      {project.creator.passion}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Creation Date */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 opacity-60" />
              <span>
                Created {format(new Date(project.createdAt), "MMM dd, yyyy")}
              </span>
            </div>

            {/* Action Button */}
            <Button
              className="w-full group-hover:shadow-md transition-all duration-200 bg-primary hover:bg-primary/90"
              variant="default"
              onClick={() =>
                navigate(`/projects/${project._id}?projectType=public`)
              }
            >
              <span className="flex items-center gap-2">
                Contribute
                <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Button>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default PublicProjectsRenderer;
