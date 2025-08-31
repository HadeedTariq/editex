import { findFolderAndCheckFileExistance } from "@/lib/utils";
import { createSlice } from "@reduxjs/toolkit";

export interface CurrentProjectOpenFile {
  _id: string;
  name: string;
}

export interface CurrentProjectOpenFileCodes {
  projectId: string;
  fileId: string;
  parentId?: string;
  code: string;
  fileName: string;
}
export interface ProjectFilesFoldersType {
  projectName: string;
  projectId: string;
  items: ProjectItemTree[];
}
export interface AppRouteState {
  isProjectPublic: boolean;
  projects: ProjectsType[];
  publicProjects: PublicProjectsType[];
  currentProjectFP: ProjectFilesFoldersType | null;
  currentProjectOpenFile: CurrentProjectOpenFile | null;
  currentProjectOpenFileCode: CurrentProjectOpenFileCodes | null;
}

const initialState: AppRouteState = {
  isProjectPublic: true,
  projects: [],
  publicProjects: [],
  currentProjectFP: null,
  currentProjectOpenFile: null,
  currentProjectOpenFileCode: null,
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
    setPublicProjects: (
      state,
      { payload }: { payload: PublicProjectsType[] }
    ) => {
      state.publicProjects = payload;
    },
    setCurrentProjectFP: (
      state,
      {
        payload,
      }: {
        payload: {
          currentProjectFp: ProjectFilesFoldersType;
          parentId: string | null;
          fileId?: string;
          fileName?: string;
        };
      }
    ) => {
      state.currentProjectFP = payload.currentProjectFp;
      if (payload.fileName && payload.currentProjectFp) {
        const fileData = findFolderAndCheckFileExistance(
          payload.currentProjectFp.items,
          payload.parentId,
          payload.fileName
        );
        if (fileData) {
          state.currentProjectOpenFile = {
            _id: fileData._id,
            name: fileData.name,
          };
          state.currentProjectOpenFileCode = {
            projectId: payload.currentProjectFp.projectId,
            code: fileData.code || "",
            fileId: fileData._id,
            fileName: fileData.name,
            parentId: payload.parentId || undefined,
          };
        }
      }
    },
    setItemsCP: (state, { payload }: { payload: ProjectItemTree }) => {
      state.currentProjectFP?.items.push(payload);
    },

    setcurrentProjectOpenFileEmpty: (state) => {
      state.currentProjectOpenFile = null;
    },
    removeFile: (state) => {
      state.currentProjectOpenFileCode = null;
      state.currentProjectOpenFile = null;
    },
    setCurrentProjectOpenFileCode: (
      state,
      { payload }: { payload: CurrentProjectOpenFileCodes }
    ) => {
      state.currentProjectOpenFileCode = payload;
      state.currentProjectOpenFile = {
        _id: payload.fileId,
        name: payload.fileName,
      };
    },
    updateProjectCode: (
      state,
      { payload }: { payload: CurrentProjectOpenFileCodes }
    ) => {
      state.currentProjectOpenFileCode = payload;
    },
  },
});

export default appReducer.reducer;

export const {
  setProjectPublic,
  setProjects,
  setCurrentProjectFP,
  setItemsCP,
  setcurrentProjectOpenFileEmpty,
  removeFile,
  setCurrentProjectOpenFileCode,
  updateProjectCode,
  setPublicProjects,
} = appReducer.actions;
