import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateBlog = () => {
  return (
    <>
      <BlogCreationForm />
    </>
  );
};

export default CreateBlog;

("use client");

import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";

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
  blogCategories,
  BlogSchema,
  blogValidator,
} from "../validators/blog.validator";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { blogApi } from "@/lib/axios";
import { useFullApp } from "@/hooks/useFullApp";
import { toast } from "@/components/ui/use-toast";
import { Navigate } from "react-router-dom";

function BlogCreationForm() {
  const form = useForm<BlogSchema>({
    resolver: zodResolver(blogValidator),
    defaultValues: {
      title: "",
      content: "",
      description: "",
      category: "general",
    },
  });
  const { isSubmitting } = form.formState;
  const { mutate: createBlog, isPending } = useMutation({
    mutationKey: ["createBlog"],
    mutationFn: async (blog: BlogSchema) => {
      const { data } = await blogApi.post("/create", blog);
      return data;
    },
    onSuccess(data: any) {
      toast({
        title: data.message || "Blog created successfully",
      });
    },
    onError() {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    },
  });
  const onSubmit = async (values: BlogSchema) => {
    createBlog(values);
  };
  const image = form.watch("image");
  const content = form.watch("content");

  const uploadImage = async (file: File) => {
    form.setValue("image", "loading");
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUD_PRESET_NAME);
    data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);
    try {
      const resp = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        data
      );
      form.setValue("image", resp.data.url);
    } catch (err) {
      form.setValue("image", "");
      toast({
        title: "There is an error in image uploading",
        variant: "destructive",
      });
    }
  };
  const { user } = useFullApp();
  if (!user) {
    toast({
      title: "Authentication required",
    });
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 p-4 flex flex-col items-center  w-full"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Blog Title</FormLabel>
                <FormControl>
                  <Input
                    className="w- border-2  border-slate-700 h-16 resize-none"
                    placeholder="title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Blog Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="w- border-2 border-slate-700 resize-none h-[200px]"
                    placeholder="description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Blog Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue className="capitalize" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {blogCategories.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="capitalize"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {!image ? (
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem className="w-full">
                  <FormLabel>Blog Image</FormLabel>
                  <FormControl>
                    <label className="flex  cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-6 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75">
                      <span className="flex items-center space-x-2">
                        <svg
                          className="h-6 w-6 stroke-gray-400"
                          viewBox="0 0 256 256"
                        >
                          <path
                            d="M96,208H72A56,56,0,0,1,72,96a57.5,57.5,0,0,1,13.9,1.7"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="24"
                          ></path>
                          <path
                            d="M80,128a80,80,0,1,1,144,48"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="24"
                          ></path>
                          <polyline
                            points="118.1 161.9 152 128 185.9 161.9"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="24"
                          ></polyline>
                          <line
                            x1="152"
                            y1="208"
                            x2="152"
                            y2="128"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="24"
                          ></line>
                        </svg>
                        <span className="text-xs font-medium text-gray-600">
                          Drop files to Attach, or
                          <span className="text-blue-600 underline">
                            browse
                          </span>
                        </span>
                      </span>
                      <input
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            uploadImage(e.target.files[0]);
                          }
                        }}
                        id="photo-dropbox"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <img
              src={image}
              className="border-2 border-dotted border-current size-[300px] object-cover"
            />
          )}
          <div className="flex flex-col gap-4">
            <FormLabel>Blog content</FormLabel>
            <MDEditor
              style={{ fontSize: "20px" }}
              className="w-[95vw]"
              value={content}
              onChange={(e) => form.setValue("content", e as string)}
            />
          </div>
          <Button type="submit" disabled={isSubmitting || isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
