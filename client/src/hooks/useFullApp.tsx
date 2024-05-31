import { StoreState } from "@/store/store";
import { useSelector } from "react-redux";

export const useFullApp = () => {
  const fullApp = useSelector((state: StoreState) => state.fullAppReducer);
  return { ...fullApp };
};
