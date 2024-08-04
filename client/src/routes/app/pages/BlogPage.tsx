import { useLocation } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { useFullApp } from "@/hooks/useFullApp";
import { useEffect, useRef, useState } from "react";
import TableOfContent from "../components/TableOfContent";
import { TableOfContentSheet } from "../components/TableOfContentSheet";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";

export type PageHeadings = {
  textContent: string | null;
  id: string;
  level: number;
};

const BlogPage = () => {
  const { state: blog }: { state: BlogsType } = useLocation();
  const { theme } = useFullApp();
  const [pageHeadings, setPageHeadings] = useState<PageHeadings[]>([]);
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll("h2,h3,h4,h5,h6")
    ).map((heading) => ({
      textContent: heading.textContent,
      id: heading.id,
      level: Number(heading.nodeName.charAt(1)),
    }));
    setPageHeadings(headings);
  }, [blog]);

  return (
    <>
      <div className="flex mt-0 max-[500px]:flex-col">
        <TableOfContent headings={pageHeadings} />
        <div className="min-[1058px]:hidden">
          <TableOfContentSheet headings={pageHeadings} />
        </div>

        <div
          className="w-[97%] ml-12 max-[1058px]:w-[96%] max-[1058px]:ml-0"
          ref={componentRef}
        >
          <div className="ml-2">
            <div className="rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
              <div className="p-2">
                <a className="text-indigo-400 capitalize hover:text-gray-700 transition duration-500 ease-in-out text-sm">
                  {blog.category}
                </a>
                <h1 className="dark:text-gray-200 font-bold text-4xl max-[700px]:text-2xl">
                  {blog.title}
                </h1>
                <div className="py-5 text-sm font-regular dark:text-gray-200 flex">
                  <span className="mr-3 flex flex-row items-center">
                    <span className="ml-1">6 mins ago</span>
                  </span>
                </div>
                <hr />
                <p className="text-base leading-8 my-5">{blog.description}</p>
              </div>
            </div>
          </div>

          <MDEditor.Markdown
            source={blog.content}
            style={{
              whiteSpace: "pre-wrap",
              paddingLeft: "20px",
              paddingBottom: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              backgroundColor: theme === "dark" ? "#0c0a09" : "white",
              color: (theme === "dark" && "white") || "",
            }}
          />
        </div>
      </div>
      <Button
        variant={"project"}
        onClick={handlePrint}
        className="mx-auto my-2 text-center "
      >
        Print Blog
      </Button>
    </>
  );
};

export default BlogPage;
