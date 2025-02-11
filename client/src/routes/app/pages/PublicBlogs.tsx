import Loading from "@/components/ui/loading";
import { useFullApp } from "@/hooks/useFullApp";
import { blogApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PublicBlogs = () => {
  const { user } = useFullApp();
  const [isHovered, setIsHovered] = useState(false);
  const { isLoading, data: blogs } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data } = await blogApi.get("/");
      return data as BlogsType[];
    },
  });
  if (isLoading) return <Loading />;
  if (!user) return <Navigate to={"/"} />;

  return (
    <ul className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
      {blogs?.map((blog) => (
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Card
            className="overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative">
              <img
                src={blog.image || "/placeholder.svg"}
                alt={blog.title}
                className="w-full h-48 object-cover transition-transform duration-300 ease-in-out"
                style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
              />
              <Badge className="absolute top-2 right-2" variant="secondary">
                {blog.category}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-1">{blog.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {blog.description}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                asChild
                variant="ghost"
                className="w-full justify-between group"
              >
                <Link to={`${blog._id}`} state={blog}>
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </ul>
  );
};

export default PublicBlogs;
