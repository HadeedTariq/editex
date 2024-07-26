import { projectApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type NotificationSender = {
  _id: string;
  username: string;
  avatar: string;
};

type ProjectNotificationType = {
  _id: string;
  projectId: string;
  message: string;
  fileId: string;
  sender: NotificationSender;
  fileDetails: {
    name: string;
  };
};

type ProjectNotificationData = {
  _id: string;
  name: string;
  projectNotifications: ProjectNotificationType[];
};

const ProjectNotifications = () => {
  const { data: projectNotificationData } = useQuery({
    queryKey: ["projectNotifications"],
    queryFn: async () => {
      const { data } = await projectApi.get("/projectNotifications");
      return data as ProjectNotificationData[];
    },
    refetchOnWindowFocus: false,
  });
  return (
    <>
      {projectNotificationData?.map((project) => (
        <Card className="overflow-hidden" key={project._id}>
          <CardHeader className="flex flex-row max-[590px]:flex-col items-start bg-muted/50">
            <div className="grid gap-0.5">
              <span className="text-yellow-500">Project Name:</span>{" "}
              <CardTitle className=" gap-2 text-lg text-start capitalize">
                {project.name}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="gap-2">
            {project.projectNotifications.map((projectNotification) => (
              <div
                key={projectNotification._id}
                className="flex items-center justify-between my-4">
                <p className="capitalize text-start gap-3">
                  <span className="text-red-400 font-bold mr-3">
                    {projectNotification.sender.username}
                  </span>
                  <span className="font-semibold">
                    {projectNotification.message}
                  </span>
                  <span className="font-semibold text-green-500 ml-3">
                    for {projectNotification.fileDetails.name}
                  </span>
                </p>
                <Button variant={"project"}>View Changes</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ProjectNotifications;
