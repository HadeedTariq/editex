import Loading from "@/components/ui/loading";
import { shareCodeApi } from "@/lib/axios";
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  BellOff,
  BellRing,
  BookCheck,
  BookOpenCheck,
  CalendarDays,
  CircleDot,
  FolderGit2,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { useFullApp } from "@/hooks/useFullApp";
import { Badge } from "@/components/ui/badge";

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
    <div className="space-y-5">
      {notifications && notifications.length === 0 && (
        <Card className="rounded-2xl border border-dashed shadow-none">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <BellOff className="mb-4 h-12 w-12 text-muted-foreground" />

            <h3 className="text-lg font-semibold">No Notifications</h3>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              You're all caught up. New project invitations and collaboration
              updates will appear here.
            </p>
          </CardContent>
        </Card>
      )}

      {notifications?.map((notification) => (
        <Card
          key={notification._id}
          className="overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <CardContent className="p-0">
            <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex flex-1 gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <BellRing className="h-5 w-5 text-primary" />
                </div>

                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold leading-7">
                      {notification.message}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <UserRound className="h-4 w-4" />

                        <span>
                          From{" "}
                          <span className="font-medium capitalize text-foreground">
                            {notification.sender.username}
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />

                        <span>
                          {format(
                            new Date(notification.createdAt),
                            "dd MMM yyyy",
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {notification.isWatch ? (
                      <Badge
                        variant="secondary"
                        className="gap-2 rounded-lg px-3 py-1"
                      >
                        <BookOpenCheck className="h-4 w-4 text-green-500" />
                        Read
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="gap-2 rounded-lg px-3 py-1 text-amber-600"
                      >
                        <CircleDot className="h-3 w-3 fill-current" />
                        Unread
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:w-56">
                {notification.isWatch ? (
                  <Button
                    disabled
                    variant="outline"
                    className="w-full justify-center gap-2"
                  >
                    <BookOpenCheck className="h-4 w-4" />
                    Read
                  </Button>
                ) : (
                  <Button
                    disabled={isPending}
                    variant="outline"
                    className="w-full justify-center gap-2"
                    onClick={() => {
                      readNotification(notification._id);
                    }}
                  >
                    <BookCheck className="h-4 w-4" />
                    Mark as Read
                  </Button>
                )}

                <Button
                  variant="project"
                  className="w-full justify-center gap-2"
                  onClick={() => {
                    navigate(`/projects/${notification.projectId}`);
                  }}
                >
                  <FolderGit2 className="h-4 w-4" />
                  Visit Repository
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Notififcations;
