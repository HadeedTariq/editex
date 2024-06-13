import Loading from "@/components/ui/loading";
import { projectApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProjects } from "../reducer/appReducer";
import { useFullApp } from "@/hooks/useFullApp";

interface PublicProjectsType {
  _id: string;
  name: string;
  public: true;
  createdAt: string;
  projectCode: {
    _id: string;
    name: string;
    isFolder: boolean;
    code: string;
  };
}

const PublicProjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useFullApp();
  if (!user) return <Navigate to={"/"} />;
  const { isLoading, data: publicProjects } = useQuery({
    queryKey: [`getPublicProjets`],
    queryFn: async () => {
      const { data } = await projectApi.get(`/publicProjects`);
      dispatch(setProjects(data));
      return data as PublicProjectsType[];
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  if (isLoading) return <Loading />;
  return (
    <div className="flex justify-center flex-wrap items-center gap-2 px-4">
      {publicProjects?.map((project) => (
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
              onClick={() => navigate(`/project/${project._id}`)}>
              Contribute
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PublicProjects;
