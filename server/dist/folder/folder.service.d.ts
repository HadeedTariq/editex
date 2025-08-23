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
            code?: string;
            name?: string;
            isFolder?: boolean;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            code?: string;
            name?: string;
            isFolder?: boolean;
        }> & {
            code?: string;
            name?: string;
            isFolder?: boolean;
        }>;
        code?: string;
        projectId?: mongoose.Types.ObjectId;
        creator?: mongoose.Types.ObjectId;
    }> & {
        name: string;
        isFolder: boolean;
        items: mongoose.Types.DocumentArray<{
            code?: string;
            name?: string;
            isFolder?: boolean;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            code?: string;
            name?: string;
            isFolder?: boolean;
        }> & {
            code?: string;
            name?: string;
            isFolder?: boolean;
        }>;
        code?: string;
        projectId?: mongoose.Types.ObjectId;
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
