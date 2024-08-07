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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" grid grid-cols-2 gap-4 px-6 py-5 max-[500px]:grid-cols-1"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passion</FormLabel>
              <FormControl>
                <Input placeholder="passion" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending || form.formState.disabled}
          type="submit"
          className="text-white"
        >
          Register
        </Button>
      </form>
    </Form>
  );
}
