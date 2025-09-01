export declare class CreateFolderDto {
    projectId: string;
    parentId?: string;
    name: string;
}
export declare class CreateFileDto {
    projectId: string;
    parentId?: string;
    name: string;
}
export declare class SaveCodeDto {
    code: string;
    fileId: string;
    projectId: string;
}
