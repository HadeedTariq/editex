import { Link } from "react-router-dom";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { LucideFileWarning, LucideUserRoundSearch } from "lucide-react";

const ProjectErrorState = ({ error }: { error: any }) => {
  const { reset } = useQueryErrorResetBoundary();

  const errorMessage =
    error?.response?.data?.message || "An unexpected error occurred.";

  const getErrorContent = () => {
    switch (errorMessage) {
      case "Project not found":
        return {
          title: "Project Not Found",
          message:
            "The project you're looking for doesn't exist or has been removed.",
          icon: (
            <LucideFileWarning size={100} className="text-yellow-500 mb-6" />
          ),
          action: {
            text: "Go to Home",
            link: "/",
          },
        };
      case "You are not authorized to access this project":
        return {
          title: "Access Denied",
          message:
            "You don't have permission to view this project. Please contact the project owner.",
          icon: (
            <LucideUserRoundSearch size={100} className="text-red-500 mb-6" />
          ),
          action: {
            text: "Go to Home",
            link: "/home",
          },
        };
      default:
        return {
          title: "Something Went Wrong",
          message:
            "We're sorry, an unexpected error occurred while loading the project. Please try again.",
          icon: (
            <LucideUserRoundSearch size={100} className="text-red-500 mb-6" />
          ),
          action: {
            text: "Reload",
            onClick: () => reset(),
          },
        };
    }
  };

  const content = getErrorContent();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200 p-8">
      <div className="bg-gray-800 rounded-xl shadow-lg p-10 max-w-lg w-full text-center border border-gray-700 transition-all duration-300 transform hover:scale-105">
        {content.icon}
        <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-red-400">
          {content.title}
        </h1>
        <p className="text-lg font-medium mb-8 text-gray-400 leading-relaxed">
          {content.message}
        </p>
        {content.action.link ? (
          <Link
            to={content.action.link}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-bold rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
          >
            {content.action.text}
          </Link>
        ) : (
          <button
            onClick={content.action.onClick}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-bold rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
          >
            {content.action.text}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectErrorState;
