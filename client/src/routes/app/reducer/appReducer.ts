import { createSlice } from "@reduxjs/toolkit";

export interface Items {
  _id: string;
  name: string;
  isFolder: boolean;
  items: {
    name: string;
    isFolder: boolean;
  }[];
}
export interface ProjectFilesFoldersType {
  projectName: string;
  projectId: string;
  items: Items[];
}
export interface AppRouteState {
  isProjectPublic: boolean;
  projects: ProjectsType[];
  currentProjectFP: ProjectFilesFoldersType | null;
  currentProjectOpenFiles: string[];
}

const initialState: AppRouteState = {
  isProjectPublic: true,
  projects: [],
  currentProjectFP: null,
  currentProjectOpenFiles: [],
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
    setCurrentProjectOpenFiles: (state, { payload }: { payload: string }) => {
      if (state.currentProjectOpenFiles.includes(payload)) {
        return;
      }
      if (state.currentProjectOpenFiles.length === 4) {
        state.currentProjectOpenFiles.shift();
      }
      state.currentProjectOpenFiles.push(payload);
    },
    setCurrentProjectOpenFilesEmpty: (state) => {
      state.currentProjectOpenFiles = [];
    },
    removeFile: (state, { payload }: { payload: string }) => {
      const currentFiles = state.currentProjectOpenFiles.filter(
        (file) => file !== payload
      );
      state.currentProjectOpenFiles = currentFiles;
    },
  },
});

export default appReducer.reducer;

export const {
  setProjectPublic,
  setProjects,
  setCurrentProjectFP,
  setItemsCP,
  setCurrentProjectOpenFiles,
  setCurrentProjectOpenFilesEmpty,
  removeFile,
} = appReducer.actions;
