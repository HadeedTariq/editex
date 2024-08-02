import { useLocation } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";

const BlogPage = () => {
  const { state }: { state: BlogsType } = useLocation();
  console.log(state);

  return (
    <>
      <div className="relative">
        <div className="">
          <div className="rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div className="p-2">
              <a
                href="#"
                className="text-indigo-400 capitalize hover:text-gray-700 transition duration-500 ease-in-out text-sm"
              >
                {state.category}
              </a>
              <h1 className="dark:text-gray-200 font-bold text-4xl">
                {state.title}
              </h1>
              <div className="py-5 text-sm font-regular dark:text-gray-200 flex">
                <span className="mr-3 flex flex-row items-center">
                  <span className="ml-1">6 mins ago</span>
                </span>
              </div>
              <hr />
              <p className="text-base leading-8 my-5">{state.description}</p>
            </div>
          </div>
        </div>
      </div>
      <MDEditor.Markdown
        source={state.content}
        style={{
          whiteSpace: "pre-wrap",
          paddingLeft: "12px",
          justifyContent: "start",
          alignItems: "start",
          backgroundColor: "black",
          color: "white",
        }}
      />
    </>
  );
};

export default BlogPage;
