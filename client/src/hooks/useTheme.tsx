import { StoreState } from "@/store/store";
import { useSelector } from "react-redux";

export const useTheme = () => {
  const { theme, storageKey } = useSelector(
    (state: StoreState) => state.fullAppReducer
  );

  return { theme, storageKey };
};
