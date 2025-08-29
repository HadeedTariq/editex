import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const findFolderAndCheckFiles = (
  items: ProjectItemTree[],
  parentId: string | null,
  fileName: string
) => {
  if (!parentId) {
    return items.some((item) => item.type === "file" && item.name === fileName);
  }
  for (const item of items) {
    if (item.type === "folder" && item._id === parentId) {
      return item.children?.some(
        (child) => child.type === "file" && child.name === fileName
      );
    }
    if (item.type === "folder" && item.children.length > 0) {
      if (findFolderAndCheckFiles(item.children, parentId, fileName)) {
        return true;
      }
    }
  }
  return false;
};

export const findFolderAndCheckFolders = (
  items: ProjectItemTree[],
  parentId: string | null,
  folderName: string
) => {
  if (!parentId) {
    return items.some(
      (item) => item.type === "folder" && item.name === folderName
    );
  }

  for (const item of items) {
    if (item.type === "folder" && item._id === parentId) {
      return item.children?.some(
        (child) => child.type === "folder" && child.name === folderName
      );
    }
    if (item.type === "folder" && item.children.length > 0) {
      if (findFolderAndCheckFolders(item.children, parentId, folderName)) {
        return true;
      }
    }
  }
};
