import { Link, Outlet, useNavigate } from "react-router-dom";
import { useFullApp } from "@/hooks/useFullApp";
import { Button } from "./ui/button";
import { authApi } from "@/lib/axios";
import ThemeHandler from "./ThemeHandler";
import SideBar from "./SideBar";

const NavBar = () => {
  const navigate = useNavigate();
  const { user } = useFullApp();

  const logout = async () => {
    await authApi.post("/logout");
    window.location.reload();
  };
  return (
    <div className="flex flex-col w-full z-50">
      <div className="relative h-[70px]">
        <header className="fixed w-full h-[67px] border-b border-b-gray-400 dark:bg-slate-800 bg-gray-50 z-50">
          <div className="mx-auto flex h-16 max-w-screen-xl items-center px-4 ">
            <div className="flex flex-1 items-center justify-between">
              <h1
                className="font-bold text-[23px] max-[500px]:text-[19px] text-red-500 font-roboto-mono cursor-pointer"
                onClick={() => navigate("/")}>
                Editex
              </h1>

              <div className="flex items-center gap-4">
                {user ? (
                  <Button variant={"destructive"} onClick={logout}>
                    Logout
                  </Button>
                ) : (
                  <>
                    <Link
                      className=" rounded-md bg-rose-500 px-5 py-2.5 text-sm font-medium text-white transition font-ubuntu hover:bg-rose-600"
                      to="/auth/login">
                      Login
                    </Link>

                    <Link
                      className=" rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-orange-600 font-ubuntu transition hover:text-orange-600/75"
                      to="/auth/register">
                      Register
                    </Link>
                  </>
                )}
                <div className="flex items-center gap-2">
                  <ThemeHandler />
                  <SideBar />
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
      <Outlet />
    </div>
  );
};

export default NavBar;
