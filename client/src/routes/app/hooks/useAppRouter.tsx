import { StoreState } from "@/store/store";
import { useSelector } from "react-redux";

export const useAppRouter = () => {
  const appState = useSelector((state: StoreState) => state.appReducer);
  return { ...appState };
};
