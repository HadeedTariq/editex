import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useFullApp } from "@/hooks/useFullApp";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useFullApp();
  const redirection = (url: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
      });
      return;
    }
    navigate(url);
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-800 w-full h-screen">
      <div className="w-full  flex items-center h-[90%]">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Editex
            <strong className="font-extrabold text-rose-600 sm:block">
              {" "}
              Increase your editor experience by using our product{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Editex is a code editor developed for enhancing your development
            expirience
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button onClick={() => redirection("/project")}>Get Started</Button>
            <Button
              onClick={() => redirection("/createBlog")}
              variant={"project"}
            >
              Create Blog
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
