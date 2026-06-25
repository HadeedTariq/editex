import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import {
  RegisterSchema,
  registerValidator,
} from "../validators/auth.validator";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { User, Mail, Lock, Heart, UserPlus, Loader2 } from "lucide-react";

export default function RegisterUser() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerValidator),
    values: {
      email: "",
      password: "",
      username: "",
      passion: "",
    },
  });
  const { mutate: registerUser, isPending } = useMutation({
    mutationKey: ["registerUser"],
    mutationFn: async (user: RegisterSchema) => {
      await authApi.post("/register", user);
    },
    onSuccess: () => {
      toast({
        title: "User registered successfully",
      });
      form.reset();
      navigate("/auth/login");
    },
    onError: (err: ServerError) => {
      toast({
        variant: "destructive",
        title: err.response.data.message || "Something went wrong",
        description: err.response.data.description,
      });
    },
  });
  const onSubmit = (user: RegisterSchema) => {
    registerUser(user);
  };

  return (
    <div>
      {/* Structured Dashboard Header Section */}
      <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-slate-700 dark:text-slate-300" />
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Account Registration
          </h2>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Provision a new administrator identity profile within the system core.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 px-6 py-5"
        >
          {/* Main 2x2 Grid with Fixed Responsive Sizing */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 max-[600px]:grid-cols-1">
            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Username
                  </FormLabel>
                  <div className="relative flex items-center">
                    <User className="absolute left-3 h-4 w-4 text-slate-400" />
                    <FormControl>
                      <Input
                        placeholder="john_doe"
                        className="pl-9 font-mono text-sm tracking-tight ring-offset-white placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-slate-950 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-xs font-medium text-red-600 dark:text-red-400" />
                </FormItem>
              )}
            />

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
                        placeholder="johndoe@domain.com"
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

            {/* Passion Field */}
            <FormField
              control={form.control}
              name="passion"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Area of Interest
                  </FormLabel>
                  <div className="relative flex items-center">
                    <Heart className="absolute left-3 h-4 w-4 text-slate-400" />
                    <FormControl>
                      <Input
                        placeholder="e.g., Cloud Architecture"
                        className="pl-9 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-slate-950 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-xs font-medium text-red-600 dark:text-red-400" />
                </FormItem>
              )}
            />
          </div>

          {/* Action Row — Positioned Cleanly at Bottom Right */}
          <div className="mt-2 flex justify-end border-t border-slate-100 pt-4 dark:border-slate-900">
            <Button
              disabled={isPending || form.formState.disabled}
              type="submit"
              className="h-9 rounded bg-slate-900 px-5 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200 max-[600px]:w-full"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Register User"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
