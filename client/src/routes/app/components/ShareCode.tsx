import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Share, X } from "lucide-react";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMutation, useQuery } from "@tanstack/react-query";
import { shareCodeApi } from "@/lib/axios";
import Loading from "@/components/ui/loading";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

interface ShareCodeType {
  projectId: string;
}

const ShareCode = ({ projectId }: ShareCodeType) => {
  const [open, setOpen] = React.useState(false);
  const [selectedUserIds, setSelectedUserIds] = React.useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const { data: users, isLoading } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: async () => {
      const { data } = await shareCodeApi.get("/getAllUsers");
      return data as { _id: string; username: string }[];
    },
  });

  const { mutate: setContributors, isPending } = useMutation({
    mutationKey: [`setContributors${projectId}`],
    mutationFn: async () => {
      if (selectedUserIds.length < 1) {
        toast({
          title: "Please select contributors",
        });
        return;
      }
      const { data } = await shareCodeApi.put("setContributors", {
        allowUserIds: selectedUserIds,
        projectId,
      });
      return data;
    },
    onSuccess: (data) => {
      toast({
        title: data.message || "Contributors updated successfully",
      });
      setSelectedUserIds([]);
    },
    onError: (error) => {
      toast({
        title: "Error setting contributors",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSelectUser = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
    setOpen(true);
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUserIds((prev) => prev.filter((id) => id !== userId));
  };

  const availableUsers = users?.filter(
    (user) => !selectedUserIds.includes(user._id)
  );

  const selectedUsers = users?.filter((user) =>
    selectedUserIds.includes(user._id)
  );

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} className="w-full gap-3 items-center flex">
          Share
          <Share size={17} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full">
        <AlertDialogHeader>
          <AlertDialogTitle>Share Your Project</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="flex flex-wrap gap-2 py-2">
          {isLoading && <Loading />}
          {!isLoading &&
            selectedUsers?.map((user) => (
              <Badge
                key={user._id}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {user.username}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveUser(user._id)}
                  className="h-4 w-4 rounded-full"
                >
                  <X size={12} />
                </Button>
              </Badge>
            ))}
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              Select Users
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command className="w-full">
              <CommandInput placeholder="Search user..." />
              <CommandList>
                <CommandEmpty>No user found.</CommandEmpty>
                <CommandGroup>
                  {availableUsers?.map((user) => (
                    <CommandItem
                      key={user._id}
                      value={user.username}
                      onSelect={() => handleSelectUser(user._id)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedUserIds.includes(user._id)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {user.username}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <Button
            variant={"edit"}
            onClick={() => setContributors()}
            disabled={isPending || selectedUserIds.length < 1}
          >
            Share
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ShareCode;
