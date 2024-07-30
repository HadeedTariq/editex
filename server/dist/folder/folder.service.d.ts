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
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { CreateFolderDto } from './dto/create-folder.dto';
import { Request } from 'express';
import mongoose from 'mongoose';
export declare class FolderService {
    createFolder(createFolderDto: CreateFolderDto, req: Request): Promise<{
        message: string;
    }>;
    createFile(createFileDto: CreateFolderDto, req: Request): Promise<{
        message: string;
    }>;
    getProjectFilesAndFolders(projectId: string): Promise<(mongoose.Document<unknown, {}, {
        name: string;
        isFolder: boolean;
        items: mongoose.Types.DocumentArray<{
            name?: string;
            code?: string;
            isFolder?: boolean;
        }>;
        projectId?: mongoose.Types.ObjectId;
        code?: string;
        creator?: mongoose.Types.ObjectId;
    }> & {
        name: string;
        isFolder: boolean;
        items: mongoose.Types.DocumentArray<{
            name?: string;
            code?: string;
            isFolder?: boolean;
        }>;
        projectId?: mongoose.Types.ObjectId;
        code?: string;
        creator?: mongoose.Types.ObjectId;
    } & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    addFileToFolder(folderId: string, fileName: string): Promise<{
        message: string;
    }>;
    saveCode(code: string, fileId: string): Promise<{
        message: string;
    }>;
}
