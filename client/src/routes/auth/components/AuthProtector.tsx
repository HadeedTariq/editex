import Loading from "@/components/ui/loading";
import { authApi } from "@/lib/axios";
import { setUser } from "@/reducers/fullAppReducer";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

interface AuthProtectorProps {
  children: React.ReactNode;
}

const AuthProtector = ({ children }: AuthProtectorProps) => {
  const dispatch = useDispatch();
  const { data: user, isLoading } = useQuery({
    queryKey: ["authenticateUser"],
    queryFn: async () => {
      const { data } = await authApi.get("/");
      dispatch(setUser(data));
      return data;
    },
    refetchOnWindowFocus: false,
    retry: 1,
    refetchOnMount: true,
    refetchInterval: 300000,
  });
  if (isLoading) return <Loading />;
  if (!isLoading && user?.email) return <Navigate to={"/"} />;
  return <>{children}</>;
};

export default AuthProtector;
