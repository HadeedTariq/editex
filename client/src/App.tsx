import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import LoginUser from "./routes/auth/pages/LoginUser";
import RegisterUser from "./routes/auth/pages/RegisterUser";
import Home from "./routes/app/pages/Home";
import NavBar from "./components/Navbar";
import { useEffect } from "react";
import { useTheme } from "./hooks/useTheme";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { authApi } from "./lib/axios";
import { setUser } from "./reducers/fullAppReducer";
import AuthProtector from "./routes/auth/components/AuthProtector";
import ProjectHandler from "./routes/app/components/ProjectHandler";
import ProjectPage from "./routes/app/pages/ProjectPage";
import CodeEditor from "./routes/app/components/CodeEditor";
import DefaultEditor from "./routes/app/pages/DefaultEditor";
import PublicProjects from "./routes/app/pages/PublicProjects";
import Notififcations from "./routes/app/pages/Notififcations";
import ProjectNotifications from "./routes/app/pages/ProjectNotifications";
import NotFound from "./components/NotFound";
import CreateBlog from "./routes/app/pages/CreateBlog";
import PublicBlogs from "./routes/app/pages/PublicBlogs";
import BlogPage from "./routes/app/pages/BlogPage";
import Loading from "./components/ui/loading";

function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { isLoading } = useQuery({
    queryKey: ["authenticateUser"],
    queryFn: async () => {
      const { data } = await authApi.get("/");
      dispatch(setUser(data));
      return data;
    },
    retry: 1,
  });

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  if (isLoading) return <Loading />;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/auth",
          children: [
            {
              path: "login",
              element: (
                <AuthProtector>
                  <LoginUser />
                </AuthProtector>
              ),
            },
            {
              path: "register",
              element: (
                <AuthProtector>
                  <RegisterUser />
                </AuthProtector>
              ),
            },
          ],
        },
        {
          path: "/createBlog",
          element: <CreateBlog />,
        },
        {
          path: "/projects",
          element: <ProjectHandler />,
        },
        {
          path: "/publicProjects",
          element: <PublicProjects />,
        },
        {
          path: "/notifications",
          element: <Notififcations />,
        },
        {
          path: "/projectNotifications",
          element: <ProjectNotifications />,
        },
        {
          path: "/blogs",
          children: [
            {
              index: true,
              element: <PublicBlogs />,
            },
            {
              path: ":id",
              element: <BlogPage />,
            },
          ],
        },
        {
          path: "/projects/:id",
          element: <ProjectPage />,
          children: [
            {
              index: true,
              element: <DefaultEditor />,
            },
            {
              path: "js/:fileName",
              element: <CodeEditor />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
