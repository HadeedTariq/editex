import { createSlice } from "@reduxjs/toolkit";

export interface ProjectFilesFoldersType {
  projectName: string;
  fileName: string;
  folderName: string;
}
export interface AppRouteState {
  isProjectPublic: boolean;
  projects: ProjectsType[];
  file: boolean;
  folder: boolean;
  projectFilesFolders: ProjectFilesFoldersType[];
}

const initialState: AppRouteState = {
  isProjectPublic: true,
  projects: [],
  file: false,
  folder: false,
  projectFilesFolders: [],
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
    setFile(state, { payload }: { payload: boolean }) {
      state.file = payload;
    },
    setFolder(state, { payload }: { payload: boolean }) {
      state.folder = payload;
    },
  },
});

export default appReducer.reducer;

export const { setProjectPublic, setProjects, setFile, setFolder } =
  appReducer.actions;
