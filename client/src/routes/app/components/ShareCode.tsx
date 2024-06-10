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
import { Share } from "lucide-react";
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

interface ShareCodeType {
  projectId: string;
}

const ShareCode = ({ projectId }: ShareCodeType) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string[]>([]);

  const { data: users, isLoading } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: async () => {
      const { data } = await shareCodeApi.get("/getAllUsers");
      return data as { _id: string; username: string }[];
    },
  });

  const { mutate: allowContributors, isPending } = useMutation({
    mutationKey: [`allowContributors${projectId}`],
    mutationFn: async () => {
      if (value.length < 1) {
        toast({
          title: "Please select Contributors",
        });
        return;
      }
      const { data } = await shareCodeApi.put("setContributors", {
        allowUserIds: value,
        projectId,
      });
      return data;
    },
    onSuccess: (data: any) => {
      toast({
        title: data.message || "Contributors set successfully",
      });
    },
  });

  if (isLoading) return <Loading />;
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={"outline"}
            className="w-full gap-3 items-center flex">
            Share
            <Share size={17} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-full">
          <AlertDialogHeader>
            <AlertDialogTitle>Share Your project</AlertDialogTitle>
          </AlertDialogHeader>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between">
                {value.length
                  ? users?.find((user) => value.includes(user._id))?.username
                  : "Select user"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command className="w-full">
                <CommandInput placeholder="Search user..." />
                <CommandList>
                  <CommandEmpty>No user found.</CommandEmpty>
                  <CommandGroup>
                    {users?.map((user) => (
                      <CommandItem
                        key={user.username}
                        value={user.username}
                        onSelect={() => {
                          setValue((prev) =>
                            value.includes(user._id) ? [] : [...prev, user._id]
                          );
                          setOpen(false);
                        }}>
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value.includes(user._id)
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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant={"edit"}
              onClick={() => allowContributors()}
              disabled={isPending}>
              Share
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ShareCode;
