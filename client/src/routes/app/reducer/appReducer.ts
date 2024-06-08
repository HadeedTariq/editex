import { createSlice } from "@reduxjs/toolkit";

export interface Items {
  _id: string;
  name: string;
  isFolder: boolean;
  code?: string;
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

export interface CurrentProjectOpenFiles {
  _id: string;
  name: string;
}

export interface ProjectCode {
  projectId: string;
  filesCode: {
    code: string;
    fileId: string;
  }[];
}
export interface AppRouteState {
  isProjectPublic: boolean;
  projects: ProjectsType[];
  currentProjectFP: ProjectFilesFoldersType | null;
  currentProjectOpenFiles: CurrentProjectOpenFiles[];
  projectCode: ProjectCode | null;
}

const initialState: AppRouteState = {
  isProjectPublic: true,
  projects: [],
  currentProjectFP: null,
  currentProjectOpenFiles: [],
  projectCode: null,
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
    setCurrentProjectOpenFiles: (
      state,
      { payload }: { payload: { _id: string; name: string } }
    ) => {
      const isFileAlreadyExit = state.currentProjectOpenFiles.find(
        (file) => file._id === payload._id
      );

      if (isFileAlreadyExit) {
        return;
      }
      if (state.currentProjectOpenFiles.length === 4) {
        state.currentProjectOpenFiles.shift();
      }
      state.projectCode?.filesCode.push({
        fileId: payload._id,
        code: "",
      });
      state.currentProjectOpenFiles.push(payload);
    },
    setCurrentProjectOpenFilesEmpty: (state) => {
      state.currentProjectOpenFiles = [];
    },
    removeFile: (
      state,
      { payload }: { payload: { _id: string; name: string } }
    ) => {
      const currentFiles = state.currentProjectOpenFiles.filter(
        (file) => file._id !== payload._id
      );
      state.currentProjectOpenFiles = currentFiles;
    },
    setProjectCode: (
      state,
      { payload }: { payload: { projectId: string; filesCode: [] } }
    ) => {
      state.projectCode = payload;
    },
    updateProjectCode: (
      state,
      { payload }: { payload: { fileId: string; code: string } }
    ) => {
      const projectFile = state.projectCode?.filesCode.find(
        (fileCode) => fileCode.fileId === payload.fileId
      );
      if (projectFile) {
        projectFile.code = payload.code;
        const filterFiles = state.projectCode?.filesCode.filter(
          (fileCode) => fileCode.fileId !== payload.fileId
        );
        filterFiles?.push(projectFile);
        if (state.projectCode && filterFiles) {
          state.projectCode.filesCode = filterFiles;
        }
      }
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
  setProjectCode,
  updateProjectCode,
} = appReducer.actions;
