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
        items: mongoose.Types.DocumentArray<{
            name?: string;
            code?: string;
            isFolder?: boolean;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name?: string;
            code?: string;
            isFolder?: boolean;
        }> & {
            name?: string;
            code?: string;
            isFolder?: boolean;
        }>;
        isFolder: boolean;
        projectId?: mongoose.Types.ObjectId;
        code?: string;
        creator?: mongoose.Types.ObjectId;
    }> & {
        name: string;
        items: mongoose.Types.DocumentArray<{
            name?: string;
            code?: string;
            isFolder?: boolean;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name?: string;
            code?: string;
            isFolder?: boolean;
        }> & {
            name?: string;
            code?: string;
            isFolder?: boolean;
        }>;
        isFolder: boolean;
        projectId?: mongoose.Types.ObjectId;
        code?: string;
        creator?: mongoose.Types.ObjectId;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    addFileToFolder(folderId: string, fileName: string): Promise<{
        message: string;
    }>;
    saveCode(code: string, fileId: string): Promise<{
        message: string;
    }>;
}
