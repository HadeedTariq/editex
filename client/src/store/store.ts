import fullAppReducer, { FullAppState } from "@/reducers/fullAppReducer";
import appReducer, { AppRouteState } from "@/routes/app/reducer/appReducer";
import { configureStore } from "@reduxjs/toolkit";

export interface StoreState {
  fullAppReducer: FullAppState;
  appReducer: AppRouteState;
}

export const store = configureStore({
  reducer: {
    fullAppReducer,
    appReducer,
  },
});
