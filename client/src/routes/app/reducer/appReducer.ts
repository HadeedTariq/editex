import { createSlice } from "@reduxjs/toolkit";

export interface AppRouteState {
  isProjectPublic: boolean;
  projects: ProjectsType[];
}

const initialState: AppRouteState = {
  isProjectPublic: true,
  projects: [],
};

const appReducer = createSlice({
  name: "appReducer",
  initialState,
  reducers: {
    setProjectPublic: (state) => {
      state.isProjectPublic = !state.isProjectPublic;
    },
    setProjects: (state, { payload }: { payload: ProjectsType[] }) => {
      state.projects = payload;
    },
  },
});

export default appReducer.reducer;

export const { setProjectPublic, setProjects } = appReducer.actions;
