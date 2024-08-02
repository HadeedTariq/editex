import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const { pathname } = useLocation();

  return (
    <Sheet>
      <SheetTrigger className="mx-0">
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className="w-[250px] px-0">
        <div className="flex flex-col gap-3 mt-8">
          <Link
            to={"/notifications"}
            className={`dark:bg-zinc-800 bg-zinc-200  p-2 rounded-md ${
              String(pathname) === "/notifications" &&
              "dark:bg-slate-900 bg-slate-400"
            }`}
          >
            Notifications
          </Link>

          <Link
            to={"/project/publicProjects"}
            className={`dark:bg-zinc-800 bg-zinc-200  p-2 rounded-md ${
              String(pathname) === "/project/publicProjects" &&
              "dark:bg-slate-900 bg-slate-400"
            }`}
          >
            Public Projects
          </Link>
          <Link
            to={"/projectNotifications"}
            className={`dark:bg-zinc-800 bg-zinc-200  p-2 rounded-md ${
              String(pathname) === "/projectNotifications" &&
              "dark:bg-slate-900 bg-slate-400"
            }`}
          >
            Project Notification
          </Link>
          <Link
            to={"/blogs"}
            className={`dark:bg-zinc-800 bg-zinc-200  p-2 rounded-md ${
              String(pathname) === "/blogs" && "dark:bg-slate-900 bg-slate-400"
            }`}
          >
            Blogs
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideBar;
