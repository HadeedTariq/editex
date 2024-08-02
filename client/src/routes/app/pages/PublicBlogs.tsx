import Loading from "@/components/ui/loading";
import { useFullApp } from "@/hooks/useFullApp";
import { blogApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate } from "react-router-dom";

const PublicBlogs = () => {
  const { user } = useFullApp();

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
        <li
          className="relative flex flex-col sm:flex-row xl:flex-col items-start"
          key={blog._id}
        >
          <div className="order-1 sm:ml-6 xl:ml-0 ">
            <h3 className="mb-1 dark:text-slate-200 font-semibold text-start">
              <span className="mb-1 block text-sm leading-6 text-indigo-500">
                {blog.title}
              </span>
              {blog.description.slice(0, 90)}...
            </h3>
            <div className="prose prose-slate prose-sm dark:text-slate-200 ">
              <p className="text-start">{blog.content.slice(0, 100)}...</p>
            </div>
            <Link
              state={blog}
              className="group inline-flex  items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 mt-3 "
              to={`${blog._id}`}
            >
              Learn more
              <svg
                className="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400"
                width="3"
                height="6"
                viewBox="0 0 3 6"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M0 0L3 3L0 6"></path>
              </svg>
            </Link>
          </div>
          <img
            src={blog.image}
            alt=""
            className="mb-6 shadow-md rounded-lg  bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full"
            width="1216"
            height="640"
          />
        </li>
      ))}
    </ul>
  );
};

export default PublicBlogs;
