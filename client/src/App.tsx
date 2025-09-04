import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import LoginUser from "./routes/auth/pages/LoginUser";
import RegisterUser from "./routes/auth/pages/RegisterUser";
import Home from "./routes/app/pages/Home";
import NavBar from "./components/Navbar";
import { useEffect } from "react";
import { useTheme } from "./hooks/useTheme";
import AuthProtector from "./routes/auth/components/AuthProtector";
import ProjectHandler from "./routes/app/components/ProjectHandler";
import ProjectPage from "./routes/app/pages/ProjectPage";
import CodeEditor from "./routes/app/components/CodeEditor";
import DefaultEditor from "./routes/app/pages/DefaultEditor";
import PublicProjects from "./routes/app/pages/PublicProjects";
import Notififcations from "./routes/app/pages/Notififcations";
import ProjectNotifications from "./routes/app/pages/ProjectNotifications";
import NotFound from "./components/NotFound";
import AuthChecker from "./routes/app/components/AuthChecker";

function App() {
  const { theme } = useTheme();

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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      children: [
        {
          path: "/",
          element: (
            <AuthChecker>
              <Home />
            </AuthChecker>
          ),
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
          path: "/projects",
          element: (
            <AuthChecker>
              <ProjectHandler />
            </AuthChecker>
          ),
        },
        {
          path: "/publicProjects",
          element: (
            <AuthChecker>
              <PublicProjects />
            </AuthChecker>
          ),
        },
        {
          path: "/notifications",
          element: (
            <AuthChecker>
              <Notififcations />
            </AuthChecker>
          ),
        },
        {
          path: "/projectNotifications",
          element: (
            <AuthChecker>
              <ProjectNotifications />
            </AuthChecker>
          ),
        },

        {
          path: "/projects/:id",
          element: (
            <AuthChecker>
              <ProjectPage />
            </AuthChecker>
          ),
          children: [
            {
              index: true,
              element: (
                <AuthChecker>
                  <DefaultEditor />
                </AuthChecker>
              ),
            },
            {
              path: "js/:fileName",
              element: (
                <AuthChecker>
                  <CodeEditor />
                </AuthChecker>
              ),
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
