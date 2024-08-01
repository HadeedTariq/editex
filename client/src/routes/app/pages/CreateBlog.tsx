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
import { useState } from "react";
import axios from "axios";

function BlogCreationForm() {
  const [imageData, setimageData] = useState({ url: "", public_id: "" });

  const form = useForm<BlogSchema>({
    resolver: zodResolver(blogValidator),
    defaultValues: {
      title: "",
      content: "",
      description: "",
      category: "general",
    },
  });
  const { isValid, isSubmitting } = form.formState;
  const onSubmit = async (values: BlogSchema) => {
    console.log(values);
  };
  const image = form.watch("image");
  const content = form.watch("content");

  const uploadImage = async (file: File) => {
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
      console.log("errr : ", err);
    }
  };

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
          <div className="flex flex-col gap-4">
            <FormLabel>Blog content</FormLabel>
            <MDEditor
              style={{ fontSize: "20px" }}
              className="w-[95vw]"
              value={content}
              onChange={(e) => form.setValue("content", e as string)}
            />
          </div>
          <Button type="submit" disabled={!isValid || isSubmitting}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
