/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
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
            name?: string;
            code?: string;
            isFolder?: boolean;
        }>;
        projectId?: import("mongoose").Types.ObjectId;
        code?: string;
        creator?: import("mongoose").Types.ObjectId;
    }> & {
        name: string;
        isFolder: boolean;
        items: import("mongoose").Types.DocumentArray<{
            name?: string;
            code?: string;
            isFolder?: boolean;
        }>;
        projectId?: import("mongoose").Types.ObjectId;
        code?: string;
        creator?: import("mongoose").Types.ObjectId;
    } & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    update(id: string, req: Request): Promise<{
        message: string;
    }>;
}
