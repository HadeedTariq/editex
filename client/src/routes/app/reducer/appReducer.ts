import { createSlice } from "@reduxjs/toolkit";

export interface Items {
  id: string;
  name: string;
  isFolder: boolean;
  items: Items[];
}
export interface ProjectFilesFoldersType {
  projectName: string;
  projectId: string;
  items: Items[];
}
export interface AppRouteState {
  isProjectPublic: boolean;
  projects: ProjectsType[];
  projectFilesFolders: ProjectFilesFoldersType[];
  currentProjectFP: ProjectFilesFoldersType | null;
}

const initialState: AppRouteState = {
  isProjectPublic: true,
  projects: [],
  projectFilesFolders: [],
  currentProjectFP: null,
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
    setCurrentProjectFP: (
      state,
      { payload }: { payload: ProjectFilesFoldersType }
    ) => {
      state.currentProjectFP = payload;
    },
    setItemsCP: (state, { payload }: { payload: Items }) => {
      state.currentProjectFP?.items.push(payload);
    },
  },
});

export default appReducer.reducer;

export const {
  setProjectPublic,
  setProjects,
  setCurrentProjectFP,
  setItemsCP,
} = appReducer.actions;
