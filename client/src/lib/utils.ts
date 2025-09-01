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

export const findFolderAndCheckFileExistance = (
  items: ProjectItemTree[],
  fileName: string,
  parentId?: string | null
): ProjectItemTree | null => {
  console.log(fileName, parentId, items);

  if (!parentId || parentId === "null") {
    return (
      items.find((item) => item.type === "file" && item.name === fileName) ||
      null
    );
  }

  for (const item of items) {
    if (item.type === "folder") {
      if (item._id === parentId) {
        return (
          item.children?.find(
            (child) => child.type === "file" && child.name === fileName
          ) || null
        );
      }

      if (item.children && item.children.length > 0) {
        const found = findFolderAndCheckFileExistance(
          item.children,
          fileName,
          parentId
        );
        if (found) return found;
      }
    }
  }

  return null;
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
