import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthSchema, authValidator } from "../validators/auth.validator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function LoginUser() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const form = useForm<AuthSchema>({
    resolver: zodResolver(authValidator),
    values: {
      email: "",
      password: "",
    },
  });
  const { mutate: authenticateUser, isPending } = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: async (user: AuthSchema) => {
      const { data } = await authApi.post("/login", user);
      return data;
    },
    onSuccess: () => {
      toast({
        title: "User logged in successfully",
      });
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ["authenticateUser"],
      });
      navigate("/");
    },
    onError: (err: ServerError) => {
      toast({
        variant: "destructive",
        title: err.response.data.message || "Something went wrong",
        description: err.response.data.description,
      });
    },
  });
  const onSubmit = (user: AuthSchema) => {
    authenticateUser(user);
  };
  return (
    <div>
      {/* Structured Dashboard Header Section */}
      <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <LogIn className="h-5 w-5 text-slate-700 dark:text-slate-300" />
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            System Authentication
          </h2>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Provide your administrative credentials to access the secure console.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 px-6 py-5"
        >
          {/* Vertical Stack Layout optimized for Login Layout */}
          <div className="flex flex-col gap-4">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Email Address
                  </FormLabel>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 h-4 w-4 text-slate-400" />
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="admin@domain.com"
                        className="pl-9 font-mono text-sm tracking-tight ring-offset-white placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-slate-950 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-xs font-medium text-red-600 dark:text-red-400" />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Password
                  </FormLabel>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3 h-4 w-4 text-slate-400" />
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••••••"
                        className="pl-9 font-mono text-sm tracking-tight ring-offset-white placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-slate-950 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-xs font-medium text-red-600 dark:text-red-400" />
                </FormItem>
              )}
            />
          </div>

          {/* Full-width SaaS Action Row */}
          <div className="mt-2 border-t border-slate-100 pt-4 dark:border-slate-900">
            <Button
              disabled={isPending || form.formState.disabled}
              type="submit"
              className="h-9 w-full rounded bg-slate-900 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying Identity...
                </>
              ) : (
                "Authenticate Account"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
