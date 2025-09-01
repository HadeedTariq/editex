import Loading from "@/components/ui/loading";
import { authApi } from "@/lib/axios";
import { setUser } from "@/reducers/fullAppReducer";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

interface AuthCheckerProps {
  children: React.ReactNode;
}

const AuthChecker = ({ children }: AuthCheckerProps) => {
  const dispatch = useDispatch();
  const { data: user, isLoading } = useQuery({
    queryKey: ["authenticateUser"],
    queryFn: async () => {
      const { data } = await authApi.get("/");
      dispatch(setUser(data));
      return data;
    },
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
  if (isLoading) return <Loading />;
  if (!isLoading && !user?.email) return <Navigate to={"/auth/login"} />;
  return <>{children}</>;
};

export default AuthChecker;
