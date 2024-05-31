import { createSlice } from "@reduxjs/toolkit";

type Theme = "dark" | "light" | "system";

export type FullAppState = {
  theme: Theme;
  storageKey: string;
  user: User | null;
};

const initialState: FullAppState = {
  theme: (localStorage.getItem("vite-ui-theme") as Theme) || "system",
  storageKey: "vite-ui-theme",
  user: null,
};

const fullAppReducer = createSlice({
  name: "fullAppReducer",
  initialState,
  reducers: {
    setTheme: (state, { payload }: { payload: Theme }) => {
      localStorage.setItem(state.storageKey, payload);
      state.theme = payload;
    },
    setUser: (state, { payload }: { payload: User }) => {
      state.user = payload;
    },
  },
});

export const { setTheme, setUser } = fullAppReducer.actions;
export default fullAppReducer.reducer;
