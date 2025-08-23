import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { Request } from 'express';
export declare class FolderController {
    private readonly folderService;
    constructor(folderService: FolderService);
    createFolder(createFolderDto: CreateFolderDto, req: Request): Promise<{
        message: string;
    }>;
    createFile(createFile: CreateFolderDto, req: Request): Promise<{
        message: string;
    }>;
    saveCode({ code, fileId }: {
        code: string;
        fileId: string;
    }): Promise<{
        message: string;
    }>;
    getProjectFilesAndFolders(id: string): Promise<(import("mongoose").Document<unknown, {}, {
        name: string;
        isFolder: boolean;
        items: import("mongoose").Types.DocumentArray<{
            code?: string;
            name?: string;
            isFolder?: boolean;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            code?: string;
            name?: string;
            isFolder?: boolean;
        }> & {
            code?: string;
            name?: string;
            isFolder?: boolean;
        }>;
        code?: string;
        projectId?: import("mongoose").Types.ObjectId;
        creator?: import("mongoose").Types.ObjectId;
    }> & {
        name: string;
        isFolder: boolean;
        items: import("mongoose").Types.DocumentArray<{
            code?: string;
            name?: string;
            isFolder?: boolean;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            code?: string;
            name?: string;
            isFolder?: boolean;
        }> & {
            code?: string;
            name?: string;
            isFolder?: boolean;
        }>;
        code?: string;
        projectId?: import("mongoose").Types.ObjectId;
        creator?: import("mongoose").Types.ObjectId;
    } & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    update(id: string, req: Request): Promise<{
        message: string;
    }>;
}
