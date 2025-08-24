import { Navigate } from "react-router-dom";
import { useFullApp } from "@/hooks/useFullApp";
import PublicProjectsRenderer from "../components/PublicProjectsRenderer";

const PublicProjects = () => {
  const { user } = useFullApp();
  if (!user) return <Navigate to={"/"} />;

  return (
    <div className="flex justify-center flex-wrap items-center gap-2 px-4">
      <PublicProjectsRenderer />
    </div>
  );
};

export default PublicProjects;
