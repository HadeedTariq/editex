import Loading from "@/components/ui/loading";
import { shareCodeApi } from "@/lib/axios";
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { BookCheck, BookOpenCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { useFullApp } from "@/hooks/useFullApp";

interface NotificationsDataType {
  sender: {
    username: string;
    avatar: string;
    _id: string;
  };
  message: string;
  isWatch: boolean;
  _id: string;
  createdAt: string;
  projectId: string;
}

const Notififcations = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useFullApp();
  if (!user) return <Navigate to={"/"} />;
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["getMyNotifications"],
    queryFn: async () => {
      const { data } = await shareCodeApi.get("/getMyNotifications");
      return data as NotificationsDataType[];
    },
  });

  const { mutate: readNotification, isPending } = useMutation({
    mutationKey: [`readNotification`],
    mutationFn: async (notificationId: string) => {
      const { data } = await shareCodeApi.put(`/readNotification`, {
        notificationId,
      });
      return data;
    },
    onSuccess(data: any) {
      toast({
        title: data.message || "Notification readed successfully",
      });
      queryClient.invalidateQueries([
        "getMyNotifications",
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

  if (isLoading) return <Loading />;
  return (
    <div className="flex flex-col gap-2">
      {notifications?.map((notification) => (
        <Card className="overflow-hidden" key={notification._id}>
          <CardHeader className="flex flex-row max-[590px]:flex-col items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className=" gap-2 text-lg text-start">
                {notification.message} from{" "}
                <span className="text-yellow-400 capitalize">
                  {notification.sender.username}
                </span>
              </CardTitle>
              <CardDescription className="text-start">
                {format(new Date(notification.createdAt), "dd/MM/yyyy")}
              </CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-2">
              {notification.isWatch ? (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 gap-1"
                  disabled
                >
                  <BookOpenCheck className="h-3.5 w-3.5" />
                  <span>Notification Readed</span>
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 gap-1"
                  disabled={isPending}
                  onClick={() => {
                    readNotification(notification._id);
                  }}
                >
                  <BookCheck className="h-3.5 w-3.5" />
                  <span>Read Notification</span>
                </Button>
              )}
              <Button
                size={"sm"}
                variant={"edit"}
                className="h-8 gap-1"
                onClick={() => {
                  navigate(`/privateProject/${notification.projectId}`);
                }}
              >
                Visit Repository
              </Button>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default Notififcations;
