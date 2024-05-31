import { useFullApp } from "@/hooks/useFullApp";
import { Navigate } from "react-router-dom";

interface AuthProtectorProps {
  children: React.ReactNode;
}

const AuthProtector = ({ children }: AuthProtectorProps) => {
  const { user } = useFullApp();
  if (user) return <Navigate to={"/"} />;
  return <>{children}</>;
};

export default AuthProtector;
